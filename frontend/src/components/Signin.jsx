import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Signin = ({ setIsAuthenticated }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        import.meta.env.VITE_BASE_ADDRESS + "signin",
        { username, password }
      );
      localStorage.setItem("token", response.data.token);
      setSuccess("Login successful!");
      navigate("/");
      setIsAuthenticated(true);
      setError("");
    } catch (err) {
      console.log(err);
      setError("Invalid credentials or server error");
      setSuccess("");
    }
  };

  return (

    <div   className="bg-gradient-to-br from-gray-100 to-gray-300" >
    <div className="flex justify-center items-center h-screen bg-gradient-to-br from-gray-100 to-gray-300">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md transform transition-all duration-300 hover:scale-105 fixed top-[100px]">
        <h2 className="text-3xl font-bold text-center text-[#ebb70e] mb-6">
          Welcome Back!
        </h2>

        {error && (
          <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-4 rounded-md">
            {error}
          </div>
        )}
        {success && (
          <div className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 mb-4 rounded-md">
            {success}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="form-group">
            <label
              htmlFor="username"
              className="block text-sm font-medium text-gray-700"
            >
              Username
            </label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className="w-full p-3 border text-black border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#ebb70e] focus:border-transparent"
              placeholder="Enter your username"
            />
          </div>

          <div className="form-group">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full p-3 border text-black border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#ebb70e] focus:border-transparent"
              placeholder="Enter your password"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-gradient-to-r from-[#ebb70e] to-[#d59f06] text-white font-semibold rounded-lg shadow-md hover:shadow-lg focus:outline-none focus:ring-4 focus:ring-[#ebb70e] transition-all duration-300"
          >
            Sign In
          </button>
        </form>

        <div className="text-center mt-6">
          <p className="text-sm text-gray-700">
            Don't have an account?{" "}
            <span
              onClick={() => navigate("/signup")}
              className="text-[#ebb70e] font-semibold cursor-pointer hover:underline"
            >
              Sign up here
            </span>
          </p>
        </div>
      </div>
    </div>
    </div>
  );
};

export default Signin;
