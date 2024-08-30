import React, { useState } from 'react'
import axios from "axios"
import { useNavigate } from 'react-router-dom';


function Register() {

 const [username,setUsername] = useState('');
 const [email,setEmail] = useState('');
 const [password,setPassword] = useState('');


 const navigate = useNavigate()

 const registered = async (e)=>{
    e.preventDefault();
    console.log(username,email,password);
    try {
        const res = await axios.post(`${window.location.origin}/api/v1/user/register`,{username:username,email:email,password:password},{
            headers:{
                'Content-Type': 'application/json',
            },
            withCredentials:true
        })
        if(res.data.success){
            
            setEmail('')
            setPassword('')
            setUsername('')
            navigate('/login')
        }
        console.log(res.data.message)
       
    } catch (error) {
        if (error.response) {
            console.log(error.response.data.message);
        } else {
            console.log(error.message); 
        }
    }
 }

  return (
    <>
    <h1>Login</h1>
    <form onSubmit={registered}>
        <label>Username</label>
        <input type="text" value={username} onChange={(e)=>setUsername(e.target.value)} />
        <label>Email</label>
        <input type="email" value={email} onChange={(e)=>setEmail(e.target.value)} />
        <label>Password</label>
        <input type="password" value={password} onChange={(e)=>setPassword(e.target.value)} />
        <button type='submit'>Regsiter</button>

    </form>
    </>
  )
}

export default Register