import React, { useContext } from "react";
import useAuth from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { BiLogoGithub } from "react-icons/bi";
const LandingPage = () => {
  const { setAuth } = useAuth();
  const username = localStorage.getItem("username");
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("authToken");
    setAuth(null);
    navigate("/");
  };

  return (
    <div className="bg-black/100 w-full min-h-screen flex justify-center items-center flex-col font-montserrat  text-white-400 ">
      <h1 className="text-4xl">Welcome, {username} </h1>
      <h2 className="text-white-400 text-2xl mt-1 flex">
        For more projects find me here:
        <div className="ml-2">
          <a href="https://github.com/RakimKai">
            <BiLogoGithub
              className="hover:text-gray-500 transition duration-100"
              size={28}
            />
          </a>
        </div>
      </h2>
      <div className="w-1/6 flex justify-center items-center text-white ">
        <button
          className="bg-slate-gray/10 w-1/2 mt-2 p-2 transition duration-200 rounded text-white-400 text-lgfont-montserrat hover:bg-slate-gray/30"
          onClick={handleLogout}
        >
          Log out
        </button>
      </div>
    </div>
  );
};

export default LandingPage;
