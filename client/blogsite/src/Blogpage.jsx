import axios from "axios";
import jwt_decode from "jwt-decode";
import React, { useState, useEffect } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import "./blogpage.css";
import LoadingSpinner from "./LodingSpnner";

let backendurl =  "https://new-blogsite.vercel.app";

function Blogpage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = useParams();
  const [theBlog, setTheBlog] = useState(location.state);
  const [edit, setEdit] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  function createblog() {
    if (!localStorage.getItem("token")) {
      navigate(`/register`);
    } else {
      navigate("/creatblog");
    }
  }
  let auth = false;
  if (localStorage.getItem("token")) {
    const decoded = jwt_decode(localStorage.getItem("token"));
    auth = decoded.userId == location.state.userId._id;
  }

  async function submit(e) {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", theBlog.title);
    formData.append("description", theBlog.description);
    if (
      theBlog.blogFile &&
      theBlog.blogFile.length &&
      typeof theBlog.blogFile != String
    ) {
      formData.append("blogFile", theBlog.blogFile[0]);
    }
    setIsLoading(true);
    axios
      .put(`${backendurl}/blogs/${id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          "x-api-key": `${localStorage.getItem("token")}`,
        },
      })
      .then(function (res) {
        setIsLoading(false);
        console.log(res);
        window.alert(res.data.message);
        setEdit(false);
        navigate(`/blogpage/${res.data.data._id}`, { state: res.data.data });
      })
      .catch(function (err) {
        // window.alert(err.response.data.message)
        console.log(err);
      });
  }

  function handle(e) {
    const newblog = { ...theBlog };
    if (e.target.id == "blogFile") newblog[e.target.id] = e.target.files;
    else newblog[e.target.id] = e.target.value;
    setTheBlog(newblog);
    console.log(newblog);
  }
  return (
    <div>
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <div>
          {" "}
          {!edit ? (
            <React.Fragment>
              <div className="theblog">
                <h2>{location.state.title}</h2>
                <span>by {location.state.userId.name}</span>
                <p>{location.state.description}</p>
                <img src={location.state.blogFile} />
              </div>
              <div className="actions">
                <button onClick={createblog}>Create new blog</button>
                {auth && (
                  <button onClick={() => setEdit(true)}>Edit this blog</button>
                )}
              </div>
            </React.Fragment>
          ) : (
            <React.Fragment>
              <form className="form" onSubmit={(e) => submit(e)}>
                <span>Title: </span>
                <input
                  onChange={(e) => handle(e)}
                  value={theBlog.title}
                  type="text"
                  id="title"
                  required
                />
                <br />
                <textarea
                  onChange={(e) => handle(e)}
                  value={theBlog.description}
                  type="textarea"
                  id="description"
                  required
                />
                <br />
                <input
                  onChange={(e) => handle(e)}
                  // value={theBlog.blogFile}
                  type="file"
                  placeholder="Choose File"
                  id="blogFile"
                />
                <br />
                <img src={theBlog.blogFile}></img>
                <button type="submit">Submit</button>
              </form>
              <div className="actions">
                <button onClick={createblog}>Create new blog</button>
                <button onClick={() => setEdit(false)}>Back</button>
              </div>
            </React.Fragment>
          )}
        </div>
      )}
    </div>
  );
}

export default Blogpage;
