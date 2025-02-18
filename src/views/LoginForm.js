import React, { useState } from "react";
import {
  Form,
  FormGroup,
  Label,
  Input,
  Button,
  Card,
  CardBody,
  Alert,
} from "reactstrap";
import { login } from '../grpcClient'
import { useNavigate } from "react-router-dom";
// import "bootstrap/dist/css/bootstrap.min.css";
// import "bootstrap/dist/css/bootstrap.min.css";

const LoginForm = ({ setIsLoggedIn, setTheUser, handleCheck }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState(null);
  const navigate = useNavigate()

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!username || !password) {
      setError("Please fill in both fields.");
      return;
    }
    setError(null);
    const res = await login({ username, password })
    if (res.message == "Error retrieving user") {
      setError("Invalid username or password");
    }
    else {
      console.log(res.message)
      localStorage.setItem("jwtToken", JSON.stringify(res.jwt_token))
      localStorage.setItem("theUser",JSON.stringify(username)) 
      setTheUser(username);
      setIsLoggedIn(true);
      navigate("/admin/home")
    }

  };

  const toggleShowPassword = () => {
    setShowPassword(preVal => !preVal)
  }

  return (
    <div className="d-flex justify-content-center align-items-center" style={{ minHeight: "100vh", marginTop: "-100px" }}>
      <Card className="shadow-lg loginContainer" style={{ width: "375px" }}>
        <CardBody className="login-body">
          <h3 className="text-center mb-4">Login</h3>
          <Form onSubmit={handleLogin}>
            <FormGroup>
              <Label for="username">User Name</Label>
              <Input
                type="text"
                id="username"
                placeholder="Enter your username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </FormGroup>
            <FormGroup>
              <Label for="password">Password</Label>
              <Input
                type={showPassword ? "text" : "password"}
                id="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <i id="passwordEye" class={`fa-regular ${showPassword ? 'fa-eye' : 'fa-eye-slash'}`} onClick={toggleShowPassword}></i>
            </FormGroup>
            {error && <span style={{ position: 'absolute', bottom: '9rem', color: 'red', fontSize: '12px' }}><i class="fa-solid fa-triangle-exclamation"></i> {error}</span>}
            <Button className="loginCTA" color="primary" block>
              Login
            </Button>
            <div className="mt-4" style={{ position: 'absolute', bottom: '54px', left: '50%', transform: 'translateX(-50%)' }}>
              <small className="text-muted">Don't have an account? <a href="#" className="text-primary font-weight-bold" onClick={() => { navigate('/signup') }}>Signup</a></small>
            </div>
          </Form>
        </CardBody>
      </Card>
    </div>
  );
};

export default LoginForm;
