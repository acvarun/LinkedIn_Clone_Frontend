import React, { useState } from 'react'
import "../Login/Login.css"
import { useNavigate } from 'react-router-dom'

const Login=()=>{
    const [user,setUser] = useState('')
    const [password1, setPassword1] = useState('')
    const [error, setError] = useState('')
    const navigate=useNavigate()

    const handlelogin = (e) => {
        e.preventDefault()
        localStorage.setItem("User",user)
        fetch('https://varunac.pythonanywhere.com/dj-rest-auth/login/', {
            method:'POST',
            headers: {
                'Content-Type':'application/json'
            },
            body:JSON.stringify({username:user, password:password1})
        })
        .then(resp => resp.json())
        .then(result => {
            if(result.key === undefined) {
                setError("Invalid email or password")
                return

            }

            localStorage.setItem('mytoken', result.key)
            navigate('/feed')
        })
    }
    
    return(
        <div id='loginDiv'>
            <img src="https://grandnode.com/content/images/thumbs/5e4ba92f0857aa408cf9d866_login-with-linkedin_850.png" alt='logo'/>  
            <form>
                <input className='loginInput' name='username' placeholder='Username' type="text" value={user} onChange={e => setUser(e.target.value)} required/>
                <input className='loginInput' name='password' placeholder='Password' type="password" value={password1} onChange={e => setPassword1(e.target.value)} required/>
                {error ? <div className="err">{error}</div> : null}
                <button className='signbtn' onClick={handlelogin}>Log In</button>
                <p>New to LinkedIn? <button className='btn' onClick={()=>{navigate('/')}} >Join now</button></p>
            </form> 
        </div>
    )
}

export default Login;