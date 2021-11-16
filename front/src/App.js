import logo from './logo.svg';
import './App.css';
import Login from "./Login";
import {BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <div className = "App">
        <h1>HOME Here</h1>
        <Routes>
          <Route path="/login" element={<Login />}/>
        </Routes>
      </div>
    </Router>
  );
}

export default App;