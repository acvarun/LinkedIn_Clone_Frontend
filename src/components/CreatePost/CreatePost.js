import { Avatar } from "@mui/material";
import { useState } from "react";
import '../CreatePost/CreatePost.css'
import { useNavigate } from "react-router-dom";

const CreatePost=()=>{
    const [data,setData]=useState("")
    const savedItem = localStorage.getItem("User");
    const token=localStorage.getItem("mytoken")
    const navigate=useNavigate()
    const handlePost=()=>{
        fetch('http://127.0.0.1:8000/post/', {
            method:'POST',
            headers: {
                'Content-Type':'application/json',
                'Authorization':`Token ${token}`
            },
            body:JSON.stringify({message:data})

        }).then(resp => resp.json())
        .catch(error => console.log(error))
        navigate("/feed")
    }

    return(
        <div className="create-post">
            <form className="create-post-profile" onSubmit={handlePost}>
                <div className="upper-section">
                    <div className="avatar-section">
                        <Avatar style={{backgroundColor:"orange"}}>{savedItem.charAt(0)}</Avatar>
                        <h3>{savedItem}</h3>
                    </div>
                    <button onClick={()=>navigate("/feed")}>X</button>
                </div>
                <div className="input-section">
                    <textarea type="text" placeholder="What do you want to talk about?" value={data} rows="4" col="50" onChange={(e)=>setData(e.target.value)}></textarea>
                </div>
                <div className="bottom-section">
                    <button type="submit">Post</button>
                </div>
            </form>
        </div>
    )
}

export default CreatePost;