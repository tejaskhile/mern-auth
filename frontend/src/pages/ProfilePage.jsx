import React, { useState, useEffect } from "react";
import "../App.css";
import { Link, useNavigate } from "react-router-dom";
import { setCredentials } from "../slices/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import {useUpdateUserMutation} from '../slices/usersApiSlice'
import Loader from '../components/Loader'



const ProfilePage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const navigate = useNavigate("");
  const dispatch = useDispatch("");

  const { userInfo } = useSelector((state) => state.auth);

  const [updateProfile, {isLoading}] = useUpdateUserMutation();

  useEffect(() => {
    if (userInfo) {
      setName(userInfo.name);
      setEmail(userInfo.email);
    }
  }, [userInfo]);

  const submitHandler = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
    }else{
      try{
        const res = await updateProfile({
          _id: userInfo._id,
          name, 
          email, 
          password
        }).unwrap();
        dispatch(setCredentials({...res}))
        toast.success('Profile Updated')
      }catch(err){
        toast.error(err?.data?.message)
    }

    }
  };

  return (
    <div className="updateProfilePage">
      <div className="sign-up">
        <form onSubmit={submitHandler}>
          <h2>Update Profile</h2>
          <input
            type="name"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            
          />
          <input
            type="password"
            placeholder="Confirm password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            
          />

          {isLoading && <Loader/>}

          <button>Update</button>
        </form>
      </div>
    </div>
  );
};

export default ProfilePage;
