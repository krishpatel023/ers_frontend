// import './viewHospital.css'
import Header from '../../../components/header'
import {useEffect, useState} from "react"
import axios from 'axios'
import {Link, useNavigate,useParams} from 'react-router-dom'

import React from "react";
import "./viewHospital.css";
import img2 from "../../../assets/placeholder.png";
import img3 from "../../../assets/architecture-and-city.png";
import img5 from "../../../assets/hospital-bed.png";
import img6 from "../../../assets/contact-us.png";
import Review from "../../../components/Review";
import { config, backendURL } from '../../../utils';
export default function HospitalCard() {
    const [message, setMessage] = useState()
    const [dataBase,setDatabase] = useState()
    const [feedbackDB,setFeedbackDB] = useState()
    const { id } = useParams();

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
        axios.get(`${backendURL}/api/hospitals/${id}`,config)
            .then(function(response){
                setDatabase(response.data)
            })
            .catch(function(error){
                redirectLogin(error.response.data)
                console.log(error)
            })
        axios.get(`${backendURL}/api/feedbacks/feedbackOf/${id}`,config)
            .then(function(response){
                setFeedbackDB(response.data)
            })
            .catch(function(error){
                redirectLogin(error.response.data)
                console.log(error)
            })
    },[])

    const handleClick = ()=>{
        navigate(-1);
    }
  return (
    <>
        <div className="view-hospital-wrapper">

        
        <Header/>
        {
            dataBase?
            <div
                style={{
                paddingTop: "40px",
                paddingBottom: "40px",
                display: "flex",
                justifyContent: "center",
                }}
            >
                <div className="Hos-Main">
                <div className="HospitalCard">
                    <img
                    src={dataBase.img}
                    alt="#"
                    style={{ height: "400px", width: "700px" }}
                    />
                </div>
                <div>
                    <h1 className="hosname-card" style={{ paddingLeft: "20px" }}>
                    {dataBase.name}
                    </h1>
                    <div style={{ paddingLeft: "20px", paddingTop: "30px"}}>
                    <div style={{ display: "flex", fontSize: "20px" }}>
                        <img src={img2} alt="#" className="logo-style" />
                        <b className="address-card">
                        {dataBase.address}
                        </b>
                    </div>
                    <div style={{ display: "flex" }}>
                        <div
                        style={{
                            display: "flex",
                            marginTop: "10px",
                            fontSize: "20px",
                            paddingLeft: "2px",
                        }}
                        >
                        <img src={img3} alt="#" className="logo-style" />
                        <b className="city-card">{dataBase.city}, {dataBase.state}</b>
                        </div>
                    </div>
                    <div style={{ display: "flex", marginTop: "30px" }}>
                        <div
                        style={{
                            display: "flex",
                            marginTop: "10px",
                            fontSize: "20px",
                            paddingLeft: "2px",
                        }}
                        >
                        <img src={img5} alt="#" className="logo-style" />
                        <b style={{ paddingRight: "5px" }}> Total Beds : </b>
                        <b className="totalbeds-card">{dataBase.available}</b>
                        </div>
                        <div
                        style={{
                            display: "flex",
                            marginTop: "10px",
                            fontSize: "20px",
                            paddingLeft: "90px",
                        }}
                        >
                        <img src={img5} alt="#" className="logo-style" />
                        <b style={{ paddingRight: "5px" }}>Available : </b>
                        <b className="available-card">300</b>
                        </div>
                    </div>

                    <div
                        style={{
                        display: "flex",
                        marginTop: "60px",
                        fontSize: "20px",
                        paddingLeft: "2px",
                        }}
                    >
                        <img src={img6} alt="#" className="logo-style" />
                        <b style={{ paddingRight: "5px" }}>Contact : </b>
                        <b className="contact-card">{dataBase.phone}</b>
                    </div>
                    </div>
                    <div
                    style={{
                        textAlign: "center",
                    }}
                    >
                    <div className="contactbut">
                        <a href="tel:987654321">Call Us!</a>
                    </div>
                    </div>

                    <div className="review-display-area">
                    <h2 style={{ textAlign: "center" }}>Reviews</h2>
                    {
                        feedbackDB?
                        feedbackDB.map((data,i)=>
                        <Review
                            key={i}
                            userId={data.feedbackBy}
                            feedbackMessage={data.feedback}
                            rating={data.rating}
                            // profileImg={profileImg}
                        />                        
                        )
                        : "NO REVIEWS AVAILABLE"                       
                    }
                    </div>
                    <div style={{ textAlign: "center", display:"flex", flexDirection:"column", justifyContent:"center", alignItems:"center"}}>
                        <div className="adjustment-btn rate-us-card1">
                            <Link to={`/feedback/${id}`} style={{color:"white "}} className='Link-Universal'>Rate Us Now!!</Link>
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
