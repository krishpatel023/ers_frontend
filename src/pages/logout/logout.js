import './logout.css'
import Header from '../../components/header'
import {useEffect, useState} from "react"
import axios from 'axios'
import {useNavigate} from 'react-router-dom'
import { config , backendURL } from '../../utils'
import { useCookies } from 'react-cookie'
function Logout(){
    const [isLoggedOut,setLogout] = useState(false)
    const [cookies, setCookie, removeCookie] = useCookies(['user']);

    //===============REDIRECTION==============================
    const navigate = useNavigate()
    //==========================================================
    useEffect(()=>{
        try{
            axios.get(`${backendURL}/api/auth/logout`,config)
            setLogout(true)
            removeCookie("access_token")
        }
        catch(error){
            console.log(error)
        }
        // axios.get(`${backendURL}/api/auth/logout`,config)
        //     .then(function(response){
        //         setLogout(response.data)
        //         removeCookie("access_token")
        //     })
        //     .catch(function(error){
        //         console.log(error)
        //     })
    },[]) 

    const handleClick = ()=>{
        navigate('/');
    }
    return(
        <div className="logout-wrapper">
            <div className="logout-header">
                <Header/>
            </div>
            <div className="logout-popup-wrapper">
            {
                isLoggedOut?
                <div className="logout-popup">
                    <h2>You are now logged out !</h2>
                    <h5>Continue to Homepage</h5>
                    <button onClick={handleClick}>Return</button>
                </div>
                : null
            }
            </div>
        </div>
    )
}
export default Logout