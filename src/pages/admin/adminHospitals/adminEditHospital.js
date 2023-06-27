import './adminEditHospital.css'
import AdminNavbar from '../../../components/adminNavbar'
import {useState,useEffect} from "react"
import axios from 'axios'
import {useParams,useNavigate} from 'react-router-dom'
import { backendURL, config } from '../../../utils'
function AdminEditHospital(){
    const [display, setDisplay] = useState(false)
    const { id } = useParams();
    const [Name,setName]=useState()
    const [Phone,setPhone]=useState()
    const [Email,setEmail]=useState()
    const [Address,setAddress]=useState()
    const [Beds, setBeds ]=useState()
    const [message, setMessage] = useState()
    const [ isDeleted, setIsDeleted] = useState(false)
    const [ isUpdated, setIsUpdated] = useState(false) 
    // console.log(id)
    const [dataBase,setData]=useState()
    const [change,setChange]=useState(false)

    const [imgData, setImgData]=useState()

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
    useEffect(()=>{
      axios.get(`${backendURL}/api/hospitals/${id}`,config)
        .then( function(response){
            setData(response.data)
        })
        .catch(function(error){
            console.log(error)
        })
    },[change])

    const handleUpdate = ()=>{
        axios.put(`${backendURL}/api/hospitals/${id}`,{
            name : Name,
            address: Address,
            phone: Phone,
            email: Email,
            img: imgData,
            beds: Beds,
        },config)
            .then(function(response){
                setMessage(response.data)
                setIsUpdated(true)
            })
            .catch(function(error){
                console.log(error)
            })
    }
    const handleDelete = ()=>{
        axios.delete(`${backendURL}/api/hospitals/${id}`,config)
            .then(function(response){
                setMessage(response)
                setIsDeleted(true)
            })
            .catch(function(error){
                console.log(error)
            })
    }
    const handleReturn = ()=>{
        navigate(-1)
    }
    // console.log(dataBase.materials[0].beds)
    return(
        <div className="admin-edit-hospitals-panel-wrapper">
            <div className="admin-edit-hospitals-panel-navbar">
                <AdminNavbar />
            </div>

            
            {
                (dataBase && !isDeleted && !isUpdated) ? 
                <div className="admin-edit-hospitals-panel-detail">
                <div className="admin-edit-hospitals-panel-detail-wrapper">
                    <div className="edit-hospital-input-details-1">
                        {
                            (dataBase.img || imgData)?
                            <img src={ imgData ? imgData :dataBase.img} alt="" />
                            :null
                        } 
                    </div>
                    <div className="edit-hospital-input-details-2">
                        <input type="text" name="fName" defaultValue={dataBase.name} onChange={(e)=>{setName(e.target.value)}}/>
                        <input type="text" name="phone" defaultValue={dataBase.phone} onChange={(e)=>{setPhone(e.target.value)}}/>
                        <input type="email" name="emailId" defaultValue={dataBase.email} onChange={(e)=>{setEmail(e.target.value)}}/>
                        <input type="text" name="city" defaultValue={dataBase.address}  onChange={(e)=>{setAddress(e.target.value)}} />
                        {/* <input type="password" name="password" placeholder="Password" value={"ABCD"}/> */}
                    </div>
                    <div className="edit-hospital-input-details-3">
                        {
                            dataBase.beds ? <div>
                            <label htmlFor='beds' className="input-hospital-adjust">No. of Beds</label>
                            <input type="number" name="beds" id="beds" defaultValue={dataBase.beds} onChange={(e)=>{setBeds(e.target.value)}}/></div>
                            : null
                        }
                        <input type="file"accept="image/*" onChange={(e)=>{convertImage(e.target.files[0])}}/>
                    </div>
                    <div className="edit-hospital-hospital-message-display">
                        {message ? <span>{message}</span> : null}
                    </div>
                    <div className="edit-hospital-input-details-4">
                        <button className='edit-hospital-input-edit-btn' onClick={()=>{handleUpdate()}}>EDIT HOSPITAL</button>
                        <button className='edit-hospital-input-delete-btn' onClick={()=>{handleDelete()}}>DELETE HOSPITAL</button>
                    </div>
                </div>
            </div>
            : 
                <div className='admin-edit-hospital-loading'>
                    <h1>LOADING...</h1>
                </div>
            }
            {
                isDeleted ? 
                <div className="admin-deleted-wrapper">
                    <div className="admin-delete-popup">
                        <h1>HOSPITAL DELETED SUCCESSFULLY</h1>
                        <button onClick={()=>{handleReturn()}}>RETURN</button>
                    </div>
                </div>
                : null
            }
            {
                isUpdated ? 
                <div className="admin-updated-wrapper">
                    <div className="admin-update-popup">
                        <h1>HOSPITAL UPDATED SUCCESSFULLY</h1>
                        <button onClick={()=>{handleReturn()}}>RETURN</button>
                    </div>
                </div>
                : null
            }
            

        </div>
    )
}
export default AdminEditHospital