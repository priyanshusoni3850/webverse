import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "./css/complainstudent.css";
const Complaints = () => {
  const [complaints, setComplaints] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [description, setDescription] = useState('');

  useEffect(() => {
    axios.get('http://localhost:8000/api/v1/student/complaint/')
      .then(response => {
        setComplaints(response.data);
        setLoading(false);
      })
      .catch(error => {
        setError(error);
        setLoading(false);
      });
  }, []);

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    axios.post('http://localhost:8000/api/v1/student/complaint/', { description: description })
      .then(response => {
        setComplaints([...complaints, response.data]);
        setDescription('');
      })
      .catch(error => {
        console.log(error);
      });
  };

  const handleEdit = (id, description) => {
    axios.put(`http://localhost:8000/api/v1/student/complaint/${id}/`, { description: description })
      .then(response => {
        const updatedComplaints = complaints.map(complaint => {
          if (complaint.id === id) {
            complaint.description = response.data.description;
          }
          return complaint;
        });
        setComplaints(updatedComplaints);
      })
      .catch(error => {
        console.log(error);
      });
  };

  const handleDelete = (id) => {
    axios.delete(`http://localhost:8000/api/v1/student/complaint/${id}/`)
      .then(response => {
        const filteredComplaints = complaints.filter(complaint => complaint.id !== id);
        setComplaints(filteredComplaints);
      })
      .catch(error => {
        console.log(error);
      });
  };

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <h1>Student Complaints</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="description">Description:</label>
        <input type="text" id="description" name="description" value={description} onChange={handleDescriptionChange} />
        <button type="submit">Submit</button>
      </form>
      <ul className="complaints-list">
        {complaints.length > 0 ? (
          complaints.map(complaint => (
            <li key={complaint.id}>
              <span>{complaint.description}</span>
              <div className="actions">
                <button onClick={() => handleEdit(complaint.id, complaint.description)}>Edit</button>
                <button onClick={() => handleDelete(complaint.id)}>Delete</button>
              </div>
            </li>
          ))
        ) : (
          <li>No complaints found.</li>
        )}
      </ul>
    </>
  );
};

export default Complaints;
