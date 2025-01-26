import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import "../App.css";
import { useLogoutMutation} from '../slices/usersApiSlice.js'
import { logout} from '../slices/authSlice.js'


const Header = () => {
  
  const { userInfo } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [logoutApiCall] = useLogoutMutation();

  const logoutHandler= async()=>{
    try {
      await logoutApiCall().unwrap();
      dispatch(logout());
      navigate('/')
    } catch (err) {
      console.log(err);
    }
  }
  return (
    <div className="navbar">
      <div>
        <h1>MernAuth</h1>
      </div>
      <div className="nav-links">
        {userInfo ? (
          <>
            <div className="header-links">
              <Link>{userInfo.name}</Link>
              <Link to="/profile">Profile</Link>
              <Link onClick={logoutHandler} >Logout</Link>       
            </div>
          </>
        ) : (
          <>
            <Link to="/login">Sign-In</Link>
            <Link to="/register">Sign-Up</Link>
          </>
        )}
      </div>
    </div>
  );
};

export default Header;
