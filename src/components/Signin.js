import React, { useState, useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import { UserContext } from "../App"
import "./signin.css"

// import { useHistory } from "react-router-dom";
// import { useHistory } from "react-router-dom"


function Signin() {
    const { state, dispatch } = useContext(UserContext);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    // const history = useHistory();
    // const history = useHistory();
    // const Login = () => {
    //     const data = { email, password }
    //     console.log(data)
    //     fetch("http://localhost:9000/signin", {
    //         method: "POST",
    //         headers: {
    //             "Content-Type": "application/json",
    //             "Accept": "application/json"
    //         },
    //         body: JSON.stringify(data)

    //     }).then(res => {
    //         res.json();

    //     }).then(data => {
    //         if (data.error) {
    //             console.log(data.error)
    //             toast(data.error);
    //         }
    //         else {
    //             toast(data.message);
    //             console.log(data.message)
    //         }
    //     })
    //         .catch(err => {
    //             console.log(err)
    //         })
    // }

    const Login = () => {
        const data = { email, password }
        console.log(data)
        fetch("http://localhost:9000/signin", {
            method: "post",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email,
                password
            })
        })
            .then(res => res.json())
            .then(data => {
                if (data.error) {
                    toast.error(data.error)
                    console.log(data.error)

                }
                else {
                    localStorage.setItem("jwt", data.token)
                    localStorage.setItem("user", JSON.stringify(data.user));
                    dispatch({ type: "USER", payload: data.user })
                    toast.success("SuccessFully Logged In")
                    // toast.success(data.user)
                    console.log("userdata", data.user)
                    // history.push("/")
                    navigate("/")

                }
            })
    }





    return (
        <div className="signuppage  bg-blue-800 text-white ">
            <div className="signup flex flex-row justify-around items-center">
                <div className="container w-60 h-70">                <div className='border p-3  border-white'>
                    <h1 className='text-3xl font-bold m-5 '>Sign In Here </h1>


                    <input className='m-3 border font-bold text-yellow-800 border-black bg-none' type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder='email here' />
                    <br />

                    <input className='m-3 font-bold text-black' type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder='Password here' />
                    <br />
                    <button onClick={() => Login()} className='border rounded-sm bg-red-500 m-3 text-blue text-2xl pl-3 pr-3 '>Submit</button>

                    <h3 className='m-3'><Link to="/signup"> Do Not have Acccount?</Link></h3>
                    <ToastContainer />
                </div>
                </div>

            </div>
        </div>


    )
}

export default Signin;