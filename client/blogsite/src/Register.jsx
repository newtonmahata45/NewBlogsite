import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./reg.css";
import LoadingSpinner from "./LodingSpnner";
let backendurl =  "https://new-blogsite.vercel.app";
function Register() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("token")) navigate(`/`);
  }, []);

  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [eye, setEye] = useState(true);
  const handleEye = () => {
    setEye(!eye);
  };

  async function submit(e) {
    e.preventDefault();
    const { name, email, password } = user;
    try {
      setIsLoading(true);
      const res = await axios.post(`${backendurl}/createuser`, {
        name,
        email,
        password,
      });

      setIsLoading(false);
      if (res.status == 201) {
        window.alert(res.data.message);
        navigate("/login");
      } else {
        window.alert(err.response.data.message);
      }
    } catch (err) {
      setIsLoading(false);
      console.log("the signup error =>", err);
      err.response
        ? window.alert(err.response.data.message)
        : window.alert(err.message);
    }
  }

  function handle(e) {
    const newUser = { ...user };
    newUser[e.target.id] = e.target.value;
    setUser(newUser);
    console.log(newUser);
  }
  return (
    <div className="body">
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <React.Fragment>
          <form className="form1" onSubmit={(e) => submit(e)}>
            <div className="inputs">
              <div className="input">
                <input
                  onChange={(e) => handle(e)}
                  value={user.name}
                  type="text"
                  placeholder="Full Name"
                  id="name"
                  required
                />
              </div>
              <div className="input">
                <input
                  onChange={(e) => handle(e)}
                  value={user.email}
                  type="email"
                  placeholder="Email"
                  id="email"
                  required
                />
              </div>
              <div className="input">
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
            </div>
            <button type="submit">Register</button>
          </form>
          <div className="para">
            <p>Already have account?</p>
            <span onClick={() => navigate("/login")} className="reg-btn">
              Login
            </span>
          </div>
        </React.Fragment>
      )}
    </div>
  );
}

export default Register;
