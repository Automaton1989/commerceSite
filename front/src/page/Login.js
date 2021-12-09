import LoginForm from "../components/LoginForm";
import { Link } from "react-router-dom";

function Login({ setUser }) {
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="text-center col-12">
          <h1 className="title">Login or create an account here</h1>
          <div className="col-md-4 offset-md-4">
            <LoginForm setUser={setUser} />
            <div className="py-4">
              <span className="section-breaker">or</span>
              <p>Not Register?</p>
              <Link className="link link-big" to="/register">
                Create an account here
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;