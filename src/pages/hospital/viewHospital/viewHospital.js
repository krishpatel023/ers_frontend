import './viewHospital.css'
import Footer from '../../../components/footer'
import Header from '../../../components/header'

import star from '../../../assets/favorite.png'
import img2 from "../../../assets/placeholder.png";
import img6 from "../../../assets/contact-us.png";
import Review from '../../../components/Review';
import {useEffect, useState} from "react"
import axios from 'axios'
import {Link, useNavigate,useParams} from 'react-router-dom'
import { config, backendURL } from '../../../utils';
import { useCookies } from 'react-cookie'


function ViewHospital(){
    const [dataBase,setDatabase] = useState()
    const [feedbackDB,setFeedbackDB] = useState()
    const { id } = useParams();
    const [cookies, setCookie, removeCookie] = useCookies(['user']);
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
                if(!cookies.access_token){
                    navigate('/login')
                }
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
      <div className="view-hospital-wrapper">
        <Header />
        {dataBase ? (
          <div className="view-hospital-main">
            <div className="view-hospital-box">
              <div className="view-hospital-back">
                <button onClick={navigate(-1)}>
                  <h1>
                    <i className="fi fi-rr-arrow-left"></i>
                  </h1>
                </button>
              </div>
              <div className="view-hospital-img-box">
                <img src={dataBase.img} alt="" />
              </div>
              <div className="view-hospital-details">
                <div className="view-hospital-details-box">
                  <h1>{dataBase.name}</h1>
                  <h2>
                    {dataBase.city}, {dataBase.state}
                  </h2>
                  <h3>
                    <img src={img2} alt="" style={{ width: "15px" }} />{" "}
                    {dataBase.address}
                  </h3>
                  <a href="#">
                    <i className="fi fi-ss-map-marker"></i> View on Map
                  </a>
                  <h3>
                    <i className="fi fi-sr-procedures"></i> Available Beds :{" "}
                    {dataBase.available}
                  </h3>
                  <h3>
                    <i className="fi fi-ss-star"></i> Rating : 4{" "}
                    <img src={star} alt="" style={{ width: "15px" }} />
                  </h3>
                  <h3>
                    <img src={img6} alt="" style={{ width: "15px" }} /> Contact
                    : {dataBase.phone}
                  </h3>
                </div>
              </div>
              <div className="view-hospital-call-us"></div>
              <div className="view-hospital-reviews">
                <h1>REVIEWS</h1>
                {feedbackDB
                  ? feedbackDB.map((data, i) => (
                      <div className="view-hospital-reviews-box" key={i}>
                        <Review
                          key={i}
                          feedbackId={data._id}
                          userId={data.feedbackBy}
                          feedbackMessage={data.feedback}
                          rating={data.rating}
                          hospId={id}
                        />
                      </div>
                    ))
                  : "NO REVIEWS AVAILABLE"}
              </div>
              <div className="view-hospital-review-submit">
                <button onClick={navigate(`/feedback/${id}`)}>Rate Us Now!!!</button>
              </div>
            </div>
          </div>
        ) : (
          "LOADING"
        )}

        <Footer />
      </div>
    );
}
export default ViewHospital