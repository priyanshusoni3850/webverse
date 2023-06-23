import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "./css/userstudent.css";
export default function UserStudent() {
  const [studentData, setStudentData] = useState(null);
  const [wardenData, setWardenData] = useState(null);
  const [leaveStatus, setLeaveStatus] = useState(null);

  useEffect(() => {
    // Fetch student data from /api/v1/student/me/
    axios.get('http://localhost:8000/api/v1/student/me/')
      .then(response => {
        setStudentData(response.data);
      })
      .catch(error => {
        console.error('Error fetching student data', error);
      });

    // Fetch warden data from /api/v1/student/me/my-warden
    axios.get('http://localhost:8000/api/v1/student/me/my-warden')
      .then(response => {
        setWardenData(response.data);
      })
      .catch(error => {
        console.error('Error fetching warden data', error);
      });
  }, []);

  const handleLeaveRequest = () => {
    // Submit leave request to /api/v1/student/leave/
    axios.post('http://localhost:8000/api/v1/student/leave/')
      .then(response => {
        setLeaveStatus('Leave request submitted');
      })
      .catch(error => {
        console.error('Error submitting leave request', error);
      });
  };

  if (!studentData || !wardenData) {
    return <p>Loading...</p>;
  }

  return (
    <div className="container">
      <div className="card">
        <h2>Student Information</h2>
        <p><strong>Name:</strong> {studentData.name}</p>
        <p><strong>ID:</strong> {studentData.id}</p>
        <p><strong>Email:</strong> {studentData.email}</p>
      </div>

      <div className="card">
        <h2>Warden Information</h2>
        <p><strong>Name:</strong> {wardenData.name}</p>
        <p><strong>ID:</strong> {wardenData.id}</p>
        <p><strong>Email:</strong> {wardenData.email}</p>
      </div>

      <button onClick={handleLeaveRequest} className="btn">Request Leave</button>
      {leaveStatus && <p>{leaveStatus}</p>}
    </div>
  );
}
