import Logo from '../assets/logo.png'
import './styles/footer.css'
import { Link } from 'react-router-dom'
function Footer(){
    return(
        <div className="footer-wrapper">
            <div className="footer-section-1">
                <div className="footer-section-1-logo">
                    <img src={Logo} alt="" />
                </div>
                <div className="footer-section-1-heading">
                    <h2>EMERGENCY RESPONSE SYSTEM</h2>
                </div>
            </div>
            <div className="footer-section-2">
                 <h2>Important Links</h2>
                 <Link to='/' className='footer-section-2-links Link-Universal'>Home</Link>
                 <Link to='/dataPage' className='footer-section-2-links Link-Universal'>Data</Link>
                 <Link to='/newspage' className='footer-section-2-links Link-Universal'>News</Link>
                 <Link to='/listHospital' className='footer-section-2-links Link-Universal'>Hospitals</Link>
                 <Link to='/resources' className='footer-section-2-links Link-Universal'>Resources</Link>
                 <Link to='/about' className='footer-section-2-links Link-Universal'>About</Link>
            </div>
            <div className="footer-section-3">
                <div className="footer-section-3-feedback">
                    <h3>Please Leave your Feedbacks</h3>
                    <Link to='/feedback/ers' className='footer-section-3-Link Link-Universal'>
                    <div className="footer-section-3-feedback-btn">
                        <h3>FEEDBACK</h3>
                    </div>
                    </Link>

                </div>
                <div className="footer-section-3-social-media">
                        <div className="footer-section-3-social-media-btn">
                            <i className="fi fi-brands-instagram"></i>
                        </div>
                        <div className="footer-section-3-social-media-btn">
                            <i className="fi fi-brands-twitter"></i>
                        </div>
                        <div className="footer-section-3-social-media-btn">
                            <i className="fi fi-brands-facebook"></i>
                        </div>
                        <div className="footer-section-3-social-media-btn">
                            <i className="fi fi-br-envelope"></i>
                        </div>
                        <div className="footer-section-3-social-media-btn">
                            <i className="fi fi-rr-phone-call"></i>
                        </div>
                    </div>
            </div>
        </div>
    )
}
export default Footer