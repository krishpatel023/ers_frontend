import Header from "../../components/header";
import Footer from "../../components/footer";
import './about.css'
function About(){
    return(
        <div className="about-us-wrapper">
            <div className="about-us-header">
                <Header/>
            </div>
            <div className="about-us-main">
                <h1>ABOUT US</h1>
            </div>
            <div className="about-us-footer">
                <Footer/>
            </div>
        </div>
    )
}
export default About