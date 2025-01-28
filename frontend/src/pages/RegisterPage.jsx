import React, {useState, useEffect} from 'react'
import '../App.css'
import { Link, useNavigate } from 'react-router-dom'
import { useRegisterMutation } from '../slices/usersApiSlice'
import { setCredentials } from '../slices/authSlice'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import Loader from '../components/Loader'

const RegisterPage = () => {

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    
    const [register, {isLoading}] = useRegisterMutation();

    const navigate = useNavigate('');
    const dispatch = useDispatch('');

    const {userInfo} = useSelector((state) => state.auth)
    
    useEffect(()=>{
        if(userInfo){
          navigate('/');
        }
    }, [navigate, userInfo]);
    
    const submitHandler = async (e) =>{
        e.preventDefault();
        if(password !== confirmPassword){
          toast.error('Passwords do not match')
        }else{
          try {
            const res = await register({name, email, password}).unwrap();
            dispatch(setCredentials({...res}));
            navigate('/');
          } catch (error) {
            toast.error(error)
          }

        }
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
          
          {isLoading && <Loader/>}

          <button>SignUp</button>
          <p>Already have an account?<Link to='/login'>Login</Link></p> 
        </form>
      </div>
    </div>
  )
}

export default RegisterPage
