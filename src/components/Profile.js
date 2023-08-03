import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Cards from './Cards'
import "./profile.css"
import { useContext } from 'react'
import { UserContext } from '../App'

function Profile() {

    const { state, dispatch } = useContext(UserContext);
    const [myPost, setMyPost] = useState([])

    useEffect(() => {
        const fetchData = async () => {
            const data = await axios.get("http://localhost:9000/mypost", {
                headers: {
                    "Authorization": "Bearer " + localStorage.getItem('jwt')
                }
            })
            console.log("mypostdata", data.data.myPost)
            setMyPost(data.data.myPost)
        }
        fetchData();
    }, [])



    return (
        <div className="profileContent">
            <div className="container">
                <div className="part1">
                    {/* <h3>Profile pic</h3> */}
                    <img src="pngegg.png" className='w-44' alt="profile" />
                </div>
                <div className="part2">
                    <div><h3 className='text-4xl font-bold'>{state ? state.username : "loading"} </h3></div>
                    <div className="follow">
                        <h1 className='m-3 sm:text-2xl'>33 Post</h1>
                        <h1 className='m-3 sm:text-2xl'>33 Follower</h1>
                        <h1 className='m-3 sm:text-2xl'>33 following</h1>
                    </div>
                    <div>
                        <p>bio :
                            hii How are you !
                            this is yuvi
                        </p>
                    </div>

                </div>
            </div>
            <hr />
            <div className="secondpart">
                <div className="thiscontainer">

                    {
                        myPost.map((element) => {
                            return (
                                <>
                                    <Cards key={element._id} imgUrl={element.photo} title={element.title} />
                                </>


                            )
                        })

                    }
                </div>
            </div>

        </div>
    )

}

export default Profile