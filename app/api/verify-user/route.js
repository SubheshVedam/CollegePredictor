// /app/api/verify-user/route.js
import { db } from "@/lib/db";
import { NextResponse } from "next/server";
import twilio from "twilio";

const client = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);
const serviceSid = process.env.TWILIO_VERIFY_SERVICE_SID;

export async function POST(req) {
  const { phone, name, email, step, otp } = await req.json();

  if (!phone) return NextResponse.json({ error: "Phone is required" }, { status: 400 });

  try {
    // Step 1: Check if user already exists
    const [rows] = await db.query("SELECT * FROM verified_users WHERE phone_number = ?", [phone]);

    if (rows.length > 0) {
      // Already verified, skip OTP
      return NextResponse.json({ success: true, skipVerification: true });
    }

    if (step === "send") {
      await client.verify.v2.services(serviceSid).verifications.create({ to: `+91${phone}`, channel: "sms" });
      return NextResponse.json({ success: true, skipVerification: false });
    }

    if (step === "verify") {
      const verificationCheck = await client.verify.v2.services(serviceSid).verificationChecks.create({
        to: `+91${phone}`,
        code: otp,
      });

      if (verificationCheck.status === "approved") {
        await db.query(
          "INSERT INTO verified_users (name, email, phone_number) VALUES (?, ?, ?)",
          [name, email, phone]
        );
        return NextResponse.json({ success: true });
      } else {
        return NextResponse.json({ error: "Invalid OTP" }, { status: 400 });
      }
    }

    return NextResponse.json({ error: "Invalid step" }, { status: 400 });
  } catch (error) {
    console.error("OTP Verification Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
