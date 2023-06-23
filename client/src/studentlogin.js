import React, { useState } from "react";
import axios from "axios";
import "./css/studentlogin.css";
// import { useHistory } from "react-router-dom";
// import {Redirect} from 'react-router-dom';
// javascript
// import Redirect from 'react-router-dom/Redirect';
import { navigate } from 'react-router-dom';
export default function StudentLogin() {

          // const history = useHistory();

  const [isLogin, setIsLogin] = useState(true);
  const [name, setName] = useState("");
  const [regNo, setRegNo] = useState("");
  const [roomDetails, setRoomDetails] = useState("");
  const [hostelBlock, setHostelBlock] = useState("");
  const [messType, setMessType] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleToggle = () => {
    setIsLogin(!isLogin);
    setName("");
    setRegNo("");
    setRoomDetails("");
    setHostelBlock("");
    setMessType("");
    setPassword("");
    setError("");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(
        isLogin ? "http://localhost:8000/api/v1/student/auth/login" : "http://localhost:8000/api/v1/student/auth/register",
        isLogin
          ? { regNo, password }
          : { name, regNo, roomDetails, hostelBlock, messType, password }
      );
      console.log(0);
      if (response.data.message === "success") {
          navigate('/userstudent');
        // redirect to student.js with response data
          //         history.push("/userstudent");
          // console.log(1);
          // window.location.href = "/userstudent";
          // return <Redirect to='/userstudent' />
          
} else {
          // return <Redirect to='/userstudent' />
          //       console.log(2);
          // window.location.href = "/userstudent";
          navigate('/userstudent');
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
            <label htmlFor="regNo" className="form-label">
              Registration Number
            </label>
            <input
              type="text"
              className="form-control"
              id="regNo"
              value={regNo}
              onChange={(e) => setRegNo(e.target.value)}
              required
            />
          </div>
          {!isLogin && (
            <>
              <div className="mb-3">
                <label htmlFor="roomDetails" className="form-label">
                  Room Details
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="roomDetails"
                  value={roomDetails}
                  onChange={(e) => setRoomDetails(e.target.value)}
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="hostelBlock" className="form-label">
                  Hostel Block Name
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="hostelBlock"
                  value={hostelBlock}
                  onChange={(e) => setHostelBlock(e.target.value)}
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="messType" className="form-label">
                  Mess Type
                </label>
                <select
                  className="form-select"
                  id="messType"
                  value={messType}
                  onChange={(e) => setMessType(e.target.value)}
                  required
                >
                  <option value="">Select Option</option>
                  <option value="veg">Veg</option>
                  <option value="non-veg">Non-Veg</option>
                </select>
              </div>
            </>
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
