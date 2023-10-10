import Login from "../src/Components/Login";
import Signup from "../src/Components/Signup";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./Components/LandingPage";
import PrivateRoute from "./Components/PrivateRoute";
import { useEffect } from "react";
import useAuth from "./hooks/useAuth";

function App() {
  const { setAuth } = useAuth();
  useEffect(() => {
    const token = localStorage.getItem("authToken");
    const session = sessionStorage.getItem("authToken");
    token ? setAuth(token) : session ? setAuth(session) : setAuth(null);
  }, []);
  return (
    <div className="bg-gray-200 min-h-screen">
      <Router>
        <Routes>
          <Route element={<PrivateRoute />}>
            <Route path="/landingPage" element={<LandingPage />} />
          </Route>
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
