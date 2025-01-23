import React from 'react'
import { Link } from 'react-router-dom'
import userInfo from "../slices/authSlice.js"
import '../App.css'

const Header = () => {
  return (
    <div className='navbar'>
        <div><h1>MernAuth</h1></div>
       
       
          <div className='nav-links'>
          <Link to='/login'>Sign-In</Link>
          <Link to='/register'>Sign-Up</Link>
          </div> 
       
    </div>
  )
}

export default Header
