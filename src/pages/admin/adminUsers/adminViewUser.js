import './adminViewUser.css'
import AdminNavbar from '../../../components/adminNavbar'
import {useState,useEffect} from "react"
import axios from 'axios'
import {useParams,useNavigate, Link} from 'react-router-dom'
import { config, backendURL } from '../../../utils'
function AdminViewUser(){
    const [display, setDisplay] = useState(false)
    const { id } = useParams();
    const [message, setMessage] = useState()

    // console.log(id)
    const [dataBase,setData]=useState()
    const [feedbacks,setFeedbacks]=useState()

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
      axios.get(`${backendURL}/api/users/${id}`,config)
        .then( function(response){
            setData(response.data)
        })
        .catch(function(error){
            console.log(error)
            redirectLogin(error.response.data)
        })

        axios.get(`${backendURL}/api/feedbacks/feedbackBy/${id}`,config)
        .then( function(response){
            setFeedbacks(response.data)
        })
        .catch(function(error){
            console.log(error)
            redirectLogin(error.response.data)
        })
    },[change])

    return(
        <div className="admin-view-users-panel-wrapper">
            <div className="admin-view-users-panel-navbar">
                <AdminNavbar />
            </div>
            {
                dataBase ? 
                <div className="admin-view-user-wrapper">
                    <div className="view-user-box">
                        <div className="view-detail-img">
                            <img src={dataBase.img} alt="Profile" />
                        </div>
                        <div className="admin-view-detail-section-wrapper">
                            <div className="admin-view-user-detail-section-1">
                                <div className="view-detail-box"><span>   ID      :</span></div>
                                <div className="view-detail-box"><span>First Name :</span></div>
                                <div className="view-detail-box"><span>Last Name  :</span></div>
                                <div className="view-detail-box"><span>Email      :</span></div>
                                <div className="view-detail-box"><span>Role       :</span></div>
                            </div>
                            <div className="admin-view-user-detail-section-2">
                                <div className="view-detail-box"><span>{dataBase._id}</span></div>
                                <div className="view-detail-box"><span>{dataBase.firstname}</span></div>
                                <div className="view-detail-box"><span>{dataBase.lastname}</span></div>
                                <div className="view-detail-box"><span>{dataBase.email}</span></div>
                                <div className="view-detail-box"><span>{dataBase.isAdmin ? "Admin" : "User"}</span></div>
                            </div>
                        </div>
                        <div className="admin-view-user-feedbacks">
                        <h5>FEEDBACKS BY USER</h5>
                            <div className="admin-view-user-feedbacks-wrapper">
                                {
                                    feedbacks ?
                                    feedbacks.map((data,i)=>
                                        <div className="feedback-box" key={i}>
                                            <span>{data.feedback}</span>
                                            <span>FOR : 
                                                <Link to="#">{data.feedbackOf}</Link>
                                            </span>
                                        </div>
                                    )
                                    : "NO FEEDBACKS PUBLISHED"
                                }
                            </div>
                        </div>
                        <div className="admin-view-user-btn">
                            <div className='admin-view-btn'>
                                <Link className='admin-view-user-link' to={`/admin/User/editUser/${id}`}>EDIT</Link>
                            </div>
                        </div>
                    </div>
                </div>
            : 
                <div className='admin-edit-user-loading'>
                    <h1>LOADING...</h1>
                </div>
            }
        </div>
    )
}
export default AdminViewUser