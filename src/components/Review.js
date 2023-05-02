import {useEffect, useState} from "react"
import axios from 'axios'
import {useNavigate,useParams} from 'react-router-dom'
import "./styles/review.css";
import img4 from "../assets/favorite.png";
import { backendURL, config } from "../utils";
export default function Review(props) {
  const [dataBase,setDatabase] = useState()
  const [blocker, setBlocker] = useState()
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
  useEffect(()=>{
    if(props.userId){
      axios.get(`${backendURL}/api/users/${props.userId}`,config)
        .then(function(response){
            setDatabase(response.data)
            setBlocker(true)
        })
        .catch(function(error){
            redirectLogin(error.response.data)
            console.log(error)
        })
    }
  },[blocker])
  
  return (
    <div className="review-display-card">
      {
        dataBase?
        <div>
        <div className="user-style-card">
          <div style={{ display: "flex", flexDirection: "row" }}>
            <div>
              <img
                src={dataBase.img}
                style={{ height: "40px", width: "40px" }}
                alt="#"
              />
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                paddingLeft: "9px",
              }}
            >
              <b>{dataBase.firstname} {dataBase.lastname}</b>
              <div style={{ paddingTop: "3px" }}>
                <b style={{ marginTop: "-5px" }} className="review-number">
                  {props.rating}
                </b>
                <img src={img4} style={{ height: "15px", width: "15px" }} alt=""/>
              </div>
            </div>
          </div>
          <div>
            <p>{props.feedbackMessage}
            </p>
          </div>
        </div>
      </div>
      : "LOADING"
      }
      
    </div>
  );
}
