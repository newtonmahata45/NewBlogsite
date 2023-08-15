import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./login.css";
import LoadingSpinner from "./LodingSpnner";
let backendurl = "https://new-blogsite.vercel.app";
function Login() {
  const navigate = useNavigate();
  const [eye, setEye] = useState(true);

  const [user, setUser] = useState({ email: "", password: "" });
  const [isLoading, setIsLoading] = useState(false);

  const handleEye = () => {
    setEye(!eye);
  };
  async function submit(e) {
    e.preventDefault();
    const { email, password } = user;
    try {
      setIsLoading(true);
      const res = await axios.post(`${backendurl}/login`, { email, password });
      setIsLoading(false);
      console.log("login responce=>", res);
      if (res.data.data.token) {
        localStorage.setItem("token", res.data.data.token);
        window.alert(res.data.message);
        navigate(`/`);
      } else {
        console.log("adfsklj");
      }
    } catch (err) {
      setIsLoading(false);
      console.log("the login error =>", err);
      // err.response ? window.alert(err.response.data.message): window.alert(err.message);
    }
  }

  function handle(e) {
    const newUser = { ...user };
    newUser[e.target.id] = e.target.value;
    setUser(newUser);
    console.log(newUser);
  }
  return (
    <div className="body2">
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <React.Fragment>
          <form className="form2" onSubmit={(e) => submit(e)}>
            <div className="input1">
              <input
                onChange={(e) => handle(e)}
                value={user.email}
                type="email"
                placeholder="Email"
                id="email"
                required
              />
            </div>
            <div className="input1">
              <input
                onChange={(e) => handle(e)}
                value={user.password}
                type={eye ? "password" : "text"}
                placeholder="Password"
                id="password"
                required
              />
              <i onClick={handleEye}>i</i>
            </div>
            <button type="submit">Log In </button>
          </form>
          <div className="para">
            <p>Don't have account?</p>
            <span onClick={() => navigate("/register")} className="reg-btn">
              Register
            </span>
          </div>
        </React.Fragment>
      )}
    </div>
  );
}

export default Login;
