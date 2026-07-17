import { useEffect, useState } from "react";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { COLLECTION_MEMBERS } from "@/lib/config";
import type { MemberDoc } from "@/types/member";

export function useMember(uid: string | undefined) {
  const [member, setMember] = useState<MemberDoc | null>(null);
  const [loading, setLoading] = useState(Boolean(uid));
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!uid) {
      setMember(null);
      setLoading(false);
      return;
    }

    setLoading(true);
    const ref = doc(db, COLLECTION_MEMBERS, uid);

    const unsubscribe = onSnapshot(
      ref,
      (snap) => {
        setMember(snap.exists() ? (snap.data() as MemberDoc) : null);
        setLoading(false);
        setError(null);
      },
      (err) => {
        setError(err);
        setLoading(false);
      }
    );

    return unsubscribe;
  }, [uid]);

  return { member, loading, error };
}
