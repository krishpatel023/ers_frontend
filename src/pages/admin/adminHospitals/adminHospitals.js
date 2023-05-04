import './adminHospitals.css'
import {Link} from "react-router-dom"
import AdminNavbar from '../../../components/adminNavbar'
import axios from 'axios'
import { useState, useEffect } from 'react'
import {useNavigate } from 'react-router-dom'
import { config, backendURL } from '../../../utils'

function AdminHospitals() {
  const [dataBase,setData]=useState()
  const [change,setChange]=useState(false)
    //===============REDIRECTION==============================
  const navigate = useNavigate()
  function redirectLogin(req,res,next){
      try{
        if(req.error){
          console.log("RUN")
          navigate('/login')
        }
      }catch(error){
        console.log(error)
      }
  }
  //==========================================================
  useEffect(()=>{
    axios.get(`${backendURL}/api/hospitals/`,config)
    .then( function(response){
      setData(response.data)
      console.log("-----")
    })
    .catch(function(error){
      redirectLogin(error.response.data)
      console.log(error)
    })
  },[change])
  return (
    <div className="admin-Hospitals-wrapper">
      <div className="admin-Hospitals-navbar">
        <AdminNavbar />
      </div>
      {
        dataBase ? 
        <div className="admin-Hospitals-details">
        <div className="admin-Hospitals-upper">
            <div className="admin-upper-1">
                <h1>Hospitals ({dataBase.length})</h1>
            </div>
            <div className="admin-upper-2">
                <input type="text" name="Hospitalname" id="" placeholder="Search" />              
            </div>
            <div className="admin-upper-3">
                <div className="admin-upper-3-btn">
                  <Link className="link Link-Universal" to="/admin/Hospital/createHospital">Add Hospital</Link>
                </div>              
            </div>
            <div className="admin-upper-4">
                <button onClick={()=>{setChange(!change)}}>Refresh</button>             
            </div>
        </div>
        <div className="admin-Hospitals-detail-wrapper">
          <table className="table-hospital-fill">
            <thead>
              <tr>

                <th className="text-hospital-center">NAME</th>
                <th className="text-hospital-center">CITY</th>
                <th className="text-hospital-center">STATE</th>
                <th className="text-hospital-center">E-MAIL ID</th>
                <th className="text-hospital-center">PHONE</th>
                <th className="text-hospital-center">RATINGS</th>
                <th className="text-hospital-center">ACTION</th>
              </tr>
            </thead>
            <tbody className="table-hospital-hover">
              {dataBase.map((data, i) =>
                <tr key={i}>

                <td className="text-hospital-center">{data.name}</td>
                <td className="text-hospital-center">{data.city}</td>
                <td className="text-hospital-center">{data.state}</td>
                <td className="text-hospital-center">{data.email}</td>
                <td className="text-hospital-center">{data.phone}</td>
                <td className="text-hospital-center">{data.ratings}</td>
                <td className="text-hospital-center-special">
                  <div className="text-hospital-center-special-btn">
                    <Link className="link Link-Universal" to={`/admin/Hospital/editHospital/${data._id}`}>EDIT</Link>
                  </div>
                  <div className="text-hospital-center-special-btn">
                    <Link className="link Link-Universal" to={`/admin/Hospital/viewHospital/${data._id}`}>VIEW</Link>
                  </div>
                </td>
              </tr>
              )}
              
            </tbody>
            
          </table>
        </div>
      </div>
      : <div className='admin-Hospital-loading'><h1>LOADING...</h1></div>
      }
    </div>
  );
}
export default AdminHospitals;