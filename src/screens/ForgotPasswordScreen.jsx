import React, { useState } from "react";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../configs/firebaseConfigs";
import { Link } from "react-router-dom";
import Logo from "../assets/Logo.png";
import { useNavigate } from "react-router-dom";
import { db } from "../configs/firebaseConfigs";
import { Timestamp } from "firebase/firestore";
import { collection, addDoc } from "firebase/firestore";

const ForgotPasswordScreen = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState(null);
  const navigate = useNavigate(); // Initialize navigation

  const handleResetPassword = async () => {
    if (!email) {
      setMessage({ type: "error", text: "Please enter your email." });
      return;
    }

    try {
      await sendPasswordResetEmail(auth, email);
      await addDoc(collection(db, "activity"), {
        accessDate: Timestamp.now(),
        action: "forgotpassword",
      });
      setMessage({
        type: "success",
        text: "Password reset link sent! Redirecting to login...",
      });

      setTimeout(() => {
        setEmail("");
        navigate("/");
      }, 2000);
    } catch (error) {
      setMessage({
        type: "error",
        text:
          error.code === "auth/user-not-found"
            ? "No account found with this email."
            : "Failed to send reset email. Try again.",
      });
    }
  };

  return (
    <div className="w-screen h-screen flex flex-col justify-center items-center gap-5">
      <div className="flex flex-col items-center gap-1">
        <img src={Logo} className="w-32 h-32" alt="Logo" />
        <label className="text-2xl font-bold">Forgot Password</label>
        <label className="text-lg font-semibold">
          Enter your email to reset
        </label>
      </div>
      <div className="flex flex-col gap-5 w-2/3">
        <div className="flex flex-col gap-1">
          <label className="text-sm">Email</label>
          <input
            type="email"
            className="border-[#050419] text-xs border rounded-lg p-2 placeholder:text-xs"
            placeholder="youremail@sample.com"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        {message && (
          <label
            className={`text-xs ${
              message.type === "success" ? "text-green-400" : "text-red-400"
            }`}
          >
            {message.text}
          </label>
        )}
        <button
          className="bg-[#050419] py-2 rounded-lg text-white"
          onClick={handleResetPassword}
        >
          Send Reset Email
        </button>
        <Link to="/" className="text-sm text-center">
          Back to Login
        </Link>
      </div>
    </div>
  );
};

export default ForgotPasswordScreen;
