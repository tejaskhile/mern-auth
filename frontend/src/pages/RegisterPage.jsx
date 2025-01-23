import React, {useState} from 'react'
import '../App.css'
import { Link } from 'react-router-dom'

const RegisterPage = () => {

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    
    const submitHandler = (e) =>{
        e.prevent.default();
    }

  return (
    <div className='registerpage'>
      <div className='sign-up' >
        <form onSubmit={submitHandler}>
          <h2>Sign Up</h2>
            <input type="name" placeholder='Name' value={name} onChange={(e)=> setName(e.target.value)} />
            <input type="email" placeholder='Email' value={email} onChange={(e)=> setEmail(e.target.value)} required/>
            <input type="password" placeholder='Password' value={password} onChange={(e)=> setPassword(e.target.value)} required/>
            <input type="password" placeholder='Confirm password' value={confirmPassword} onChange={(e)=> setConfirmPassword(e.target.value)} required/>
          <button>SignUp</button>
          <p>Already have an account?<Link to='/login'>Login</Link></p> 
        </form>
      </div>
    </div>
  )
}

export default RegisterPage
