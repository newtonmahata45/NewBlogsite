import axios from 'axios';
import jwt_decode from "jwt-decode";
import React, { useState, useEffect } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
let backendurl = "https://new-blogsite.vercel.app";
                //'http://localhost:3001'
function Createblog() {
    const navigate = useNavigate();
    const [blog, setBlog] = useState({});
    const decoded = jwt_decode(localStorage.getItem("token"));

    
    async function submit(e) {
        e.preventDefault();
        const formData = new FormData()
        formData.append("title",blog.title);
        formData.append("description",blog.description);
        if(blog.blogFile && blog.blogFile.length){
          formData.append("blogFile",blog.blogFile[0]);
        }
        formData.append("userId",decoded.userId);
        
        axios.post( `${backendurl}/blogs`,
           formData,
           { headers: { "Content-Type": "multipart/form-data","x-api-key":`${localStorage.getItem("token")}` }}
          )
            .then(function (res) {
                console.log(res);
              window.alert(res.data.message)
              navigate(`/blogpage/${res.data.data._id}`,{state:res.data.data});
            })
            .catch(function (err) {
            //   window.alert(err.response.data.message)
              console.log(err);
            });

    }
    
    function handle(e) {
        const newblog = { ...blog };
        if(e.target.id == "blogFile" )newblog[e.target.id] = e.target.files;
        else 
            newblog[e.target.id] = e.target.value;
        setBlog(newblog);
        console.log(newblog);
      }
    return (
        <div>
      <form className="form" onSubmit={(e) => submit(e)}>
        <span>Title: </span>
        <input
            onChange={(e) => handle(e)}
            value={blog.title}
            type="text"
            placeholder="Title of the blog"
            id="title"
            required
                /><br/>
        <textarea
            onChange={(e) => handle(e)}
            value={blog.description}
            type="textarea"
            placeholder="Write the content of the blog"
            id="description"
            required
                /><br/>
        <input
            onChange={(e) => handle(e)}
            type="file"
            placeholder="Choose File"
            id="blogFile"
                /><br/>
        <button type="submit">Create</button>
      </form>
    </div>
  )
}

export default Createblog
