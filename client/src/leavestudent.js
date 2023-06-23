import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "./css/leavestudent.css";
const LeaveStudent = () => {
  const [leaves, setLeaves] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/v1/student/leave/');
      setLeaves(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8000/api/v1/student/leave/${id}`);
      setLeaves(leaves.filter((leave) => leave.id !== id));
    } catch (error) {
      console.error(error);
    }
  };

  const handleCreate = async () => {
    try {
      const postData = { // Add your payload data here
       };
      const response = await axios.post('http://localhost:8000/api/v1/student/leave/', postData);
      setLeaves([...leaves, response.data]);
    } catch (error) {
      console.error(error);
    }
  };

  const handleUpdate = async (id, updatedData) => {
    try {
      const response = await axios.put(`http://localhost:8000/api/v1/student/leave/${id}`, updatedData);
      setLeaves(leaves.map((leave) => (leave.id === id ? response.data : leave)));
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h1>Leave Records</h1>
      <button onClick={handleCreate}>Create New Leave</button>
      <table>
        <thead>
          <tr>
            <th>Leave ID</th>
            <th>Start Date</th>
            <th>End Date</th>
            <th>Reason</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {leaves.map((leave) => (
            <tr key={leave.id}>
              <td>{leave.id}</td>
              <td>{leave.start_date}</td>
              <td>{leave.end_date}</td>
              <td>{leave.reason}</td>
              <td>{leave.status}</td>
              <td>
                <button onClick={() => handleDelete(leave.id)}>Delete</button>
                <button onClick={() => handleUpdate(leave.id, {status: 'approved'})}>Approve</button>
                <button onClick={() => handleUpdate(leave.id, {status: 'rejected'})}>Reject</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default LeaveStudent;
