import './adminEditUser.css'
import AdminNavbar from '../../../components/adminNavbar'
import {useState,useEffect} from "react"
import axios from 'axios'
import {useParams,useNavigate} from 'react-router-dom'
import { config, backendURL } from '../../../utils'
function AdminEditUser(){
    const [display, setDisplay] = useState(false)
    const { id } = useParams();
    const [Firstname,setFirstName]=useState()
    const [Lastname,setLastName]=useState()
    const [Email,setEmail]=useState()
    const [imgData, setImgData]=useState()
    const [IsAdmin, setIsAdmin]=useState()
    const [message, setMessage] = useState()
    const [ isDeleted, setIsDeleted] = useState(false)
    const [ isUpdated, setIsUpdated] = useState(false) 
    // console.log(id)
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
      axios.get(`${backendURL}/api/users/${id}`,config)
        .then( function(response){
            setData(response.data)
        })
        .catch(function(error){
            redirectLogin(error.response.data)
            console.log(error)
        })
    },[change])

    const handleUpdate = ()=>{
        axios.put(`${backendURL}/api/users/${id}`,{firstname : Firstname, lastname: Lastname, email: Email, isAdmin: IsAdmin , img: imgData}, config)
            .then(function(response){
                setIsUpdated(true)
            })
            .catch(function(error){
                setMessage(error)
                console.log(error)
            })
    }
    const handleDelete = ()=>{
        axios.delete(`${backendURL}/api/users/${id}`, config)
            .then(function(response){
                setIsDeleted(true)
            })
            .catch(function(error){
                setMessage(error)
                console.log(error)
            })
    }
    const convertImage = (e)=>{
        var render = new FileReader()
        render.readAsDataURL(e)
        render.onload = () => {
            // console.log(render.result.length)
            if(render.result.length < (90*1024)){
                setImgData(render.result)
            }
            else{
                setMessage("FILE SIZE TOO BIG")
            }
        }
        render.onerror = error => {
            console.log("ERROR : ",error)
        }
    }
    const handleReturn = ()=>{
        navigate(-1)
    }
    return(
        <div className="admin-edit-users-panel-wrapper">
            <div className="admin-edit-users-panel-navbar">
                <AdminNavbar />
            </div>

            
            {
                (dataBase && !isDeleted && !isUpdated) ? 
                <div className="admin-edit-users-panel-detail">
                <div className="admin-edit-users-panel-detail-wrapper">
                    <div className="edit-input-details-1">
                        <img src={dataBase.img} alt="" />
                    </div>
                    <div className="edit-input-details-2">
                        <input type="text" name="fName" defaultValue={dataBase.firstname}  onChange={(e)=>{setFirstName(e.target.value)}}/>
                        <input type="text" name="lName" defaultValue={dataBase.lastname}  onChange={(e)=>{setLastName(e.target.value)}}/>
                        <input type="email" name="emailId" defaultValue={dataBase.email}  onChange={(e)=>{setEmail(e.target.value)}}/>
                        <button onClick={()=>{setIsAdmin(!dataBase.isAdmin); setMessage("ADMIN RIGHTS CHANGED - CLICK EDIT TO SAVE")}}>{dataBase.isAdmin ? "REMOVE AS ADMIN" : "MAKE ADMIN"}</button>
                        <input type="file" accept="image/*" onChange={(e)=>{convertImage(e.target.files[0])}}/>
                    </div>
                    <div className="edit-user-message-display">
                        {message ? <span>{message}</span> : null}
                    </div>
                    <div className="edit-input-details-3">
                        <button className='edit-input-edit-btn' onClick={()=>{handleUpdate()}}>EDIT USER</button>
                        <button className='edit-input-delete-btn' onClick={()=>{handleDelete()}}>DELETE USER</button>
                    </div>
                </div>
            </div>
            : 
                <div className='admin-edit-user-loading'>
                    <h1>LOADING...</h1>
                </div>
            }
            {
                isDeleted ? 
                <div className="admin-deleted-wrapper">
                    <div className="admin-delete-popup">
                        <h1>USER DELETED SUCCESSFULLY</h1>
                        <button onClick={()=>{handleReturn()}}>RETURN</button>
                    </div>
                </div>
                : null
            }
            {
                isUpdated ? 
                <div className="admin-updated-wrapper">
                    <div className="admin-update-popup">
                        <h1>USER UPDATED SUCCESSFULLY</h1>
                        <button onClick={()=>{handleReturn()}}>RETURN</button>
                    </div>
                </div>
                : null
            }
            

        </div>
    )
}
export default AdminEditUser