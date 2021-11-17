import './App.css';
import Login from "./components/Login";
import {BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

/* 
USE THIS FOR NAVIGATION BASICS 
CAN BE USED FOR ASYNC FUNCTIONS BTW

EX: 
  async function handleSubmit(event) {
    event.preventDefault();
    await submitForm(event.target);
    navigate("../success", { replace: true });
  }

  return <button onSubmit={handleSubmit}>...</button>
*/
function GoHome(){
  let navigate = useNavigate();
  function handleLink() {
    navigate("/")
  }
  return <button onClick={handleLink}> Go Home </button>
}

function App() {
  return (
    <Router>
      <div className = "App">
        <h1>HOME Here</h1>
        < GoHome />
        <Link to="/login">Login</Link>
        <Routes>
          <Route path="/login" element={<Login />}/>
        </Routes>
      </div>
    </Router>
  );
}

export default App;