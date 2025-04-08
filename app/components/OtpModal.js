export default function OtpModal({
  phone,
  setPhone,
  otp,
  setOtp,
  isOtpSent,
  sendOtp,
  verifyOtp,
  onClose,
}) {
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2 className="modal-title">Verify Your Phone Number</h2>

        {!isOtpSent ? (
          <>
            <input
              type="tel"
              placeholder="Enter Phone Number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="input"
            />
            <button className="button" onClick={sendOtp}>
              Send OTP
            </button>
          </>
        ) : (
          <>
            <input
              type="text"
              placeholder="Enter OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              className="input"
            />
            <button className="button" onClick={verifyOtp}>
              Verify OTP
            </button>
          </>
        )}

        <button className="button" onClick={onClose}>Cancel</button>
      </div>
    </div>
  );
}
