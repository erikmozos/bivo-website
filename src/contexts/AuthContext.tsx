import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import {
  createUserWithEmailAndPassword,
  getAdditionalUserInfo,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
  type User,
  type UserCredential,
} from "firebase/auth";
import { doc, serverTimestamp, setDoc } from "firebase/firestore";
import { auth, db, appleProvider, googleProvider } from "@/lib/firebase";
import { COLLECTION_MEMBERS } from "@/lib/config";
import { resetRevenueCatSession } from "@/lib/revenuecat";
import { syncMemberFromSession } from "@/lib/syncMemberFromSession";
import { notifyAppLifecycleEmail } from "@/services/sendpulseAppEmail";

interface AuthContextValue {
  user: User | null;
  loading: boolean;
  signUpWithEmail: (email: string, password: string, displayName?: string) => Promise<void>;
  signInWithEmail: (email: string, password: string) => Promise<void>;
  signInWithGoogle: () => Promise<void>;
  signInWithApple: () => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | null>(null);

async function ensureMemberDoc(user: User) {
  const ref = doc(db, COLLECTION_MEMBERS, user.uid);
  await setDoc(
    ref,
    {
      uid: user.uid,
      id: user.uid,
      email: user.email ?? "",
      displayName: user.displayName ?? "",
      updatedAt: serverTimestamp(),
      createdAt: serverTimestamp(),
    },
    { merge: true }
  );
}

function flowLangFromPath(): string {
  const seg = window.location.pathname.split("/").filter(Boolean)[0];
  return seg === "en" ? "en" : "es";
}

async function finishNewSession(
  credential: UserCredential,
  options?: { isNewUser?: boolean }
) {
  const lang = flowLangFromPath();
  const isNewUser =
    options?.isNewUser ?? getAdditionalUserInfo(credential)?.isNewUser === true;

  await ensureMemberDoc(credential.user);

  if (isNewUser) {
    notifyAppLifecycleEmail(credential.user, "welcome", lang);
  }

  await syncMemberFromSession(credential.user, lang);
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (nextUser) => {
      setUser(nextUser);
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  const value = useMemo<AuthContextValue>(
    () => ({
      user,
      loading,
      async signUpWithEmail(email, password, displayName) {
        const credential = await createUserWithEmailAndPassword(auth, email, password);
        if (displayName) {
          await updateProfile(credential.user, { displayName });
        }
        await finishNewSession(credential, { isNewUser: true });
      },
      async signInWithEmail(email, password) {
        const credential = await signInWithEmailAndPassword(auth, email, password);
        await finishNewSession(credential, { isNewUser: false });
      },
      async signInWithGoogle() {
        const credential = await signInWithPopup(auth, googleProvider);
        await finishNewSession(credential);
      },
      async signInWithApple() {
        const locale = flowLangFromPath() === "en" ? "en_US" : "es_ES";
        appleProvider.setCustomParameters({ locale });
        const credential = await signInWithPopup(auth, appleProvider);
        await finishNewSession(credential);
      },
      async logout() {
        resetRevenueCatSession();
        await signOut(auth);
      },
    }),
    [user, loading]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
}
