import React from 'react'
let backendurl = "https://new-blogsite.vercel.app";

function Login() {
    const [eye, setEye] = useState(true);

    const [user, setUser] = useState({email: "", password: "",});
    
    
    const handleEye = () => {
        setEye(!eye);
      };
    async function submit() {
        try {
          const res = await axios.post(`${backendurl}/login`, { email, password });
  
          console.log("login responce=>", res);
          if (res.data.token) {
            localStorage.setItem("token", res.data.token);
            window.alert("login successfull");
            navigate(`/`);
          }
        } catch (err) {
          console.log("the login error =>", err);
          err.response ? window.alert(err.response.data.message): window.alert(err.message);
        }
    }

    function handle(e) {
        const newUser = { ...user };
        newUser[e.target.id] = e.target.value;
        setUser(newUser);
        console.log(newUser);
      }
  return (
    <div>
         <form className="form" onSubmit={(e) => submit(e)}>
       <React.Fragment>
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
                      <i
                        className={eye ? "fa fa-eye-slash" : "fa fa-eye"}
                        onClick={handleEye}
                      ></i>
                    </div>
                  <button type="submit">Log In </button>
                </React.Fragment>
        </form>
    </div>
  )
}

export default Login
