import React, { useState, useEffect } from 'react'
import '../App.css'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { useLoginMutation } from '../slices/usersApiSlice.js'
import { setCredentials } from '../slices/authSlice.js'
import { toast } from 'react-toastify'


const LoginPage = () => {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const navigate = useNavigate('');
  const dispatch = useDispatch('');

  const [login, {isLoading}] = useLoginMutation();
  const {userInfo} = useSelector((state) => state.auth)

  useEffect(()=>{
    if(userInfo){
      navigate('/');
    }
  }, [navigate, userInfo]);

  const submitHandler = async (e) =>{
    e.preventDefault();
    try {
      const res = await login({email, password}).unwrap();
      dispatch(setCredentials({...res}))
      navigate('/')
    }
     catch(err) {
      toast.error("Inavlid email or password")
    }
  }


  return (
    <div className='loginpage'>
      <div className='login-form' >
        <form onSubmit={submitHandler} >
          <h2>Sign In</h2>
            <input type="email" placeholder='Email' value={email} onChange={(e)=> setEmail(e.target.value)} required/>
            <input type="password" placeholder='Password' value={password} onChange={(e)=> setPassword(e.target.value)} required/>
          <button>SignIn</button>
          <p>Don't have an account?<Link to='/register'>Register</Link></p> 
        </form>
      </div>
    </div>
  )
}

export default LoginPage
