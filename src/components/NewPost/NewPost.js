import React, { useEffect, useState } from 'react'
import "../NewPost/NewPost.css"
import CommentIcon from '@mui/icons-material/Comment';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import DeleteIcon from '@mui/icons-material/Delete';
import { Avatar } from '@mui/material';

const NewPost=({message,image,video,like,postId})=>{
    const [num,setNum]=useState(like)
    const[data,setData]=useState()
    const[comment,setComment]=useState([])
    const[showComment,setShowComment]=useState(false)
    const[col,setCol]=useState("grey")
    const[likeClick,setLikeClick]=useState(true)
    const savedItem = localStorage.getItem("User");
    const token=localStorage.getItem("mytoken")

    useEffect(()=>{
        fetch(`https://varunac.pythonanywhere.com/post/${postId}/`,{
            method : 'GET',
            headers: {
                'Content-Type':'application/json',
                'Authorization':`Token ${token}`
            }
        })
        .then(resp => resp.json())
        .then(result => {
            const arr=result.comments
            arr.sort((a,b)=>{return new Date(b.uploaded)-new Date(a.uploaded)})
            setComment(arr.filter(item=>item.post===postId))
        })
        .catch(error => console.log(error))
    },[])

    const handleClick2=()=>{
        fetch(`https://varunac.pythonanywhere.com/comment/`, {
            method:'POST',
            headers: {
                'Content-Type':'application/json',
                'Authorization':`Token ${token}`
            },
            body:JSON.stringify({comments:data,post:postId})

        }).then(resp => resp.json())

        fetch(`https://varunac.pythonanywhere.com/post/${postId}/`,{
            method : 'GET',
            headers: {
                'Content-Type':'application/json',
                'Authorization':`Token ${token}`
            }
        })
        .then(resp => resp.json())
        .then(result => {
            const arr=result.comments
            arr.sort((a,b)=>{return new Date(b.uploaded)-new Date(a.uploaded)})
            setComment(arr.filter(item=>item.post===postId))
        })
        .catch(error => console.log(error))
        setData("")
    }
    
    const handleClick1=()=>{
        if(showComment===false){
            setShowComment(true)
        }
        else{
            setShowComment(false)
        }
    }

    const handleClick=()=>{
        if(likeClick===true){
            setNum(num+1)
            setCol("blue")
            setLikeClick(false)
        }
    }

    const deletePost=()=>{
        fetch(`https://varunac.pythonanywhere.com/post/${postId}/`,{
            method : 'DELETE',
            headers: {
                'Content-Type':'application/json',
                'Authorization':`Token ${token}`
            }
        })
        .catch(res=>console.log(res))
        window.location.reload(false);
    }  

    return(
        <div id='newpost' >
                <div id='postHeader'>
                    <div id='leftheader'>
                        <Avatar style={{backgroundColor:"orange"}}>{savedItem.charAt(0)}</Avatar>
                        <div id='details'>
                            <h3>{savedItem}</h3>
                        </div>
                    </div>
                    <div onClick={deletePost}>
                        <DeleteIcon/> 
                    </div> 
                </div>
                <div id='newpostBody'>
                    <p>{message}</p>
                    <p>
                        {image && <img className='mediapost' src={image} alt='post'/>}
                        {video && <video className='mediapost' src={video} type="video/mp4" controls/>}
                    </p>
                    <div><ThumbUpIcon style={{color:'blue',fontSize:"8px"}}/>{num}</div>
                </div>
                <div id='footer'>
                    <div id='footerOption'>
                        <div className='options' onClick={handleClick}>
                            <ThumbUpIcon style={{color:col}}/>
                            <span>like</span>
                        </div>
                        <div className='options' onClick={handleClick1} >
                            <CommentIcon/>
                            <span>comment</span>
                        </div>
                    </div>
                </div>
                <div id='comment'>
                {showComment?<form id='commentDiv1' onSubmit={handleClick2}>
                            <Avatar style={{backgroundColor:"orange"}}>{savedItem.charAt(0)}</Avatar>
                            <input id='comment-input' type="text" placeholder='Start comment' value={data} onChange={(e)=>{setData(e.target.value)}} />
                            <input id='sendbtn1' type='submit' />
                    </form>:null} 
                </div>
                <div id='commentSection'>{                
                    comment.map((items,index)=>{
                        return(
                            items?<><div id="avatarDiv" key={`comments_${index}`}><Avatar style={{height:"30px",width:"30px",backgroundColor:"orange"}}>{savedItem.charAt(0)}</Avatar><h4>{savedItem}</h4></div><div className='commentDiv' key={index}>{items.comments}</div></>  : null
                            )})}
                </div>
            </div>
    )
}

export default NewPost