import React, { useRef, useState, useContext, useEffect } from "react";
import Button from "./Button";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import useAuth from "../hooks/useAuth";
import Modal from "./Modal";

const Login = () => {
  const userRef = useRef();
  const pwdRef = useRef();
  const navigate = useNavigate();
  const { auth, setAuth, setIsOpen, isOpen, errMsg, setErrMsg, user, setUser } =
    useAuth();
  const [rememberMe, setRememberMe] = useState(false);

  const handleConfirm = async (e) => {
    e.preventDefault();
    console.log(user);
    if (user.username && user.password) {
      const response = await axios.get(
        `https://localhost:7109/api/Users/check-username-password?username=${user.username}&password=${user.password}`
      );

      if (response.data.success) {
        const token = response.data.access_token;
        if (rememberMe) {
          sessionStorage.setItem("authToken", token);
        } else {
          localStorage.setItem("authToken", token);
        }
        setAuth(token);
        localStorage.setItem("username", user.username);
        navigate("/landingPage");
      } else {
        setErrMsg("Invalid username or password.");
        setIsOpen(true);
      }
    } else {
      setErrMsg("Please enter username and password.");
      setIsOpen(true);
    }
  };
  return (
    <div className="flex justify-center items-center min-h-screen">
      <Modal open={isOpen} onClose={() => setIsOpen(false)}>
        {errMsg}
      </Modal>
      <form className="bg-gray-100 flex flex-col w-1/4 m-auto shadow-lg border-solid border-4 border-blue-100 p-10">
        <h1 className="font-montserrat text-3xl text-center mb-7 font-bold text-slate-700">
          Login
        </h1>
        <div className="flex flex-col mb-3">
          <h3 className="mb-1 font-palanquin font-medium text-2xl text-slate-700">
            Username:
          </h3>
          <input
            ref={userRef}
            className="text-xl p-1 border-solid border-2 border-slate-300"
            placeholder="Enter username"
            onChange={() => {
              setUser({
                ...user,
                username: userRef.current.value,
              });
            }}
          />
        </div>
        <div className="flex flex-col mb-5">
          <h3 className="mb-1 font-palanquin font-medium text-2xl text-slate-700">
            Password:
          </h3>
          <input
            ref={pwdRef}
            type="password"
            className="text-xl p-1 border-solid border-2 border-slate-300"
            placeholder="Enter password"
            onChange={() => {
              setUser({
                ...user,
                password: pwdRef.current.value,
              });
            }}
          />
        </div>
        <Button handleSubmit={handleConfirm} text="Confirm" />
        <div className="mt-4 flex justify-between w-full">
          <div className="flex-1">
            <h4 className="font-semibold">Need an account? </h4>
            <Link to="/signup">
              <span className=" text-blue-500/100"> Sign up </span>
            </Link>
            here!
          </div>
          <span className="font-semibold">Remember me</span>
          <label>
            <input
              className="ml-1"
              type="checkbox"
              onChange={() => setRememberMe(true)}
            />
          </label>
        </div>
      </form>
    </div>
  );
};

export default Login;
