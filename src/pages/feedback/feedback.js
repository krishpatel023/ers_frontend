import Header from '../../components/header'
import './feedback.css'
import { useState,useEffect } from "react"
import { useNavigate,Link, useParams} from "react-router-dom"
import axios from 'axios'
import { config, backendURL } from '../../utils'
function Feedback(){
    const { id } = useParams();
    const [Feedback,setFeedback]=useState()
    const [Rating, setRating]=useState()
    const [Token,setToken]=useState()
    const [created, setCreated] = useState(false)
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
    axios.get(`${backendURL}/api/auth/validate`,config)
        .then( function(response){
            if(response.data.access_token){
                setToken(response.data.access_token)
            }
            else{
                redirectLogin({error:true})
            }
        })
        .catch(function(error){
            console.log(error)
            redirectLogin(error.response.data)
        })
    },[])
    const handleConversion1 = async ()=>{
        const ca = Token;
        const base64Url =await ca.split('.')[1];
        const decodedValue = JSON.parse(window.atob(base64Url));
        return decodedValue.id
    }
    const handleSubmit1 = async ()=>{
        const myID = await handleConversion1();
        try{
            axios.post(`${backendURL}/api/feedbacks/createFeedback`,{
                feedback: Feedback,
                rating: Rating,
                feedbackOf: id,
                feedbackBy: myID,
                isPublished: false
            },config)
             .then(function(response){
                setCreated(true)
             })
             .catch(function(error){
                console.log(error)
             })
        }catch(error){
            console.log(error)
        }
    }
    const handleReturn = ()=>{
        navigate(-1)
    }
    return(
        <div className="feedback-wrapper">
            <div className="feedback-header">
                <Header/>
            </div>
            {
                created?
                <div className="feedback-created-wrapper">
                    <div className="feedback-created-box">
                        <h1>FEEDBACK REGISTERED SUCCESSFULLY</h1>
                        <h5>CLICK THE BELOW BUTTON TO GO BACK</h5>
                        <button onClick={handleReturn}>BACK</button>
                    </div>
                </div>
                :
                <div className="feedback-main">
                    <div className="feedback-wrapper-box">
                        <div className="feedback-box-markings">
                            <div className="feedback-box-number"><h3>0</h3></div>
                            <div className="feedback-box-number"><h3>1</h3></div>
                            <div className="feedback-box-number"><h3>2</h3></div>
                            <div className="feedback-box-number"><h3>3</h3></div>
                            <div className="feedback-box-number"><h3>4</h3></div>
                            <div className="feedback-box-number"><h3>5</h3></div>
                        </div>
                        <div className="feedback-box-slider">
                            <input type="range" defaultValue="2" onChange={(e)=>setRating(e.target.value)} max="5" min="0"/>
                        </div>
                        <div className="feedback-box-information">
                            <div className="feedback-box-info-1"><h4>POOR</h4></div>
                            <div className="feedback-box-info-2"><h4>BEST</h4></div>
                        </div>
                        <div className="feedback-box-feedback">
                            <textarea placeholder='Describe your experience' onChange={(e)=>setFeedback(e.target.value)}></textarea>
                        </div>
                        <div className="feedback-box-submit">
                            <button onClick={handleSubmit1}>SUBMIT</button>
                        </div>
                    </div>
                </div>
            }
        </div>
    )
}
export default Feedback