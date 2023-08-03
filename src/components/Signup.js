import React, { useState } from 'react'
import "./signup.css"
import { Link } from 'react-router-dom'
import { toast, ToastContainer } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
function Signup() {

    // const notify = () => {
    //     toast("successfully sign up")
    // }
    const navigate = useNavigate();

    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    // const SignupUser = () => {
    //     const data = { username, email, password };
    //     console.log(data)
    //     fetch("http://localhost:9000/signup", {
    //         method: "POST",
    //         headers: {
    //             "Content-Type": "application/json",
    //             "Accept": "application/json"
    //         },
    //         body: JSON.stringify(data)
    //     }).then((response) => {
    //         console.log("response", response)
    //         toast.success("successfully sign up")
    //     })

    // }


    const SignupUser = () => {

        const data = { username, email, password }
        fetch("http://localhost:9000/signup", {
            method: "post",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            // body: JSON.stringify({
            //     username: "",
            //     email: "",
            //     password: ""
            // })
            body: JSON.stringify({
                username,
                email,
                password
            })
        }).then(res => res.json())
            .then(data => {
                if (data.error) {
                    toast.error(data.error)
                    console.log(data.error)
                }
                else {

                    toast.success(data.message)
                    console.log(data.message)
                    navigate('/signin')
                }
            })

    }

    return (
        <div className="signuppage  bg-blue-800 text-white ">
            <div className="signup flex flex-row justify-around items-center">
                <div className="container w-60 h-70">                <div className='border p-3  border-white'>
                    <h1 className='text-3xl font-bold m-5 '>Sign Up Here </h1>

                    <input className='m-3 font-bold text-black' type="text"
                        value={username} onChange={(e) => setUsername(e.target.value)}
                        placeholder='Enter Username' required />
                    <br />
                    <input className='m-3 border text-yellow-800 font-bold border-black bg-none'
                        value={email} onChange={(e) => setEmail(e.target.value)}

                        type="email" placeholder='email here' required />
                    <br />

                    <input className='m-3 text-black font-bold' type="password" placeholder='Password here'
                        value={password} onChange={(e) => setPassword(e.target.value)}
                        required />
                    <br />
                    <button onClick={() => SignupUser()} className='border rounded-sm bg-red-500 m-3 text-blue text-2xl pl-3 pr-3 '>Submit</button>

                    <h3 className='m-3'><Link to="/signin"> already Have an Account!</Link></h3>
                    <ToastContainer />

                </div>
                </div>

            </div>


        </div>


    )
}

export default Signup