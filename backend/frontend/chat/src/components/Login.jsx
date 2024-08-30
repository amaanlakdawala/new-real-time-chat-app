import axios from 'axios';
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { setAuthUser } from '../redux/authSlice';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch()
  const user = useSelector(state => state.user)
  const navigate = useNavigate()



  const login = async (e)=>{
    e.preventDefault();
    console.log(email,password)
    try {
      const res = await axios.post(`${window.location.origin}/api/v1/user/login`,{email:email,password:password},{
        headers:{
          'Content-Type': 'application/json',
      },
      withCredentials:true     
    })
    if(res.data.success){
      dispatch(setAuthUser(res.data.user))
      setEmail('')
      setPassword('')
      navigate('/')

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
    <form onSubmit={login}>
      <label>email</label>
      <input type="email" value={email} onChange={(e)=>setEmail(e.target.value)}/>
      <label>password</label>
      <input type='password' value={password} onChange={(e)=>setPassword(e.target.value)} />
      <button type='submit'>Login</button>

    </form>
    </>
  )
}

export default Login