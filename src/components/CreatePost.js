import React, { useEffect, useState } from "react";
import "./createpost.css";
import { toast, ToastContainer } from 'react-toastify';
function CreatePost() {

    const [title, setTitle] = useState('')
    const [body, setBody] = useState("");
    const [image, setImage] = useState("")
    const [url, setUrl] = useState("")
    const [loading, setLoading] = useState(false)

    const postData = () => {
        const data = new FormData();
        data.append("file", image);
        data.append("upload_preset", "uvigram");
        data.append("cloud_name", 'diapiscvg')
        fetch("https://api.cloudinary.com/v1_1/diapiscvg/image/upload", {
            method: "post",
            body: data
        })
            .then(res => res.json())
            .then(data => {
                // console.log(data)
                setLoading(false)
                setUrl(data.url)
                setLoading(true)
                console.log(data.url)

            })
            .catch(err => {
                console.log(err)
            })
    }

    useEffect(() => {

        fetch("http://localhost:9000/createpost", {
            method: "post",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("jwt")
            },
            body: JSON.stringify({
                title,
                body,
                pic: url
            })
        })
            .then(res => res.json()).then(data => {
                if (data.error) {
                    // console.log(data.error)
                    { loading ? toast.error(data.error) : console.log(data.error) }
                    // toast.error(data.error)


                }
                else {
                    console.log(data.Message);
                    toast.success(data.Message)
                }
            }).catch(err => {
                console.log(err)
            })
    }, [url])




    return (
        <div className="createPost">
            <div className="signuppage  bg-blue-800 text-white ">
                <div className="signup flex flex-row justify-around items-center">
                    <div className="container w-60 h-70">
                        <div className="border p-3  border-white">
                            <h1 className="text-3xl font-bold m-5 ">Create Post Here </h1>

                            <input
                                className="m-3 font-bold border text-yellow-800 border-black bg-none"
                                value={title} onChange={(e) => setTitle(e.target.value)}
                                type="text"
                                placeholder="Title "
                                required
                            />
                            <br />

                            <input
                                className="m-3 font-bold text-black"
                                type="text"
                                value={body} onChange={(e) => setBody(e.target.value)}
                                placeholder="Description Here "
                                required
                            />
                            <br />

                            <input
                                className="m-3 text-white font-bold"
                                type="file"

                                onChange={(e) => setImage(e.target.files[0])}
                                required
                            />
                            <br />

                            <button onClick={() => postData()} className="border rounded-xl  bg-red-800 m-3 text-blue text-2xl pl-5 pr-5 hover:bg-red-600 " >
                                Post
                            </button>
                            <ToastContainer />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CreatePost;
