import { Avatar } from '@mui/material'
import React, { useEffect, useState } from 'react'
import "../Post/Post.css"
import PhotoIcon from '@mui/icons-material/Photo';
import YouTubeIcon from '@mui/icons-material/YouTube';
import NewPost from '../NewPost/NewPost';
import { useNavigate } from 'react-router-dom';

const Post=()=>{
    const[posts,setPosts]=useState([])
    const savedItem = localStorage.getItem("User");
    const token=localStorage.getItem("mytoken")
    const[like,setLike]=useState(0)
    const navigate=useNavigate()
    const [user,setUser]=useState("")
    useEffect(()=>{
        setUser(savedItem)
    })

    useEffect(()=>{
        fetch("http://varunac.pythonanywhere.com/post/",{
            method : 'GET',
            headers: {
                'Content-Type':'application/json',
                'Authorization':`Token ${token}`
            }
        })
        .then(resp => resp.json())
        .then(result => {
            result.sort((a,b)=>{return new Date(b.uploaded)-new Date(a.uploaded)})
            setPosts(result.filter(item=>item.user===savedItem))
        })
        .catch(error => console.log(error))
    },[])

    
    return(
        <div id='post'>
            <div  id='post1'>
                <Avatar style={{backgroundColor:"orange"}}>{user.charAt(0)}</Avatar>
                <input id='post-input' type="text" placeholder='Start a post' onClick={()=>navigate("/createpost")}/>
            </div>
            <div id='postOptions'>
                <div className='option' onClick={()=>navigate("/createmedia")}>
                    <PhotoIcon style={{color:'blue'}}/>
                    <span>Photo</span>
                </div>
                <div className='option' onClick={()=>navigate("/createmedia")}>
                    <YouTubeIcon style={{color:'green'}}/>
                    <span>Video</span>
                </div>
            </div>
                   
            {
                posts.map((items)=>{
                    return items?<NewPost key={items.id} message={items.message} image={items.image_url} video={items.video_url} like={like} postId={items.id}/>:null
                })
            }
            
        </div>
    )
}

export default Post