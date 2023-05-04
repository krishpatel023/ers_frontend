import React from "react";
import "./userDashboard.css";
import img1 from "../../assets/logo.png";
import { useState,useEffect } from "react"
import { useNavigate,Link, useParams} from "react-router-dom"
import axios from 'axios'
import Header from "../../components/header";
import { config, backendURL } from "../../utils";
import { useCookies } from'react-cookie';
export default function Dashboard() {

  const [id,setId]=useState()
  const [dataBase,setDatabase]=useState()
  const [firstName, setFirstName ] =useState()
  const [lastName, setLastName ] =useState()
  const [email, setEmail ] =useState()
  const [imgData, setImgData]=useState()
  const [Token,setToken]=useState()
  const [blocker, setBlocker]=useState(false)
  const [isEdited, setIsEdited] =useState(false)
  const navigate = useNavigate()
  const [cookies, setCookie, removeCookie] = useCookies(['user']);
  function redirectLogin(req,res,next){
      try{
        if(req.error){
          navigate('/login')
        }
      }catch(error){
        console.log(error)
      }
  }
    const convertImage = (e)=>{
      var render = new FileReader()
      render.readAsDataURL(e)
      render.onload = () => {
          // console.log(render.result.length)
          if(render.result.length < (90*1024)){
              setImgData(render.result)
          }
      }
      render.onerror = error => {
          console.log("ERROR : ",error)
      }
  }
  useEffect(()=>{
    try{
      const ca = cookies.access_token;
      if(ca){
        setToken(ca)
      }
      else{
        redirectLogin({error:true})
      }
    }
    catch(error){
      console.log(error)
      redirectLogin(error.response.data)
    }
  // axios.get(`${backendURL}/api/auth/validate`,config)
  //     .then( function(response){
  //         if(response.data.access_token){
  //             setToken(response.data.access_token)
  //         }
  //         else{
  //             redirectLogin({error:true})
  //         }
  //     })
  //     .catch(function(error){
  //         console.log(error)
  //         redirectLogin(error.response.data)
  //     })
  },[blocker])
  const handleConversion2 = async ()=>{
    const ca = Token;
    const base64Url =await ca.split('.')[1];
    const decodedValue = JSON.parse(window.atob(base64Url));
    return decodedValue.id
  }

  const handleFunctionCall = async()=>{
    const myID = await handleConversion2();
    setId(myID)
    try{
      axios.get(`${backendURL}/api/users/${myID}`,config)
        .then( function(response){
          setDatabase(response.data)
          setFirstName(response.data.firstname)
          setLastName(response.data.lastname)
          setEmail(response.data.email)
          setImgData(response.data.img)
        })
        .catch(function(error){
            console.log(error)
            redirectLogin(error.response.data)
        })
    }catch(error){
      console.log(error)
    }
  }
  if(Token && !blocker){
    handleFunctionCall()
    setBlocker(true)

  }
  const handleEdit = ()=>{
    axios.put(`${backendURL}/api/users/${id}`,{firstname : firstName, lastname: lastName, email: email , img: imgData}, config)
      .then(function(response){
          setIsEdited(true)
          console.log("SUCCESS")
      })
      .catch(function(error){
          console.log(error)
      })
  }
  const handleDelete = async()=>{
    axios.delete(`${backendURL}/api/users/${id}`, config)
      .then(function(response){
          // setIsDeleted(true)
          navigate('/logout')
      })
      .catch(function(error){
          console.log(error)
      })
  }
  const handleInputClick = ()=>{
    document.getElementById('getFileDash').click()
  }  
  return (
    <>
      <div className="user-dashboard-wrapper">
      <Header/>
      {
        dataBase?
        <div
        style={{
          display: "flex",
          justifyContent: "center",
          paddingTop: "20px",
          paddingBottom: "20px",
        }}
      >
        <div className="dashboard-main">
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              flexDirection: "column",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems:"center",
                borderBottom: "1px solid black",
                paddingBottom: "20px",
              }}
            >
              <img src={dataBase.img} alt="#" className="user-profile-pic" />
            </div>

            <form className="user-profile-form">
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <div>
                  <label htmlFor="fname">First Name</label>
                  <br />
                  <input
                    type="text"
                    defaultValue={dataBase.firstname}
                    className="user-profile-form-input"
                    onChange={(e)=>{setFirstName(e.target.value)}}
                  />
                </div>
                <div>
                  <label htmlFor="fname">Last Name</label>
                  <br />
                  <input
                    type="text"
                    defaultValue={dataBase.lastname}
                    className="user-profile-form-input"
                    onChange={(e)=>{setLastName(e.target.value)}}
                  />
                </div>
              </div>
              <div style={{ paddingTop: "35px" }}>
                <label htmlFor="fname">Email</label>
                <br />
                <input
                  type="text"
                  defaultValue={dataBase.email}
                  className="user-dash-email"
                  onChange={(e)=>{setEmail(e.target.value)}}
                />
              </div>
            </form>
            <div className="user-dashboard-img-edit">
                <button onClick={()=>{handleInputClick()}}><i className="fi fi-sr-cloud-upload-alt"></i> Upload Profile Picture</button>
                <input type="file" accept="image/*" id="getFileDash" onChange={(e)=>{convertImage(e.target.files[0])}}/> 
            </div>
            <div style={{ display: "flex", gap:"10px" }}>
              <div className="edit-dash-button">
                <button onClick={()=>{handleEdit()}}><b>Edit</b></button>
              </div>
              <Link to='/changeUserPassword' className='Link-Universal'>
              <div className="changepass-dash-button">
                <b>Change Password</b>
              </div>
              </Link>

              <div className="delete-dash-button">
                <button onClick={()=>{handleDelete()}}><b>Delete</b></button>
              </div>
            </div>
            
          </div>
        </div>
      </div>
      : "LOADING"
      }
      </div>
    </>
  );
}
