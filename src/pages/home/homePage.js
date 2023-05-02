import { useState } from "react"
import Header from "../../components/header"
import Footer from "../../components/footer"
import ImageSlider from "../../components/ImageSlider"
import './homePage.css'
import HomeComponent from "../../components/homeComponent"
import { useEffect } from "react"
function HomePage(){
    const[width,setWidth]=useState(window.innerWidth)
    const containerStyles = {
    width: "100vw",
    height: "90vh",
    margin: "0 auto",
    };
    useEffect(()=>{
        setWidth(window.innerWidth)
    },[width])
    return(
        <div className="home-wrapper">
            <Header/>
            <div style={{ width: "100vw" }}>
                <div style={containerStyles}>
                <ImageSlider  parentWidth={width} />
                </div>
            </div>
            <HomeComponent/>
            <Footer/>
        </div>
    )
}
export default HomePage