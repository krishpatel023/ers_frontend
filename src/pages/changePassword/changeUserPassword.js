import { useState,useEffect } from "react"
import { useNavigate,Link} from "react-router-dom"
import axios from 'axios'
import './changeUserPassword.css'
import { config, backendURL } from "../../utils"
import { useCookies } from "react-cookie"
function ChangeUserPassword(){
    const [id, setId]=useState()
    // const [OldPassword, setOldPassword]=useState()
    const [Password1, setPassword1]=useState()
    const [Password2, setPassword2]=useState()
    const [Message, setMessage]=useState()
    const [Token,setToken]=useState(false)
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
    const [cookies, setCookie, removeCookie] = useCookies(['user']);

    useEffect(()=>{

        try{
            const ca = cookies.access_token;
            if(ca){
              setToken(ca)
            }
            else{
              redirectLogin({error:true})
            }
          }
          catch(error){
            console.log(error)
            redirectLogin(error.response.data)
          }
    // axios.get(`${backendURL}/api/auth/validate`,config)
    //     .then( function(response){
    //         if(response.data.access_token){
    //             setToken(response.data.access_token)
    //         }
    //         else{
    //             redirectLogin({error:true})
    //         }
    //     })
    //     .catch(function(error){
    //         console.log(error)
    //         // redirectLogin(error.response.data)
    //     })
    },[])
    const handleConversion = ()=>{
        const ca = Token;
        const base64Url = ca.split('.')[1];
        const decodedValue = JSON.parse(window.atob(base64Url));
        return decodedValue.id
    }
    const handleSubmit = ()=>{
        if(Password1 === Password2){
            const myId = handleConversion()
            console.log(myId)
            axios.put(`${backendURL}/api/users/changePassword/${myId}`,{password: Password1},config)
                .then( function(response){
                navigate('/')
                })
                .catch(function(error){
                setMessage(error)
                console.log(error)
                })
        }
        else{
            setMessage("PASSWORD DOES NOT MATCH")
        }

      }
    return(
        <div className="change-user-password-wrapper">
            <div className="change-user-password-box">
                <h2>CHANGE PASSWORD</h2>
                <input type="password" placeholder="Enter New Password" onChange={(e)=>{setPassword1(e.target.value)}}/>
                <input type="password" placeholder="Re-Enter New Password"onChange={(e)=>{setPassword2(e.target.value)}}/>
                <button onClick={()=>{handleSubmit()}}>CHANGE PASSWORD</button>
                <span>{Message?Message:null}</span>
                <span>Don't want to? <Link to="/">Go Back</Link></span>
            </div>
        </div>
    )
}
export default ChangeUserPassword