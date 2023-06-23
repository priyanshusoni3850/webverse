import React from 'react';
import { Link } from 'react-router-dom';
import './css/Home.css';

export default function Home() {
  return (
    <div className="container">
      <Link className="card" to="/student">
        <h2>Student</h2>
        <p>Some information about the student.</p>
      </Link>
      <Link className="card" to="/faculty">
        <h2>faculty</h2>
        <p>Some information about the faculty.</p>
      </Link>
      <Link className="card" to="/warden">
        <h2>Warden</h2>
        <p>Some information about the warden.</p>
      </Link>
    </div>
  );
}
