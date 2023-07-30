import { Avatar } from "@mui/material";
import { useEffect, useState } from "react";
import '../CreateMedia/CreateMedia.css'
import { useNavigate } from "react-router-dom";

const CreateMedia=()=>{
    const[body,setBody]=useState({
        message : "",
        image_url : "",
        video_url : ""
    })
    const [data,setData]=useState("")
    const[mediainput,setMediainput]=useState("")
    const[photo,setPhoto]=useState("")
    const[video,setVideo]=useState("")
    const[err,setErr]=useState(null)
    const savedItem = localStorage.getItem("User");
    const token=localStorage.getItem("mytoken")
    const navigate=useNavigate()

    useEffect(()=>{
        const videoExtensions = ['mp4', 'webm', 'ogg', 'avi', 'mov', 'wmv', 'flv'];
        const photoExtensions = ['jpg', 'jpeg', 'png', 'gif', 'bmp'];
        const fileExtension = mediainput.split('.').pop().toLowerCase()
        if(videoExtensions.includes(fileExtension)){
            setVideo(mediainput)
        }
        else if(photoExtensions.includes(fileExtension)){
            setPhoto(mediainput)
        }
    },[mediainput])

    const handlePost=()=>{
        const videoExtensions = ['mp4', 'webm', 'ogg', 'avi', 'mov', 'wmv', 'flv'];
        const photoExtensions = ['jpg', 'jpeg', 'png', 'gif', 'bmp'];
        const fileExtension = mediainput.split('.').pop().toLowerCase()

        if(data===""){
            setErr("Enter post details")
            navigate("/createmedia")
            return
        }
        if(videoExtensions.includes(fileExtension)){
            setVideo(mediainput)
        }
        else if(photoExtensions.includes(fileExtension)){
            setPhoto(mediainput)
        }
        else{
            setErr("Enter correct url format")
            navigate("/createmedia")
            return
        }
        fetch('http://127.0.0.1:8000/post/', {
            method:'POST',
            headers: {
                'Content-Type':'application/json',
                'Authorization':`Token ${token}`
            },
            body:JSON.stringify({message:data,image_url:photo,video_url:video})

        })
        .then(resp => {if (resp.ok) {
            return resp.json();
          } else {
            throw new Error('Failed to post data.');
          }})
            
        .catch(error => console.log(error))
        navigate("/feed")
    }

    return(
        <div className="create-media">
            <form className="create-media-profile" onSubmit={handlePost}>
                <div className="upper-section-media">
                    <div className="avatar-section-media">
                        <Avatar style={{backgroundColor:"orange"}}>{savedItem.charAt(0)}</Avatar>
                        <h3>{savedItem}</h3>
                    </div>
                    <button onClick={()=>navigate("/feed")}>X</button>
                </div>
                <div className="input-section-media">
                    <label htmlFor="media">Enter url here(url length should be less than 200 characters):</label>
                    <input id='media' type="url" value={mediainput} onChange={(e)=>{setMediainput(e.target.value)}}/>
                    <label htmlFor="message">Enter post details here:</label>
                    <input id='message' type="text" value={data} onChange={(e)=>{setData(e.target.value)}}/>
                    {err && <p>{err}</p>}
                </div>
                <div className="bottom-section-media">
                    <button onClick={()=>navigate("/feed")}>Close</button>
                    <button type='submit'>Done</button>
                </div>
            </form>
        </div>
    )
}

export default CreateMedia;