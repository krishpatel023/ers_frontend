import './styles/adminNavbar.css'
import {Link} from "react-router-dom"
import Logo from '.././assets/logo.png'

function adminNavbar(){
    return(
        <div className="admin-navbar">
            <div className="admin-navbar-logo">
                <Link to="/" className='admin-link-adjust'>
                    <img src={Logo} alt="" />
                    <h5>EMERGENCY RESPONSE SYSTEM</h5>
                </Link> 
            </div>
            <div className="admin-navbar-wrapper">
                <div className="admin-navbar-box">
                    <div className="navbar-buttons"><Link to="/admin/dashboard"><i className="fi fi-sr-bars-progress"></i>  DASHBOARD</Link></div>
                    <div className="navbar-buttons"><Link to="/admin/users"><i className="fi fi-sr-users"></i> USERS</Link></div>
                    <div className="navbar-buttons"><Link to="/admin/hospitals"><i className="fi fi-ss-hospital"></i> HOSPITALS</Link></div>
                    <div className="navbar-buttons"><Link to="/admin/feedback"><i className="fi fi-rr-messages"></i> FEEDBACK</Link></div>
                    <div className="navbar-buttons"><Link to="/changeUserPassword"><i className="fi fi-sr-key"></i> CHANGE PASSWORD</Link></div>
                    <div className="navbar-buttons"><Link to="/logout"><i className="fi fi-ss-sign-out-alt"></i> LOGOUT</Link></div>
                </div>
            </div>
        </div>
        
    )
}
export default adminNavbar