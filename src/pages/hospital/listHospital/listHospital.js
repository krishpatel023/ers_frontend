import "./listHospital.css";
import {useEffect, useState} from "react"
import axios from 'axios'
import {useNavigate, Link} from 'react-router-dom'
import Header from "../../../components/header";
import { config , backendURL } from "../../../utils";

export default function Profile() {


    const [dataBase,setDatabase] = useState()

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
        axios.get(`${backendURL}/api/hospitals/`,config)
            .then(function(response){
                setDatabase(response.data)
            })
            .catch(function(error){
                redirectLogin(error.response.data)
                console.log(error)
            })
    },[]) 
    console.log(dataBase)
  return (
    <div className="list-hospital-wrapper">
    <div className="list-hospital-header">
    <Header/>
    </div>
        
        <h1>HOSPITALS NEAR YOU</h1>
        {
            dataBase?
            dataBase.map((data,i)=>
            <div className="list-hospital-main" key={i}>
                <div className="list-hospital-box">
                    <div className="cls1">
                    <img src={data.img} alt="#" />
                    </div>
                    <div className="cls2">
                    <div className="hosname">{data.name}</div>
                    <div style={{ display: "flex " }}>
                        <div className="location"> <i class="fi fi-sr-marker"></i> {data.city}, {data.state}</div>
                    </div>
                    <div className="address"><i class="fi fi-ss-map-marker"></i> {data.address}</div>
                    <div style={{ display: "flex" }}>
                        <div>
                        </div>
                        <div> <i class="fi fi-sr-procedures"></i> {data.materials[0]?.name} :</div>
                        <div className="totalbeds">{data.materials[0]?.available}</div>
                    </div>
                    <div style={{ display: "flex" }}>
                        <div><i class="fi fi-sr-phone-call"></i> Contact : </div>
                        <div className="contact">{data.phone}</div>
                    </div>
                    <Link to={`/viewHospital/${data._id}`}>
                    <div className="contactbut1">
                        <a href="tel:987654321">View Details</a>
                    </div>
                    </Link>

                    </div>
                </div>
            </div>
            )

            : "LOADING"
        }
    
    </div>
  );
}
