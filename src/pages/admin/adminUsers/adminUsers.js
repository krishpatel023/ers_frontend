import './adminUsers.css'
import {Link} from "react-router-dom"
import AdminNavbar from '../../../components/adminNavbar'
import axios from 'axios'
import { useState, useEffect } from 'react'
import {useNavigate } from 'react-router-dom'
import { config, backendURL } from '../../../utils'
function AdminUsers() {
  const [dataBase,setData]=useState()
  const [change,setChange]=useState(false)
  //===============REDIRECTION==============================
  const navigate = useNavigate()
  function redirectLogin(req,res,next){
      try{
        if(req.error){
          navigate('/login')
        }
      }catch(error){
        console.log(error)
      }
  }
  //==========================================================
  useEffect(()=>{
    axios.get(`${backendURL}/api/users/`,config)
      .then( function(response){
        
        setData(response.data)
      })
      .catch(function(error){
        console.log(error.response.data)
        redirectLogin(error.response.data)
      })
  },[change])
  return (
    <div className="admin-users-wrapper">
      <div className="admin-users-navbar">
        <AdminNavbar />
      </div>
      {
        dataBase ? 
        <div className="admin-users-details">
        <div className="admin-users-upper">
            <div className="admin-upper-1">
                <h1>USERS ({dataBase.length})</h1>
            </div>
            <div className="admin-upper-2">
                <input type="text" name="Username" id="" placeholder="Search" />              
            </div>
            <div className="admin-upper-3">
                <div className="admin-upper-3-btn">
                  <Link className="link Link-Universal" to="/admin/User/createUser">Add User</Link>
                </div>              
            </div>
            <div className="admin-upper-4">
                <button onClick={()=>{setChange(!change)}}>Refresh</button>             
            </div>
        </div>
        <div className="admin-users-detail-wrapper">
          <table className="table-fill">
            <thead>
              <tr>
                <th className="text-center">PROFILE</th>
                <th className="text-center">FIRST NAME</th>
                <th className="text-center">LAST NAME</th>
                <th className="text-center">E-MAIL ID</th>
                <th className="text-center">ROLE</th>
                <th className="text-center-special">ACTION</th>
              </tr>
            </thead>
            <tbody className="table-hover">
              {dataBase.map((data, i) =>
                <tr key={i}>
                <td className="text-center data-id"><img src={data.img} alt="" /></td>
                <td className="text-center">{data.firstname}</td>
                <td className="text-center">{data.lastname}</td>
                <td className="text-center">{data.email}</td>
                <td className="text-center">{data.isAdmin ? "ADMIN" : "USER"}</td>
                <td className="text-center-special">
                  <div className="text-center-special-btn">
                    <Link className="link Link-Universal" to={`/admin/User/editUser/${data._id}`}>EDIT</Link>
                  </div>
                  <div className="text-center-special-btn">
                    <Link className="link Link-Universal" to={`/admin/User/viewUser/${data._id}`}>VIEW</Link>
                  </div>
                </td>
              </tr>
              )}
              
            </tbody>
            
          </table>
        </div>
      </div>
      : <div className='admin-user-loading'><h1>LOADING...</h1></div>
      }
    </div>
  );
}
export default AdminUsers;