import '../App.css';

import { Link } from "react-router-dom";

function RegisterForm() {
  
  return <form>
    <div className = "form-group">
      <div className = "mb-3">
        <label htmlFor="Input-FirstName"> First Name </label>
        <input 
          type = "firstName" 
          className = "form-control"
          id = "Input-FirstName"
          aria-describedby = "firstName"
          name = "firstName"
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
        <label htmlFor="Input-Email-Login"> Email Address </label>
        <input 
          type = "email" 
          className = "form-control"
          id = "Input-Email-Login"
          aria-describedby = "emailHelp"
          name = "email"
        />
      </div>
    </div>
    <div className = "form-group">
      <div className = "mb-3">
        <label htmlFor="Input-Password-Login" className = "form-label">
          Password
        </label>
        <input 
          type = "password"
          className = "form-control"
          id = "Input-Password-Login"
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
