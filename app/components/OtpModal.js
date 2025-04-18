// components/OtpModal.jsx
"use client";
import { useState } from "react";

export default function OtpModal({
  onClose,
  phoneNumber,
  onPhoneNumberChange,
  onSendOTP,
  onVerifyOTP,
  onResendOTP,
}) {
  const [otp, setOtp] = useState("");
  const [step, setStep] = useState("enterPhone"); // 'enterPhone' or 'enterOTP'
  const [isLoading, setIsLoading] = useState(false);

  const handleSendOTP = async () => {
    setIsLoading(true);
    try {
      await onSendOTP();
      setStep("enterOTP");
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerifyOTP = async () => {
    setIsLoading(true);
    try {
      await onVerifyOTP(otp);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <h2 className="text-xl font-bold mb-4">OTP Verification</h2>
        
        {step === "enterPhone" ? (
          <>
            <div className="mb-4">
              <label className="block mb-2">Phone Number</label>
              <input
                type="tel"
                value={phoneNumber}
                onChange={(e) => onPhoneNumberChange(e.target.value)}
                placeholder="Enter your phone number"
                className="w-full p-2 border rounded"
              />
            </div>
            <div className="flex justify-end gap-2">
              <button
                onClick={onClose}
                className="px-4 py-2 bg-gray-300 rounded"
              >
                Cancel
              </button>
              <button
                onClick={handleSendOTP}
                disabled={!phoneNumber || isLoading}
                className="px-4 py-2 bg-blue-600 text-white rounded disabled:bg-blue-300"
              >
                {isLoading ? "Sending..." : "Send OTP"}
              </button>
            </div>
          </>
        ) : (
          <>
            <div className="mb-4">
              <p className="mb-2">We sent a code to +91{phoneNumber}</p>
              <input
                type="text"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                placeholder="Enter 4-digit OTP"
                maxLength={4}
                className="w-full p-2 border rounded"
              />
            </div>
            <div className="flex justify-between items-center mb-4">
              <button
                onClick={onResendOTP}
                className="text-blue-600 text-sm"
              >
                Resend OTP
              </button>
            </div>
            <div className="flex justify-end gap-2">
              <button
                onClick={onClose}
                className="px-4 py-2 bg-gray-300 rounded"
              >
                Cancel
              </button>
              <button
                onClick={handleVerifyOTP}
                disabled={otp.length !== 4 || isLoading}
                className="px-4 py-2 bg-blue-600 text-white rounded disabled:bg-blue-300"
              >
                {isLoading ? "Verifying..." : "Verify"}
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}