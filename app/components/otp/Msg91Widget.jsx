// components/otp/Msg91Widget.jsx
"use client";
import { useEffect } from "react";

export default function Msg91Widget({
  showModal,
  onVerificationSuccess,
  onVerificationFailure,
  widgetId,
  authKey
}) {
  useEffect(() => {
    if (showModal && typeof window !== "undefined") {
      const configuration = {
        widgetId: widgetId,
        tokenAuth: authKey,
        exposeMethods: true,
        success: (data) => {
          console.log('Verification success:', data);
          onVerificationSuccess(data);
        },
        failure: (error) => {
          console.error('Verification failed:', error);
          onVerificationFailure(error);
        }
      };

      const script = document.createElement('script');
      script.src = 'https://control.msg91.com/app/assets/otp-provider/otp-provider.js';
      script.onload = () => {
        if (window.initSendOTP) {
          window.initSendOTP(configuration);
        }
      };
      document.body.appendChild(script);

      return () => {
        document.body.removeChild(script);
      };
    }
  }, [showModal, widgetId, authKey, onVerificationSuccess, onVerificationFailure]);

  return null;
}