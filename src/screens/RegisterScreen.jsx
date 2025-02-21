import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../configs/firebaseConfigs.js";
import { doc, addDoc, setDoc, Timestamp, collection } from "firebase/firestore";
import Logo from "../assets/Logo.png";

const RegisterScreen = () => {
  const [errorMessage, setErrorMessage] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    general: "",
  });

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    tempName: "",
    tempAddress: "",
    tempMobileNumber: "09XX-XXXX-XXX",
    userRole: "User",
  });

  const navigate = useNavigate();

  const handleRegisterUser = async (event) => {
    event.preventDefault();

    let errors = {
      email: "",
      password: "",
      confirmPassword: "",
      general: "",
    };

    // Validate email
    if (!formData.email.trim()) {
      errors.email = "Email is required.";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = "Invalid email format.";
    }

    // Validate password
    if (!formData.password.trim()) {
      errors.password = "Password is required.";
    } else if (formData.password.length < 6) {
      errors.password = "Password must be at least 6 characters.";
    }

    // Validate confirm password
    if (!formData.confirmPassword.trim()) {
      errors.confirmPassword = "Confirm password is required.";
    } else if (formData.password !== formData.confirmPassword) {
      errors.confirmPassword = "Passwords do not match.";
    }

    // If there are errors, update state and return
    if (errors.email || errors.password || errors.confirmPassword) {
      setErrorMessage(errors);
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        formData.email,
        formData.password
      );
      const user = userCredential.user;

      const tempName = formData.email.includes("@")
        ? formData.email.split("@")[0]
        : "user";

      const userData = {
        uid: user.uid,
        email: formData.email,
        tempName,
        tempAddress: formData.tempAddress,
        tempMobileNumber: "09XX-XXXX-XXX",
        profileImage:
          "https://res.cloudinary.com/dwnawhcfm/image/upload/v1740122614/xbi0ly1xbirlqhztpogg.png",
        userRole: "User",
      };

      const docRef = doc(db, "users", user.uid);
      await setDoc(docRef, userData);

      await addDoc(collection(db, "activity"), {
        accessDate: Timestamp.now(),
        action: "register",
      });

      // Reset form
      setFormData({
        email: "",
        password: "",
        confirmPassword: "",
        tempName: "",
        tempAddress: "",
        tempMobileNumber: "09XX-XXXX-XXX",
      });

      navigate("/");
    } catch (err) {
      let firebaseErrors = { ...errorMessage };

      if (err.code === "auth/email-already-in-use") {
        firebaseErrors.email = "Email already in use.";
      } else if (err.code === "auth/invalid-email") {
        firebaseErrors.email = "Invalid email format.";
      } else {
        firebaseErrors.general = "Registration failed. Please try again.";
      }

      setErrorMessage(firebaseErrors);
      console.error(err);
    }
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrorMessage({ ...errorMessage, [e.target.name]: "" }); // Clear specific field errors when user types
  };

  return (
    <div className="w-screen h-screen flex flex-col justify-center items-center gap-5 duration-300">
      <div className="flex flex-col items-center gap-1">
        <img src={Logo} className="w-32 h-32" alt="Logo" />
        <label className="text-2xl font-bold">Welcome!</label>
        <label className="text-lg font-semibold">Sign Up for an Account</label>
      </div>
      <form className="flex flex-col gap-5 w-2/3" onSubmit={handleRegisterUser}>
        {/* Email Field */}
        <div className="flex flex-col gap-1">
          <label className="text-sm">Email</label>
          <input
            id="email"
            name="email"
            type="email"
            className="border-[#050419] text-xs p-2 border rounded-lg placeholder:text-xs"
            placeholder="youremail@sample.com"
            onChange={handleInputChange}
            value={formData.email}
          />
          {errorMessage.email && (
            <span className="text-xs text-red-400">{errorMessage.email}</span>
          )}
        </div>

        {/* Password Field */}
        <div className="flex flex-col gap-1">
          <label className="text-sm">Password</label>
          <input
            id="password"
            name="password"
            type="password"
            className="border-[#050419] border rounded-lg p-2 text-xs placeholder:text-xs"
            placeholder="*****"
            onChange={handleInputChange}
            value={formData.password}
          />
          {errorMessage.password && (
            <span className="text-xs text-red-400">
              {errorMessage.password}
            </span>
          )}
        </div>

        {/* Confirm Password Field */}
        <div className="flex flex-col gap-1">
          <label className="text-sm">Confirm Password</label>
          <input
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            className="border-[#050419] border rounded-lg p-2 text-xs placeholder:text-xs"
            placeholder="*****"
            onChange={handleInputChange}
            value={formData.confirmPassword}
          />
          {errorMessage.confirmPassword && (
            <span className="text-xs text-red-400">
              {errorMessage.confirmPassword}
            </span>
          )}
        </div>

        {/* General Error Message */}
        {errorMessage.general && (
          <span className="text-xs text-red-400">{errorMessage.general}</span>
        )}

        {/* Register Button */}
        <button
          type="submit"
          className="bg-[#050419] py-2 rounded-lg text-white"
        >
          Register
        </button>

        {/* Navigation Links */}
        <div className="flex flex-col items-center gap-3">
          <Link to="/" className="text-xs">
            Already Have an Account?{" "}
            <label className="underline">Login Here</label>
          </Link>
        </div>
      </form>
    </div>
  );
};

export default RegisterScreen;

//
