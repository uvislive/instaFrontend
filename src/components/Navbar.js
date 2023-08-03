// import React from 'react'
// import './Navbar.css'
// function Navbar() {
//     return (
//         <div className="navbar">
//             <nav className='flex  flex-wrap justify-between items-center border border-b-slate-400  text-black flex-row '>
//                 <div className='navbar1' >
//                     <span>
//                         <img src="uvislive.png" alt="imd" />
//                         <h3>Uvigram.com</h3>
//                     </span>
//                 </div>
//                 <div className="navbar2 ">
//                     <div className='flex items-center   text-xl'>
//                         <p> Sign In  </p>
//                         <p> Sign UP  </p>
//                         <p> Create Post  </p>
//                         <p> Profile  </p>
//                         <button className='text-xl bg-red-800 hover:bg-red-600 rounded-t-md p-4'>Sign Up</button>
//                     </div>
//                 </div>
//             </nav>
//         </div>



//     )
// }

// export default Navbar




import React from 'react'
import './Navbar.css'
import { Link, useNavigate } from "react-router-dom"
import { useContext } from 'react'
import { UserContext } from '../App'
import { toast, ToastContainer } from "react-toastify"


function Navbar() {



    const { state, dispatch } = useContext(UserContext);
    const navigate = useNavigate()
    const renderList = () => {

        if (state) {
            return (
                <>
                    <div className='m-4 '><Link to="/home">Home</Link>  </div>
                    <div className='m-4 '><Link to="/profile">Profile</Link>  </div>
                    <div className='m-4 '><Link to="/createPost">CreatePost</Link>  </div>
                    <div className='m-4 '> <button onClick={() => {
                        localStorage.clear();
                        dispatch({ type: "CLEAR" })
                        navigate("/signin");
                        toast.success("Logging Out")
                    }}>LogOut</button> </div>
                </>
            )
        }
        else {
            return (
                <>
                    <div className='m-4 '><Link to="/signin">Sign in</Link>  </div>
                    <div className='m-4 '><Link to="/signup">Sign Up</Link>  </div>
                </>
            )

        }
    }


    return (
        <div className="navbar">
            <div>
                <nav className='bg-blue-800 uvixa flex flex-wrap justify-between items-center'>
                    <div>
                        <span className='flex items-center'>
                            <img className="h-24" src=" uvislive.png" alt="img" />
                            <h1 className='navname text-4xl text-white first-letter:to-blue-400 '><Link to={state ? "/" : "/signin"}> Uvigram.com </Link></h1>
                        </span>
                    </div>
                    <div className='thisNav text-3xl  text-white '>
                        {/* <div className='m-4 '><Link to="/home">Home</Link>  </div>
                        <div className='m-4 '><Link to="/profile">Profile</Link>  </div>
                        <div className='m-4 '><Link to="/createPost">CreatePost</Link>  </div>
                        <div className='m-4 '><Link to="/signin">Sign in</Link>  </div>
                        <div className='m-4 '><Link to="/signup">Sign Up</Link>  </div> */}
                        {renderList()}
                        <ToastContainer />
                        {/* <button className="text-2xl mr-2 ml-2 font-bold rounded-xl p-3 bg-red-600 hover:bg-red-500">Sign Up</button> */}
                    </div>

                </nav>

            </div>



        </div>
    )
}

export default Navbar