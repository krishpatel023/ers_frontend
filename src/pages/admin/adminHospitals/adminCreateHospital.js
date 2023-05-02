import './adminCreateHospital.css'
import AdminNavbar from '../../../components/adminNavbar'
import {useState,useEffect} from "react"
import axios from 'axios'
import {useNavigate} from 'react-router-dom'
import { backendURL, config } from '../../../utils'

function AdminCreateHospital(){
    const [display, setDisplay] = useState(false)
    const [Name,setName]=useState()
    const [Phone,setPhone]=useState()
    const [Email,setEmail]=useState()
    const [Password,setPassword]=useState()
    const [Address,setAddress]=useState()
    const [City,setCity]=useState()
    const [State,setState]=useState()
    const [Beds, setBeds ]=useState()
    const [StateData,setStateData]=useState()
    const [DistrictData, setDistrictData ]=useState()
    const [imgData, setImgData]=useState()
    const [message, setMessage] = useState()

    const [ isCreated , setIsCreated ] = useState(false)

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
        axios.get(`${backendURL}/api/statesData/getStates`,config)
          .then( function(response){
              setStateData(response.data.data)
          })
          .catch(function(error){
              console.log(error)
          })
        axios.get(`${backendURL}/api/statesData/getDistricts/${State}`,config)
          .then( function(response){
              setDistrictData(response.data.data)
          })
          .catch(function(error){
              console.log(error)
          })
      },[State])
    const handleCreate = ()=>{
        axios.post(`${backendURL}/api/hospitals/createHospital`,{
            name : Name,
            city : City,
            state : State,
            phone: Phone,
            email: Email,
            password: Password,
            ratings : 0,
            img: imgData,
            address: Address,
            materials: [
                {   
                    name : "Beds",
                    total : Beds,
                    available : Beds
                }
            ]
        },config)
            .then(function(response){
                setMessage(response.data)
                setIsCreated(true)
            })
            .catch(function(error){
                redirectLogin(error.response.data)
                console.log(error)
            })
    }
    const handleReturn = ()=>{
        navigate(-1)
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
        
    return(
        <div className="admin-create-hospitals-panel-wrapper">
            <div className="admin-hospitals-panel-navbar">
                <AdminNavbar />
            </div>
            {
                !isCreated ?
                <div className="admin-hospitals-panel-detail">
                <div className="admin-hospitals-panel-detail-wrapper">
                    <div className="create-hospital-input-details-1">
                        <input type="text" name="fName" placeholder="Name" onChange={(e)=>{setName(e.target.value)}}/>
                        <input type="phone" name="phone" placeholder="Phone" onChange={(e)=>{setPhone(e.target.value)}}/>
                        <input type="text" name="address" placeholder="Address" onChange={(e)=>{setAddress(e.target.value)}}/>
                        <input type="email" name="emailId" placeholder="E-mail" onChange={(e)=>{setEmail(e.target.value)}}/>
                        <input type="password" name="password" placeholder="Password"  onChange={(e)=>{setPassword(e.target.value)}}/>
                        <input type="number" name="beds" id="beds" placeholder="Beds" onChange={(e)=>{setBeds(e.target.value)}}/>
                    </div>
                    <div className="create-hospital-input-details-2">
                        <div>
                        <label htmlFor="state">Choose a State</label>
                        <select name="state" id="state" onChange={(e)=>{setState(e.target.value)}}>
                            {
                                StateData?
                                StateData.map((data,i)=>
                                    <option key={i} value={data}>{data}</option>
                                ): null

                            }
                        </select>
                        </div>
                        <div>
                        <label htmlFor="district">Choose a District</label>
                        <select name="district" id="district" onChange={(e)=>{setCity(e.target.value);console.log(e.target.value)}}>
                        {
                                DistrictData?
                                DistrictData.map((data,i)=>
                                    <option key={i} value={data}>{data}</option>
                                ): null

                            }
                        </select>
                        </div>
                    </div>
                    <div className="create-hospital-input-details-3">
                        <input type="file"accept="image/*" onChange={(e)=>{convertImage(e.target.files[0])}}/>
                    </div>
                    <div className="create-hospital-message-display">
                        {message ? <span>{message}</span> : null}
                    </div>
                    <div className="create-hospital-input-details-4">
                        <button onClick={()=>{handleCreate()}}>CREATE HOSPITAL</button>
                    </div>
                </div>
            </div>
            : null
            }
            {
                isCreated ? 
                <div className="admin-created-wrapper">
                    <div className="admin-create-popup">
                        <h1>HOSPITAL CREATED SUCCESSFULLY</h1>
                        <button onClick={()=>{handleReturn()}}>RETURN</button>
                    </div>
                </div>
                : null
            }
        </div>
    )
}
export default AdminCreateHospital