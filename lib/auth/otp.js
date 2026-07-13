import { jwtVerify, SignJWT } from "jose";
import { cookies } from "next/headers";

const OTP_SECRET = new TextEncoder().encode(process.env.OTP_JWT_SECRET);

export async function createOtpSession(phone) {
  return await new SignJWT({
    phone,
    verified: true,
  })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("24h")
    .sign(OTP_SECRET);
}

export async function verifyOtpSession() {
  const cookieStore = await cookies();
  const token = cookieStore.get("otp_token")?.value;

  if (!token) return null;

  try {
    const { payload } = await jwtVerify(token, OTP_SECRET);
    return payload;
  } catch {
    return null;
  }
}