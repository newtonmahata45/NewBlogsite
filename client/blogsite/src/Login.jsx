import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import "./login.css"
let backendurl = "https://new-blogsite.vercel.app";

function Login() {
    const navigate = useNavigate();
    const [eye, setEye] = useState(true);

    const [user, setUser] = useState({email: "", password: "",});
    
    
    const handleEye = () => {
        setEye(!eye);
      };
    async function submit(e) {
      e.preventDefault();
      const {email,password} = user;
        try {
          const res = await axios.post(`${backendurl}/login`, { email, password});
  
          console.log("login responce=>", res);
          if (res.data.data.token) {
            localStorage.setItem("token", res.data.data.token);
            window.alert(res.data.message);
            navigate(`/`);
          }
          else{
            console.log("adfsklj")
          }
        } catch (err) {
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
    <div className='body2'>
         <form className="form2" onSubmit={(e) => submit(e)}>
       <React.Fragment>
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
                      <i
                        onClick={handleEye}
                      >i</i>
                    </div>
                  <button type="submit">Log In </button>
                </React.Fragment>
        </form>
        <div className='para'>
        <p >Don't have account?</p><span onClick={()=>navigate('/register')} className='reg-btn'>Register</span>
        </div>
    </div>
  )
}

export default Login
