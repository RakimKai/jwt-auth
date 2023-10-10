import React, { useEffect } from "react";
import { Navigate, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import axios from "axios";

const PrivateRoute = () => {
  const { auth, setAuth } = useAuth();
  const validateToken = async () => {
    try {
      const response = await axios.post(
        "https://localhost:7109/api/Users/validate-token",
        {
          Token: auth,
        }
      );
      setAuth(response.data.isValid ? auth : null);
    } catch (error) {
      setAuth(null);
    }
  };
  useEffect(() => {
    validateToken();
  }, [auth, setAuth]);

  return auth ? <Outlet /> : <Navigate to="/" />;
};

export default PrivateRoute;
