import React, { useState } from "react";
import axios from "axios";
import "./css/facultylogin.css";
export default function FacultyLogin() {
          const [isLogin, setIsLogin] = useState(true);
          const [name, setName] = useState("");
          const [empId, setEmpId] = useState("");
          const [isHOD, setIsHOD] = useState(false);
          const [password, setPassword] = useState("");
          const [error, setError] = useState("");
        
          const handleToggle = () => {
            setIsLogin(!isLogin);
            setName("");
            setEmpId("");
            setIsHOD(false);
            setPassword("");
            setError("");
          };
        
          const handleSubmit = async (event) => {
            event.preventDefault();
            try {
              const response = await axios.post(
                isLogin ? "http://localhost:8000/api/v1/faculty/auth/login" : "http://localhost:8000/api/v1/faculty/auth/register",
                isLogin
                  ? { empId, password }
                  : { name, empId, isHOD, password }
              );
              if (response.data.message === "success") {
                window.location.href = "/home";
                // redirect to faculty.js with response data
              } else {
                window.location.href = "/home";
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
              )}
              <div className="mb-3">
                <label htmlFor="empId" className="form-label">
                  Employee ID
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="empId"
                  value={empId}
                  onChange={(e) => setEmpId(e.target.value)}
                  required
                />
              </div>
              {!isLogin && (
                <div className="mb-3">
                  <label htmlFor="isHOD" className="form-label">
                    Head of Department?
                  </label>
                  <select
                    className="form-select"
                    id="isHOD"
                    value={isHOD}
                    onChange={(e) => setIsHOD(e.target.value)}
                    required
                  >
                    <option value="">Select Option</option>
                    <option value={true}>Yes</option>
                    <option value={false}>No</option>
                  </select>
                </div>
              )}
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
}
