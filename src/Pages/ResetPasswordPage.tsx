import { useSearchParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { getAuth, verifyPasswordResetCode, confirmPasswordReset } from "firebase/auth";
import { auth } from "../App";

const ResetPasswordPage = () => {
  const [searchParams] = useSearchParams();
  const oobCode = searchParams.get("oobCode") || "";
  const [newPassword, setNewPassword] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();



  useEffect(() => {
    const verifyCode = async () => {
      try {
        const email = await verifyPasswordResetCode(auth, oobCode);
        setEmail(email);
      } catch (err) {
        setError("Invalid or expired reset link.");
      }
    };

    if (oobCode) verifyCode();
  }, [oobCode]);

  const handleReset = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await confirmPasswordReset(auth, oobCode, newPassword);
      setSuccess(true);
      setTimeout(() => navigate("/login"), 3000);
    } catch (err) {
      setError("Failed to reset password.");
    }
  };

  return (
    <div>
      <h2>Reset Password</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {success ? (
        <p>Password has been reset. Redirecting to login...</p>
      ) : (
        <form onSubmit={handleReset}>
          <p>Reset password for: {email}</p>
          <input
            type="password"
            value={newPassword}
            placeholder="Enter new password"
            onChange={(e) => setNewPassword(e.target.value)}
            required
          />
          <button type="submit">Reset Password</button>
        </form>
      )}
    </div>
  );
};

export default ResetPasswordPage;
