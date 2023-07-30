import React, {  useState } from 'react'
import "./Navbar.css"
import HomeIcon from '@mui/icons-material/Home';
import WorkIcon from '@mui/icons-material/Work';
import PeopleIcon from '@mui/icons-material/People';
import NotificationsIcon from '@mui/icons-material/Notifications';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { Avatar } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Navbar=()=>{
    const savedItem = localStorage.getItem("User");
    const [showlogout,setShowlogout]=useState(false)
    const navigate=useNavigate()

    const handleClick=()=>{
        localStorage.clear()
        navigate("/")
    }
    const profileClick=()=>{
        if(showlogout===true){
            setShowlogout(false)
        }
        else{
            setShowlogout(true)
        }
    }
    
    return(
        <nav>
            <div id='left'>
                <div>
                    <img src='https://play-lh.googleusercontent.com/kMofEFLjobZy_bCuaiDogzBcUT-dz3BBbOrIEjJ-hqOabjK8ieuevGe6wlTD15QzOqw=w240-h480-rw' alt='logo'/>
                </div>
            </div>
            <div id='right'>
                <button className='iconBtn'><HomeIcon /><span>Home</span></button>
                <button className='iconBtn'><PeopleIcon/><span>My Network</span></button>
                <button className='iconBtn'><WorkIcon/><span>Jobs</span></button>
                <button className='iconBtn'><NotificationsIcon/><span>Notifications</span></button>
            </div>
            <div className='avatar-section' onClick={profileClick}>
                <Avatar style={{backgroundColor:"orange"}}>{savedItem.charAt(0)}</Avatar>
                <ArrowDropDownIcon />
                {showlogout && <div className='avatar-profile'>
                    <Avatar style={{backgroundColor:"orange"}}>{savedItem.charAt(0)}</Avatar>
                    <h5>{savedItem}</h5>
                    <button id='logoutbtn' onClick={handleClick}>Logout</button>
                </div>}
            </div>
        </nav>
    )
}

export default Navbar