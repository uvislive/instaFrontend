import React from 'react'
import "./home.css"
import axios from "axios"
import { useEffect, useState } from 'react'
import { useContext } from 'react'
import { UserContext } from '../App'

import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import CommentIcon from '@mui/icons-material/Comment';
import ShareIcon from '@mui/icons-material/Share';



function Home() {

    const { state, dispatch } = useContext(UserContext)
    const [post, setPost] = useState([])

    useEffect(() => {
        const fetchData = async () => {
            const data = await axios.get("http://localhost:9000/allpost", {
                headers: {
                    "Authorization": "Bearer " + localStorage.getItem("jwt")
                }
            })
            console.log(data.data.posts)
            setPost(data.data.posts)

        }
        fetchData();
    }, [])


    const LikePost = (id) => {


        fetch("http://localhost:9000/like", {
            method: "put",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("jwt")
            },
            body: JSON.stringify({
                postId: id
            })
        }).then(res => res.json())
            .then(result => {
                const newData = post.map((item) => {
                    if (item._id == result._id) {
                        return result
                    }
                    else {
                        return item;
                    }
                })
                setPost(newData);
            }).catch(err => {
                console.log(err)
            })

    }

    const UnlikePost = (id) => {
        fetch("http://localhost:9000/unlike", {
            method: "put",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("jwt")
            },
            body: JSON.stringify({
                postId: id
            })
        }).then(res => res.json()).then(result => {
            // /console.log(result);
            const newData = post.map(item => {
                if (item._id == result._id) {
                    return result;
                }
                else {
                    return item;
                }
            })
            setPost(newData);

        }).catch(err => {
            console.log(err)
        })

    }




    return (
        <>
            {post.map((element) => {
                return (
                    <>
                        <div className="home">


                            <div className="card">
                                <div className="card1">
                                    <h3 className='m-3 text-3xl'>{state.username}</h3>
                                    <img src={element.photo} alt="image doro" />
                                    <hr />
                                    <div className="likebar">
                                        <div className="like">
                                            {element.likes.includes(state._id)
                                                ? <span className='ml-3'>  <ThumbDownIcon fontSize='33px' onClick={() => UnlikePost(element._id)} /></span>

                                                : <span className='m-3'><ThumbUpIcon onClick={() => LikePost(element._id)} /></span>}

                                            <h1 className='ml-3'>  {element.likes.length} </h1>
                                            <p>Likes </p>
                                        </div>
                                        <div className="comment">
                                            <CommentIcon />
                                            <p> Comment </p>
                                        </div>
                                        <div className="share">
                                            <ShareIcon />
                                            <p> Share  </p>
                                        </div>


                                    </div>
                                </div>

                            </div>


                        </div >

                    </>
                )
            })


            }
        </>
    )
}

export default Home