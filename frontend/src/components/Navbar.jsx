import React from "react";
import logo from "../assets/logo.png";
import github from "../assets/github.svg";
import { useNavigate } from "react-router-dom";

const Navbar = ({ isAuthenticated, setIsAuthenticated }) => {
  const navigate = useNavigate();

  const handleSignOut = () => {
    console.log("clicks");
    localStorage.removeItem("token");
    setIsAuthenticated(false);
    navigate("/signin");
  };

  return (
    <nav className="flex items-center justify-between h-16 px-6 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 shadow-lg sticky top-0">
      {/* Logo Section */}
      <div
        className="logo cursor-pointer flex items-center gap-2 hover:scale-105 transition-transform"
        onClick={() => navigate("/")}
      >
        <img className="h-12 w-12" src={logo} alt="logo" />
        <span className="text-xl sm:text-2xl font-extrabold hidden md:block text-yellow-300">
          lock
        </span>
        <span className="text-xl sm:text-2xl font-extrabold hidden md:block text-red-400">
          MATE
        </span>
      </div>

      {/* Navigation Buttons */}
      <ul className="flex items-center gap-6">
        {/* Sign Up / Sign In / Sign Out Buttons */}
        {!isAuthenticated ? (
          <>
            <li>
              <button
                onClick={() => navigate("/signup")}
                className="navbtn bg-yellow-400 hover:bg-yellow-500 text-white md:px-5 md:py-2  p-2 text-sm md:text-base rounded-lg shadow-md transition-all "
              >
                Sign Up
              </button>
            </li>
            <li>
              <button
                onClick={() => navigate("/signin")}
                className="navbtn bg-red-400 hover:bg-red-500 text-white md:px-5 md:py-2  p-2 text-sm md:text-base rounded-lg shadow-md transition-all "
              >
                Sign In
              </button>
            </li>
          </>
        ) : (
          <li>
            <button
              onClick={handleSignOut}
              className="navbtn bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-300 text-white px-5 py-2 text-sm md:text-xl  shadow-md hover:shadow-lg hover:scale-105 hover:text-gray-800   transition-all duration-300 ease-in-out ring-1 ring-slate-600 rounded-xl  "
            >
              Sign Out
            </button>
          </li>
        )}

        {/* GitHub Link */}
        <li>
          <a
            href="https://github.com/Vinamra05"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2  hover:scale-110   bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-300 text-white transition-all ring-1 ring-slate-600 py-2 px-3 rounded-xl "
          >
            <img
              className="h-6 invert transition-transform "
              src={github}
              alt="github"
            />
            <span className="hidden  sm:inline">GitHub</span>
          </a>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
