export type VerifiedFirebaseUser = {
  uid: string;
  email: string;
};

export async function verifyFirebaseIdToken(
  idToken: string
): Promise<VerifiedFirebaseUser | null> {
  const apiKey =
    process.env.VITE_FIREBASE_API_KEY?.trim() ||
    process.env.FIREBASE_API_KEY?.trim();

  if (!apiKey || !idToken) return null;

  const res = await fetch(
    `https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=${apiKey}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ idToken }),
    }
  );

  const data = (await res.json().catch(() => ({}))) as {
    users?: Array<{ localId?: string; email?: string }>;
    error?: { message?: string };
  };

  const user = data.users?.[0];
  const email = user?.email?.trim().toLowerCase();
  const uid = user?.localId?.trim();
  if (!res.ok || !email || !uid) return null;

  return { uid, email };
}
