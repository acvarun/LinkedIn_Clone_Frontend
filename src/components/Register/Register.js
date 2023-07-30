import { useState } from "react"
import { useNavigate } from "react-router-dom"
import "../Register/Register.css"

const Register=()=>{
    const [user, setUser] = useState('')
    const [emailId, setEmailId] = useState('')
    const [Password1, setPassword1] = useState('')
    const [Password2, setPassword2] = useState('')
    const [error,setError] = useState(null)

    let navigate = useNavigate()

    const register = (e) => {
        e.preventDefault()
        fetch('https://varunac.pythonanywhere.com/dj-rest-auth/registration/', {
            method:'POST',
            headers: {
            'Content-Type':'application/json'
            },
            body:JSON.stringify({username:user, email:emailId, password1:Password1, password2:Password2})
        })
        .then((res) => {
            if (res.ok) {
              return res.json();
            } else {
              return res.json().then((data) => {
                const modifiedErrors = {};
                for (const [field, errorArray] of Object.entries(data)) {
                    modifiedErrors[field] = [errorArray[0]];
                }
                setError(modifiedErrors);
                throw new Error("Bad Request");
              });
            }
          })
        .then(() => {
            navigate('/login')
        })
        .catch((error) => {
            console.log(error)
          })
        navigate("/")
    }
    return(
        <div id='loginDiv'>
            <img src="https://grandnode.com/content/images/thumbs/5e4ba92f0857aa408cf9d866_login-with-linkedin_850.png" alt='logo'/>
            <form onSubmit={register}>
                <input className='loginInput' placeholder='Full name' name='name' type="text" value={user} onChange={e=>setUser(e.target.value)} required/> 
                <input className='loginInput' placeholder='Email' name='email' type="email" value={emailId} onChange={e=>setEmailId(e.target.value)} required/>
                <input className='loginInput' placeholder='Password1' name='password1' type="password" value={Password1} onChange={e=>setPassword1(e.target.value)} required/>
                <input className='loginInput' placeholder='Password2' name='password2' type="password" value={Password2} onChange={e=>setPassword2(e.target.value)} required/>
                <button className="signbtn" type='submit'>Register</button>
                <p>Already on LinkedIn? <button className='btn' onClick={()=>{navigate('/login')}}>Sign in</button></p>
            </form>
            {error && (
                    <ul className="err">
                    {Object.entries(error).map(([field, errorArray]) => (
                      <li key={field}>{errorArray[0]}</li>
                    ))}
                  </ul>
                )}
        </div>
    )
}

export default Register