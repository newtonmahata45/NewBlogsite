import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./home.css";

let backendurl = "https://new-blogsite.vercel.app";

function Home() {
  const [allblogs, setAllblogs] = useState([]);
  const [token, setToken] = useState(null);

  const navigate = useNavigate();
  async function getblogs() {
    let { data } = await axios.get(`${backendurl}/blogs`);
    console.log(data);
    setAllblogs(data.data);
  }
  useEffect(() => {
    if (localStorage.getItem("token")) {
      setToken(localStorage.getItem("token"));
    }
    getblogs();
  }, []);

  return (
    <div>
      <nav className="navbar">
        {token ? (
          <button
            onClick={() => {
              localStorage.removeItem("token");
              window.location.reload();
            }}
          >
            Log out
          </button>
        ) : (
          <div>
            <button onClick={() => navigate(`/register`)}>Register</button>
            <button onClick={() => navigate(`/login`)}>Login</button>
          </div>
        )}
      </nav>
      <main>
        {allblogs.map((each) => {
          return (
            <div className="container" key={each._id}>
              <div
                className="card"
                
                onClick={() =>
                  navigate(`/blogpage/${each._id}`, { state: each })
                }
              >
                <div className="card__header">
                  <img
                    src={each.blogFile}
                    className="card__image"
                    width="600"
                  />
                </div>
                <div className="card__body">
                  <h4>{each.title}</h4>
                  <span>-- {each.userId.name}</span>
                  <span className="date"><b>{(new Date(each.createdAt)).toDateString()}</b></span>
                </div>
              </div>
              </div>
          );
        })}
      </main> 
    </div>
  );
}

export default Home;
