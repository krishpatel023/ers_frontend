import { useState } from "react"
import { useNavigate , Link} from "react-router-dom"
import axios from 'axios'
import './login.css'
import { backendURL,config } from "../../utils"
function Login(){
    const [Email, setEmail]=useState()
    const [Password, setPassword]=useState()
    const [Message, setMessage]=useState()
    const navigate = useNavigate()

    const handleSubmit = ()=>{
        axios.post(`${backendURL}/api/auth/login`,{email: Email, password: Password},config)
          .then( function(response){
            navigate('/')
          })
          .catch(function(error){
            setMessage(error.response.data.error)
          })
      }
    return(
        <div className="login-wrapper">
            <div className="login-box">
                <h2>LOGIN</h2>
                <input type="email" onChange={(e)=>{setEmail(e.target.value)}}/>
                <input type="password" onChange={(e)=>{setPassword(e.target.value)}}/>
                <button onClick={()=>{handleSubmit()}}>LOGIN</button>
                <span>{Message?Message:null}</span>
                <span>Don't have an account? <Link to="/register">Register</Link></span>
            </div>
        </div>
    )
}
export default Login