"use client";
import { useState } from "react";

export default function OtpModal({ onVerified, onClose }) {
  const [step, setStep] = useState("form"); // 'form' → 'otp' → 'verifying'
  const [phone, setPhone] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!phone || !name || !email) {
      setError("Please fill all fields");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/verify-user", {
        method: "POST",
        body: JSON.stringify({
          step: "send",
          phone,
          name,
          email,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.error || "Something went wrong");

      if (data.skipVerification) {
        // Already verified, skip OTP
        onVerified();
      } else {
        setStep("otp");
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async () => {
    if (!otp) {
      setError("Enter the OTP");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/verify-user", {
        method: "POST",
        body: JSON.stringify({
          step: "verify",
          phone,
          name,
          email,
          otp,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.error || "Verification failed");

      onVerified();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="otp-modal-overlay" onClick={onClose}>
      <div className="otp-modal-content" onClick={(e) => e.stopPropagation()}>
        <h2 className="otp-modal-title">Verify Your Number</h2>

        {step === "form" && (
          <div className="otp-form">
            <input
              className="otp-input"
              type="text"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <input
              className="otp-input"
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              className="otp-input"
              type="tel"
              placeholder="Mobile Number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
            <button className="otp-button" onClick={handleSubmit} disabled={loading}>
              {loading ? "Checking..." : "Continue"}
            </button>
          </div>
        )}

        {step === "otp" && (
          <div className="otp-form">
            <input
              className="otp-input"
              type="text"
              placeholder="Enter OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
            />
            <button className="otp-button" onClick={handleVerifyOtp} disabled={loading}>
              {loading ? "Verifying..." : "Verify OTP"}
            </button>
          </div>
        )}

        {error && <p className="otp-error">{error}</p>}

        <button className="otp-close" onClick={onClose}>Close</button>
      </div>
    </div>
  );
}
