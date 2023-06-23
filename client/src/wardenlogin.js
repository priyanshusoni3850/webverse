import React, { useState } from "react";
import axios from "axios";
import "./css/wardenlogin.css";

const WardenLogin = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [name, setName] = useState("");
  const [blockName, setBlockName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleToggle = () => {
    setIsLogin(!isLogin);
    setName("");
    setBlockName("");
    setPassword("");
    setError("");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(
        isLogin ? "http://localhost:8000/api/v1/warden/auth/login" : "http://localhost:8000/api/v1/warden/auth/register",
        isLogin ? { name, password } : { name, blockName, password }
      );
      if (response.data.message === "success") {
        // redirect to userwarden.js with response data
      } else {
        setError("Invalid login details");
      }
    } catch (error) {
      console.error(error);
      setError("Something went wrong");
    }
  };

  return (
    <div className="card">
      <div className="card-body">
        <h2>{isLogin ? "Login" : "Register"}</h2>
        <form onSubmit={handleSubmit}>
          {!isLogin && (
            <div className="mb-3">
              <label htmlFor="blockName" className="form-label">
                Hostel Block Name
              </label>
              <input
                type="text"
                className="form-control"
                id="blockName"
                value={blockName}
                onChange={(e) => setBlockName(e.target.value)}
                required
              />
            </div>
          )}
          <div className="mb-3">
            <label htmlFor="name" className="form-label">
              Name
            </label>
            <input
              type="text"
              className="form-control"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              type="password"
              className="form-control"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          {error && (
            <div className="alert alert-danger" role="alert">
              {error}
            </div>
          )}
          <button type="submit" className="btn btn-primary">
            {isLogin ? "Login" : "Register"}
          </button>
        </form>
        <div className="mt-3">
          {isLogin ? (
            <p>
              Don't have an account?{" "}
              <button
                type="button"
                className="btn btn-link"
                onClick={handleToggle}
              >
                Register here
              </button>
            </p>
          ) : (
            <p>
              Already have an account?{" "}
              <button
                type="button"
                className="btn btn-link"
                onClick={handleToggle}
              >
                Login here
              </button>
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default WardenLogin;
