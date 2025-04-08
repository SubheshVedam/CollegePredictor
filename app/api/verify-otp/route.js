import { db } from "@/lib/db";
import { NextResponse } from "next/server";
import twilio from "twilio";

const client = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);
const VERIFY_SID = process.env.TWILIO_VERIFY_SERVICE_SID;

export async function POST(req) {
  try {
    const { phone, otp, name, email, step } = await req.json();

    if (!phone) {
      return NextResponse.json({ error: "Phone is required" }, { status: 400 });
    }

    if (step === "send") {
      await client.verify.v2.services(VERIFY_SID).verifications.create({
        to: `+91${phone}`,
        channel: "sms",
      });
      return NextResponse.json({ message: "OTP sent" });
    }

    if (step === "verify") {
      const verification = await client.verify.v2.services(VERIFY_SID).verificationChecks.create({
        to: `+91${phone}`,
        code: otp,
      });

      if (verification.status !== "approved") {
        return NextResponse.json({ error: "Invalid OTP" }, { status: 400 });
      }

      // Insert user info into DB
      await db.query(
        `INSERT INTO verified_users (name, email, phone) VALUES (?, ?, ?)`,
        [name, email, phone]
      );

      return NextResponse.json({ message: "OTP verified" });
    }

    return NextResponse.json({ error: "Invalid step" }, { status: 400 });
  } catch (error) {
    console.error("❌ OTP API Error:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
