import React from "react";
import Button from "./Button";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useRef, useState, useEffect } from "react";
import {
  faCheck,
  faTimes,
  faInfoCircle,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import useAuth from "../hooks/useAuth";
import Modal from "./Modal";

const user_regex = /^[a-zA-Z][a-zA-Z0-9_]{3,23}$/;
const pwd_regex = /^(?=(?:.*[a-z]))(?=(?:.*[A-Z]))(?=(?:.*[0-9])).{8,24}$/;
const email_regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;

const Signup = () => {
  const userRef = useRef();
  const errRef = useRef();
  const emailRef = useRef();
  const pwdRef = useRef();
  const matchPwdRef = useRef();

  const navigate = useNavigate();

  const { auth, setAuth, setIsOpen, isOpen, errMsg, setErrMsg } = useAuth();

  const [user, setUser] = useState("");
  const [validName, setValidName] = useState(false);
  const [userFocus, setUserFocus] = useState(false);

  const [pwd, setPwd] = useState("");
  const [validPwd, setValidPwd] = useState(false);
  const [pwdFocus, setPwdFocus] = useState(false);

  const [matchPwd, setMatchPwd] = useState("");
  const [validMatch, setValidMatch] = useState(false);
  const [matchFocus, setMatchFocus] = useState(false);

  const [email, setEmail] = useState("");
  const [validEmail, setValidEmail] = useState(false);
  const [emailFocus, setEmailFocus] = useState(false);

  useEffect(() => {
    emailRef.current.focus();
  }, []);

  useEffect(() => {
    const result = email_regex.test(email);
    setValidEmail(result);
  }, [email]);

  useEffect(() => {
    const result = user_regex.test(user);
    setValidName(result);
  }, [user]);

  useEffect(() => {
    const result = pwd_regex.test(pwd);
    setValidPwd(result);
    const match = pwd === matchPwd;
    setValidMatch(match);
  }, [pwd, matchPwd]);

  useEffect(() => {
    setErrMsg("");
  }, [user, pwd, matchPwd]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newUser = {
      email: emailRef.current.value,
      username: userRef.current.value,
      password: pwdRef.current.value,
      role: "Admin",
      salts: "",
    };

    const data = await axios.post("https://localhost:7109/post", newUser);
    if (data.data.success) {
      localStorage.setItem("authToken", data.data.access_token);
      setAuth(data.data.access_token);
      clearForm();
      localStorage.setItem("username", newUser.username);
      navigate("/landingPage");
    } else {
      setIsOpen(true);
      setErrMsg(data.data.message);
    }
  };
  const clearForm = () => {
    userRef.current.value = "";
    emailRef.current.value = "";
    pwdRef.current.value = "";
    matchPwdRef.current.value = "";
    setEmail("");
    setMatchPwd("");
    setUser("");
    setPwd("");
  };
  return (
    <div className="flex justify-center items-center min-h-screen">
      <Modal open={isOpen} onClose={() => setIsOpen(false)}>
        {errMsg}
      </Modal>
      <form
        onSubmit={handleSubmit}
        className="bg-slate-100 flex flex-col w-1/4 m-auto shadow-xl border-solid border-4 border-blue-100 p-10 "
      >
        <h1 className="font-montserrat text-3xl text-center mb-7 font-bold text-slate-700">
          Register
        </h1>
        <div className="flex flex-col ">
          <label
            htmlFor="email"
            className="mb-1 font-palanquin font-medium text-2xl text-slate-700 flex justify-between"
          >
            Email:
            <span className={validEmail ? "block" : "hidden"}>
              <FontAwesomeIcon icon={faCheck} />
            </span>
            <span className={validEmail || !email ? "hidden" : "block"}>
              <FontAwesomeIcon icon={faTimes} />
            </span>
          </label>
          <input
            ref={emailRef}
            className="text-xl p-1 border-solid border-2 border-slate-300"
            placeholder="Enter email"
            type="text"
            onChange={(e) => setEmail(e.target.value)}
            required
            aria-invalid={validEmail ? "false" : "true"}
            onFocus={() => setEmailFocus(true)}
            onBlur={() => setEmailFocus(false)}
          />
          <p className={email && !validEmail ? "block" : "hidden"}>
            <FontAwesomeIcon icon={faInfoCircle} />
            Enter a valid email adress.
          </p>
          <label
            htmlFor="username"
            className="mt-2 font-palanquin font-medium text-2xl text-slate-700 flex justify-between"
          >
            Username:
            <span className={validName ? "block" : "hidden"}>
              <FontAwesomeIcon icon={faCheck} />
            </span>
            <span className={validName || !user ? "hidden" : "block"}>
              <FontAwesomeIcon icon={faTimes} />
            </span>
          </label>

          <input
            type="text"
            id="username"
            ref={userRef}
            autoComplete="off"
            onChange={(e) => setUser(e.target.value)}
            required
            aria-invalid={validName ? "false" : "true"}
            onFocus={() => setUserFocus(true)}
            onBlur={() => setUserFocus(false)}
            className="text-xl p-1 border-solid border-2 border-slate-300"
            placeholder="Enter username"
          />
          <p className={user && !validName ? "block" : "hidden"}>
            <FontAwesomeIcon icon={faInfoCircle} />
            4 to 24 characters. <br />
            Must begin with a letter. <br />
            Letters, numbers, underscores, hyphens allowed.
          </p>
        </div>
        <div className="flex flex-col mb-4 mt-2">
          <label
            htmlFor="password"
            className="mb-1 font-palanquin font-medium text-2xl text-slate-700 flex justify-between"
          >
            Password:
            <span className={validPwd ? "block" : "hidden"}>
              <FontAwesomeIcon icon={faCheck} />
            </span>
            <span className={validPwd || !pwd ? "hidden" : "block"}>
              <FontAwesomeIcon icon={faTimes} />
            </span>
          </label>
          <input
            ref={pwdRef}
            type="password"
            className="text-xl p-1 border-solid border-2 border-slate-300"
            placeholder="Enter password"
            onChange={(e) => setPwd(e.target.value)}
            required
            aria-invalid={validPwd ? "false" : "true"}
            onFocus={() => setPwdFocus(true)}
            onBlur={() => setPwdFocus(false)}
          />
          <p className={!validPwd && pwd ? "block" : "hidden"}>
            <FontAwesomeIcon icon={faInfoCircle} />
            8 to 24 characters. <br />
            Must include uppercase, lowercase letters and a number <br />
          </p>
          <label
            htmlFor="confirm_pwd"
            className="mb-1  mt-2 font-palanquin font-medium text-2xl text-slate-700 flex justify-between"
          >
            Confirm password:
            <span className={validMatch && matchPwd ? "block" : "hidden"}>
              <FontAwesomeIcon icon={faCheck} />
            </span>
            <span className={validMatch || !matchPwd ? "hidden" : "block"}>
              <FontAwesomeIcon icon={faTimes} />
            </span>
          </label>
          <input
            ref={matchPwdRef}
            type="password"
            className="text-xl p-1 border-solid border-2 border-slate-300"
            placeholder="Enter password"
            onChange={(e) => setMatchPwd(e.target.value)}
            required
            aria-invalid={validMatch ? "false" : "true"}
            onFocus={() => setMatchFocus(true)}
            onBlur={() => setMatchFocus(false)}
          />
          <p className={!validMatch ? "block" : "hidden"}>
            <FontAwesomeIcon icon={faInfoCircle} />
            Must match the first password input field.
          </p>
        </div>
        <Button
          handleSubmit={handleSubmit}
          isDisabled={
            !validEmail || !validName || !validPwd || !validMatch ? true : false
          }
          text="Sign up"
        />
        <div className="mt-4 ">
          <h4 className="font-semibold">Already have an account? </h4>
          <Link to="/">
            <span className=" text-blue-500/100"> Log in </span>
          </Link>
          here!
        </div>
      </form>
    </div>
  );
};

export default Signup;
