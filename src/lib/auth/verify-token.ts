import { jwtVerify, type JWTPayload } from "jose";
import { env } from "../env";

export interface VerifiedAuthPayload extends JWTPayload {
  email?: string;
  sub?: string;
  role?: string;
  type?: string;
}

const secret = new TextEncoder().encode(env.jwtSecret);

/**
 * Verifies and decodes an access token in the Edge Runtime using `jose`.
 */
export async function verifyAccessToken(
  token: string
): Promise<VerifiedAuthPayload | null> {
  try {
    const { payload } = await jwtVerify(token, secret);
    return payload as VerifiedAuthPayload;
  } catch {
    return null;
  }
}
