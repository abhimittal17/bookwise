import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET;

if (!JWT_SECRET) {
  throw new Error("JWT_SECRET is not defined");
}

type SessionUser = {
  id: string;
  role: string;
};

export async function createSession(
  user: SessionUser,
  remember = false
) {
  const token = jwt.sign(user, JWT_SECRET as string, {
    expiresIn: remember ? "30d" : "1d",
  });

  (await cookies()).set("session", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: remember
      ? 60 * 60 * 24 * 30
      : 60 * 60 * 24,
  });
}

export async function getSession(): Promise<SessionUser | null> {
  const token = (await cookies()).get("session")?.value;
  if (!token) return null;

  try {
    return jwt.verify(token, JWT_SECRET as string) as SessionUser;
  } catch {
    return null;
  }
}

export async function destroySession() {
  (await cookies()).delete("session");
}
