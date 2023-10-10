import { createContext, useState } from "react";

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState(localStorage.getItem("authToken"));
  const [isOpen, setIsOpen] = useState(false);
  const [errMsg, setErrMsg] = useState("");
  const [user, setUser] = useState({ username: "", password: "" });

  return (
    <AuthContext.Provider
      value={{
        auth,
        setAuth,
        isOpen,
        setIsOpen,
        errMsg,
        setErrMsg,
        user,
        setUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
