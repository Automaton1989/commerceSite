import '../App.css';
//import PropTypes from "prop-types";
import { useNavigate, Link } from "react-router-dom";

function LoginForm({setUser}) {
  let navigate = useNavigate();

  async function handleLogin(event) {
    event.preventDefault();
    const email = document.getElementById("Input-Email-Login");
    const pwd = document.getElementById("Input-Password-Login");

    const data = {
      email: email.value,
      pwd: pwd.value,
    };

    const getInputUser = {
      method: "post",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    }

    const rawData = await fetch("/api/login", getInputUser);
    if (rawData.status === 200) {
      const fetchData = await fetch("/api/user/data");
      const res = await fetchData.json();
      console.log("user in login:", res.username);
      setUser(res.username);
      navigate("/");
    } else if (rawData.status === 409) {
      const res = await rawData.json();
      alert(res.login);
    } else {
      alert("Something's wrong, please try again!");
    }

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
    <button type = "submit" className = "btn btn-color btn-primary btn-block">
      Submit
    </button>
    <Link className = "link" to="/register">Don't have an account?</Link>
  </form>
}

function Login({setUser}) {
  return (
    <div className = "container-fluid">
      <div className="row">
        <div className = "text-center col-12">
          <h1 className = "title">Login</h1>
          <div className = "col-md-4 offset-md-4">
            < LoginForm setUser={setUser} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
