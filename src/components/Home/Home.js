import LeftSidebar from "../LeftSidebar/LeftSidebar"
import Navbar from "../Navbar/Navbar"
import Post from "../Post/Post"
import RightSidebar from "../RightSidebar/RightSidebar"
import "../Home/Home.css"

const Home=()=>{
    return(
        <div id='main'>
            <Navbar/>
            <div id='body'>
                <LeftSidebar/>
                <Post/>
                <RightSidebar/>
            </div>
        </div> 
    )
}

export default Home