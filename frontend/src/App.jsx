import React from 'react'
import Header from './components/Header.jsx'
import './App.css'
import {Routes, Route } from 'react-router-dom'
import Home from './pages/Home.jsx'
import ProfilePage from './pages/ProfilePage.jsx'
import LoginPage from './pages/LoginPage.jsx'
import RegisterPage from './pages/RegisterPage.jsx'
import PrivateRoute from './pages/PrivateRoute.jsx'
import { ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
// import 'bootstrap/dist/css/bootstrap.min.css'


const App = () => { 
  return (
    <div className='app'>
      <Header></Header>
      <ToastContainer/>
      <div className='main-content'>
        <Routes>
          <Route path='/' element={<Home/>} ></Route>      
          <Route path='/login' element={<LoginPage/>} ></Route>      
          <Route path='/register' element={<RegisterPage/>} ></Route>  
          {/* PrivateRoute     */}
          <Route path='' element={<PrivateRoute/>} >
            <Route path='/profile' element={<ProfilePage/>} ></Route>      
          </Route>      
        </Routes>
      </div>
    </div>
  )
}

export default App
