import '../App.css';

import { useNavigate } from "react-router-dom";

function LoginForm() {
  let navigate = useNavigate();

  async function handleLogin(event) {
    event.preventDefault();
    const email = document.getElementById("Input-Email-Login");
    const pwd = document.getElementById("Input-Password-Login");

    const data = {
      email: email.value,
      pwd: pwd.value,
    };

    const options = {
      method: "post",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    }

    console.log(data);

    //const rawData = await fetch submitLogin("/login", options);
    //HANDLE RESPONSE HERE FROM FETCH

    navigate("/");
  }

  return <form onSubmit = {handleLogin}>
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
  </form>
}

function Login() {
  return (
    <div className = "container-fluid">
      <div className="row">
        <div className = "text-center col-12">
          <h1>Login</h1>
          <div className = "col-md-4 offset-md-4">
            < LoginForm />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
