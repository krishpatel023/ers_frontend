import './styles/header.css'
import {NavLink} from 'react-router-dom';
import React from 'react';
import { useRef } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import Logo from '../assets/logo.png'
import {useState,useEffect} from "react"
import axios from 'axios'
import { backendURL , config} from '../utils';
import {useCookies} from 'react-cookie'
function Header() {
	const navRef = useRef(null);

	function showNavbar(){
		navRef.current.classList.toggle(
			"responsive_nav"
		);
	};

  const [dataBase,setData]=useState(false)
  const [cookies, setCookie, removeCookie] = useCookies(['user']);

  useEffect(()=>{
    try{
      const ca = cookies.access_token;
      if(ca){
            console.log(ca)
            setData(true)
      }
      else{
        setData(false)
      }
    }
    catch(err){
          console.log(err)
          setData(false)
    }

    // axios.get(`${backendURL}/api/auth/validate`,config)
    //   .then( function(response){
    //       if(response.data.access_token){
    //         console.log(response.data.access_token)
    //         setData(true)
    //       }
    //       else{
    //         setData(false)
    //       }
    //   })
    //   .catch(function(error){
    //       console.log(error)
    //       setData(false)
    //   })
  },[])
	return (
    <header>
      <div className="logo-section">
        <NavLink to='/' className="trial"><img src={Logo} alt="" /></NavLink>
      </div>
      <div className="detail-section">
        <nav ref={navRef}>
          
          
          <NavLink to='/dataPage'>Data</NavLink>
          <NavLink to='/newsPage'>News</NavLink>
          <NavLink to='/listHospital'>Hospitals</NavLink>
          <NavLink to='/about'>About</NavLink>
          <NavLink to='/admin/dashboard'>Admin</NavLink>
          <NavLink to='/userDashboard'>User</NavLink>
          <NavLink className='header-special-btn' to=            
            {
              dataBase === true?
              "/logout":
              "/login"
            }>
            {
              dataBase === true?
              "Logout":
              "Login"
            }
          </NavLink>
          <button className="nav-btn nav-close-btn" onClick={showNavbar}>
            <FaTimes />
          </button>
        </nav>
      </div>
      <div className="btn-section">
        <button className="nav-btn" onClick={showNavbar}>
          <FaBars />
        </button>
      </div>
    </header>
  );
}

export default Header;