import React, { useEffect, useState } from 'react';
import axios from "axios";
import { useNavigate } from "react-router-dom";


let backendurl = "https://new-blogsite.vercel.app";

function Home() {

    const [allblogs, setAllblogs] = useState([]);
    const [token, setToken] = useState(null);


    const navigate = useNavigate();
    async function getblogs() {
        let { data } = await axios.get(`${backendurl}/blogs`)
        console.log(data)
        setAllblogs(data.data);
    }
    useEffect(() => {
        if (localStorage.getItem("token")) {
            setToken(localStorage.getItem("token"))
        };
        getblogs()
    }, []);

    return (
        <div>
            <nav className="navbar">
                {token ? <button onClick={() => localStorage.removeItem("token")}>Log out</button> : <div><button onClick={() => navigate(`/register`)}  >Register</button>
                    <button onClick={() => navigate(`/login`)}>Login</button></div>}

            </nav>
            <main>
                {allblogs.map((each) => {
                    return (<div key={each._id} style={{ border: "2px solid tomato" }} onClick={() => navigate(`/blogpage/${each._id}`, { state: each })} >{each.title}</div>)
                })}
            </main>


        </div>
    )
}

export default Home
