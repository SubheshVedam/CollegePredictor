import { NextResponse } from 'next/server';
import { createOtpSession } from "@/lib/auth/otp";
export async function POST(request) {
  try {
    const { token } = await request.json();

    const response = await fetch('https://control.msg91.com/api/v5/widget/verifyAccessToken', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({
        authkey: process.env.MSG91_AUTH_KEY,
        "access-token": token
      })
    });

    const data = await response.json();

    if (!response.ok) {
      console.error(data);

      return NextResponse.json(
        {
          error: "OTP verification failed",
        },
        {
          status: response.status,
        }
      );
    }

    const jwt = await createOtpSession(data.mobile || "verified");

    const res = NextResponse.json({
      success: true,
    });

    res.cookies.set("otp_token", jwt, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24,
    });

    return res;

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { error: error.message || 'Internal server error' },
      { status: 500 }
    );
  }
}