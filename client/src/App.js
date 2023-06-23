
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Home';
import Studentlogin from './studentlogin';
import WardenLogin from './wardenlogin';
import Facultylogin from './facultylogin';
import Userstudent from './userstudent';
import Leavestudent from './leavestudent';
import Complaintstudent from './complainstudent';

function App() {
  return (
<Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/student" element={<Studentlogin />} />
        <Route path="/faculty" element={<Facultylogin  />} />
        <Route path="/warden" element={<WardenLogin  />} />
        <Route path="/userstudent" element={<Userstudent  />} />
        <Route path="/leavestudent" element={<Leavestudent  />} />
        <Route path="/complaintstudent" element={< Complaintstudent  />} />

      </Routes>
    </Router> 
  );
}

export default App;
