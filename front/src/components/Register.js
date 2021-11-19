import '../App.css';
import React, {useState} from "react";
import { Link } from "react-router-dom";

function RegisterForm() {
  const [userInfo, setUserInfo] = useState({});
  const [error, setError] = useState("");

  async function handleRegister(event) {
    event.preventDefault();

    if(!userInfo.firstName || !userInfo.lastName) {
      setError("First Name and Last Name cannot be null");
      return;
    }
    if(!userInfo.userName) {
      setError("User Name cannot be null");
      return;
    }
    if(!userInfo.email) {
      setError("Please input an email address");
    }
    if (userInfo.pwd.value.length < 6) {
      setError("Password should not less than 6 characters");
      return;
    }
    setError("");
  }
  
  return <form>
    <div className = "form-group">
      <div className = "mb-3">
        <label htmlFor="Input-FirstName"> First Name </label>
        <input 
          type = "firstName" 
          className = "form-control"
          id = "Input-FirstName"
          aria-describedby = "firstName"
          name = "firstName" onChange={(e) => {setUserInfo({...userInfo, firstName:e.target.value,})}}
        />
      </div>
    </div>
    <div className = "form-group">
      <div className = "mb-3">
        <label htmlFor="Input-LastName"> Last Name </label>
        <input 
          type = "lastName" 
          className = "form-control"
          id = "Input-LastName"
          aria-describedby = "lastName"
          name = "lastName"
        />
      </div>
    </div>
    <div className = "form-group">
      <div className = "mb-3">
        <label htmlFor="Input-UserName"> User Name </label>
        <input 
          type = "userName" 
          className = "form-control"
          id = "Input-UserName"
          aria-describedby = "userName"
          name = "userName"
        />
      </div>
    </div>
    <div className = "form-group">
      <div className = "mb-3">
        <label htmlFor="Input-Email"> Email Address </label>
        <input 
          type = "email" 
          className = "form-control"
          id = "Input-Email"
          aria-describedby = "emailHelp"
          name = "email"
        />
      </div>
    </div>
    <div className = "form-group">
      <div className = "mb-3">
        <label htmlFor="Input-Password" className = "form-label">
          Password
        </label>
        <input 
          type = "password"
          className = "form-control"
          id = "Input-Password"
          name = "pwd"
        />
      </div>
    </div>
    <button type = "submit" className = "btn btn-primary">
      Submit
    </button>
    <Link to="/login">Already have an account?</Link>
  </form>
}

function Register() {
  return (
    <div className = "container-fluid">
      <div className="row">
        <div className = "text-center col-12">
          <h1>Register</h1>
          <div className = "col-md-4 offset-md-4">
            < RegisterForm />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
