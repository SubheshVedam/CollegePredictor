"use client";
import { useState, useEffect } from "react";
import CollegeTable from "./components/CollegeTable";
import OtpModal from "./components/OtpModal";
import { stateOptions } from "@/lib/states";

export default function HomePage() {
  const [rank, setRank] = useState("");
  const [gender, setGender] = useState("Gender Neutral");
  const [category, setCategory] = useState("OPEN");
  const [stateId, setStateId] = useState("");
  const [results, setResults] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState(""); // Add phone number state

  // Check verification status safely
  const isVerified = typeof window !== "undefined" ? sessionStorage.getItem("isVerified") === "true" : false;

  // Initialize MSG91 widget when modal opens
  useEffect(() => {
    if (showModal && typeof window !== "undefined") {
      const configuration = {
        widgetId: process.env.NEXT_PUBLIC_MSG91_WIDGET_ID,
        tokenAuth: process.env.NEXT_PUBLIC_MSG91_AUTH_KEY,
        exposeMethods: true,
        success: (data) => {
          console.log('Verification success:', data);
          sessionStorage.setItem("isVerified", "true");
          handleVerificationSuccess();
        },
        failure: (error) => {
          console.error('Verification failed:', error);
          alert("OTP verification failed. Please try again.");
        }
      };

      const script = document.createElement('script');
      script.src = 'https://control.msg91.com/app/assets/otp-provider/otp-provider.js';
      script.onload = () => {
        window.initSendOTP(configuration);
      };
      document.body.appendChild(script);

      return () => {
        document.body.removeChild(script);
      };
    }
  }, [showModal]);

  const handleSearch = async () => {
    if (!rank || !gender || !category || !stateId) {
      alert("Please fill in all fields including State.");
      return;
    }

    setIsLoading(true);
    
    if (!isVerified) {
      setShowModal(true);
    } else {
      await fetchResults();
    }
    
    setIsLoading(false);
  };

  const fetchResults = async () => {
    try {
      const params = new URLSearchParams({
        rank,
        gender,
        category,
        state_id: stateId,
      });

      const res = await fetch(`/api/colleges?${params}`);
      if (!res.ok) throw new Error("Failed to fetch results");
      
      const data = await res.json();
      setResults(data);
    } catch (error) {
      console.error("Failed to fetch colleges:", error);
      alert("Failed to fetch results. Please try again.");
    }
  };

  const handleVerificationSuccess = async () => {
    try {
      setShowModal(false);
      setIsLoading(true);
      await fetchResults();
    } catch (error) {
      console.error("Verification error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSendOTP = () => {
    if (!phoneNumber) {
      alert("Please enter your phone number");
      return;
    }

    // Ensure phone number has country code (91 for India)
    const formattedPhone = phoneNumber.startsWith('91') ? phoneNumber : `91${phoneNumber}`;
    
    window.sendOtp(
      formattedPhone,
      (data) => {
        console.log('OTP sent successfully:', data);
      },
      (error) => {
        console.error('Error sending OTP:', error);
        alert("Failed to send OTP. Please try again.");
      }
    );
  };

  const handleVerifyOTP = (otp) => {
    if (!otp || otp.length !== 4) {
      alert("Please enter a valid 4-digit OTP");
      return;
    }

    window.verifyOtp(
      otp,
      (data) => {
        console.log('OTP verified successfully:', data);
        sessionStorage.setItem("isVerified", "true");
        handleVerificationSuccess();
      },
      (error) => {
        console.error('Error verifying OTP:', error);
        alert("Invalid OTP. Please try again.");
      }
    );
  };

  return (
    <div className="homepage">
      <h1>College Predictor</h1>

      <div className="form-section">
        <input
          type="number"
          placeholder="Enter your rank"
          value={rank}
          onChange={(e) => setRank(e.target.value)}
          min="1"
          className="form-input"
        />

        <select 
          value={gender} 
          onChange={(e) => setGender(e.target.value)}
          className="form-select"
        >
          <option value="Gender Neutral">Gender Neutral</option>
          <option value="Female">Female-only</option>
        </select>

        <select 
          value={category} 
          onChange={(e) => setCategory(e.target.value)}
          className="form-select"
        >
          <option value="OPEN">OPEN</option>
          <option value="OBC-NCL">OBC-NCL</option>
          <option value="SC">SC</option>
          <option value="ST">ST</option>
          <option value="EWS">EWS</option>
          <option value="OPEN (PwD)">OPEN (PwD)</option>
          <option value="OBC-NCL (PwD)">OBC-NCL (PwD)</option>
          <option value="SC (PwD)">SC (PwD)</option>
          <option value="ST (PwD)">ST (PwD)</option>
          <option value="EWS (PwD)">EWS (PwD)</option>
        </select>

        <select 
          value={stateId} 
          onChange={(e) => setStateId(e.target.value)}
          className="form-select"
        >
          <option value="">Select State</option>
          {stateOptions.map((state) => (
            <option key={state.id} value={state.id}>
              {state.name}
            </option>
          ))}
        </select>

        <button 
          onClick={handleSearch} 
          disabled={isLoading}
          className="search-button"
        >
          {isLoading ? "Searching..." : "Find Colleges"}
        </button>
      </div>

      {results.length > 0 && isVerified && <CollegeTable results={results} />}

      {showModal && (
        <OtpModal
          onClose={() => setShowModal(false)}
          phoneNumber={phoneNumber}
          onPhoneNumberChange={setPhoneNumber}
          onSendOTP={handleSendOTP}
          onVerifyOTP={handleVerifyOTP}
          onResendOTP={() => handleSendOTP()} // Same as send for simplicity
        />
      )}
    </div>
  );
}