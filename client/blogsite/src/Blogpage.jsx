import axios from 'axios';
import jwt_decode from "jwt-decode";
import React, { useState, useEffect } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import Createbog from './Createbog';
let backendurl = "https://new-blogsite.vercel.app";

function Blogpage() {
  
  let navigate = useNavigate();
  let { id } = useParams()
  const [theBlog, setTheBlog] = useState({});
  const [component,setComponent] = useState(false);
  const location = useLocation();
  function createblog() {
      if (!localStorage.getItem("token")) {
          navigate(`/register`)
      }
      else{
        navigate('/creatblog') 
      }
  }
  return (
    <div>
        <React.Fragment>
        <div className="theblog">
        <h2>{location.state.title}</h2>
        <p>{location.state.description}</p>
        <img src={location.state.blogFile}/>
        </div>
        <div className="actions">
            <button onClick={createblog}>Create new blog</button>
            <button>Edit this blog</button>
        </div>
        </React.Fragment>
    </div>
  )
}

export default Blogpage;

