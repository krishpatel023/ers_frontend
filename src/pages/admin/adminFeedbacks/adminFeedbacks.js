import './adminFeedbacks.css'
import AdminNavbar from '../../../components/adminNavbar'
import { Link , useNavigate} from 'react-router-dom'
import { useState , useEffect} from 'react'
import axios from 'axios'
import { backendURL,config } from '../../../utils'
function AdminFeedbacks(){


    const [publishedDB, setPublishedDB ] =useState()
    const [notPublishedDB, setNotPublishedDB ] =useState()
    const [refresh, setRefresh] = useState(false)
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
        
        axios.get(`${backendURL}/api/feedbacks/publishedFeedback/true`,config)
            .then(function(response){
                setPublishedDB(response.data)
                setRefresh(false)
            })
            .catch(function(error){
                console.log(error)
                redirectLogin(error.response.data)
            })
        axios.get(`${backendURL}/api/feedbacks/publishedFeedback/false`,config)
            .then(function(response){
                setNotPublishedDB(response.data)
            })
            .catch(function(error){
                console.log(error)
                redirectLogin(error.response.data)
            })
    },[refresh])
    const handleChange = (id,value)=>{
        axios.put(`${backendURL}/api/feedbacks/${id}/${!value}`, {},config)
        .then(function(response){
            setRefresh(true)
        })
        .catch(function(error){
            console.log(error)
            redirectLogin(error.response.data)
        })
    }

    console.log(publishedDB)
    console.log(notPublishedDB)
    return(
        <div className="admin-feedback-wrapper">
            <div className="admin-feedback-navbar">
                <AdminNavbar />
            </div>
            <div className="admin-feedback-details">
                <h1>PUBLISHED FEEDBACKS</h1>
                <div className="published-section">
                    {   
                        publishedDB ?
                        publishedDB.map((data,i)=>
                            <div className="feedback-item" key={i}>
                                <p>{data.feedback}</p>
                                <Link to={`/admin/User/editUser/${data.feedbackBy}`}>{data.feedbackBy}</Link>
                                <button onClick={()=>{handleChange(data._id,data.isPublished)}}>UnPublish</button> 
                            </div>
                        )
                        :null
                    }
                </div>
                <h1>UNPUBLISHED FEEDBACKS</h1>
                <div className="unPublished-section">
                        {
                        notPublishedDB ?
                        notPublishedDB.map((data,i)=>
                            <div className="feedback-item" key={i}>
                                <p>{data.feedback}</p>
                                <Link to={`/admin/User/editUser/${data.feedbackBy}`}>{data.feedbackBy}</Link>
                                <button onClick={()=>{handleChange(data._id,data.isPublished)}}>Publish</button> 
                            </div>
                        )
                        :null
                    }
                </div>
            </div>
        </div>
    )
}

export default AdminFeedbacks