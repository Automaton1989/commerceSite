import LoginForm from "../components/LoginForm";

function Login({ setUser }) {
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="text-center col-12">
          <h1 className="title">Login</h1>
          <div className="col-md-4 offset-md-4">
            <LoginForm setUser={setUser} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;