import React, { useEffect, useState } from 'react';
import axios from "axios";
import {  useNavigate } from "react-router-dom";


let backendurl = "https://new-blogsite.vercel.app";

function Home() {

    const [allblogs,setAllblogs] = useState([]);
    const [token, setToken ] = useState(null);


    const navigate = useNavigate();
    async  function getblogs() {
        let blogs =  await axios.get(`${backendurl}/blogs`)
        setAllblogs(blogs);
    }
    useEffect(() => {
        if(localStorage.getItem("token")){
            setToken(localStorage.getItem("token"))
        };
        getblogs()
    }, []);

    return (
        <div>
            <nav className="navbar">
                {token ? <div></div> : <div><button onClick={()=>navigate(`/register`)}  >Register</button>
                    <button onClick={()=>navigate(`/login`)}>Login</button></div>}

            </nav>
            <main>
                {allblogs.map((each)=>{
                    return <div>{each.title}</div>
                })}
            </main>


        </div>
    )
}

export default Home
