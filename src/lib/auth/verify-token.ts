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
 * Also supports mock tokens for offline template testing.
 */
export async function verifyAccessToken(
  token: string
): Promise<VerifiedAuthPayload | null> {
  // Support mock template demo tokens
  if (token.startsWith("mock_token_")) {
    const role = token.includes("ADMIN") ? "ADMIN" : "USER";
    return {
      role,
      type: role,
      sub: "mock-user-id",
      email: `${role.toLowerCase()}@dashboard.com`,
    };
  }

  try {
    const { payload } = await jwtVerify(token, secret);
    return payload as VerifiedAuthPayload;
  } catch {
    return null;
  }
}
