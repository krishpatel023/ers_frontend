import React from "react";
import "./styles/HomeQuote.css";
import imgquote1 from "../assets/home-quote-1.jpg";
import imgquote2 from "../assets/home-quote-2.jpg";
import { Link } from "react-router-dom";

export default function HomeQuote() {
  return (
    <div className="homequote-animation-home">
      <div className="quote-1-animation-flex">
        <div className="quote1-animation">
          <div>
            <h1 style={{ textAlign: "center", paddingTop: "3rem" }}>
              Preparing today, for <br />a safer tomorrow. <br />
              ERS starts with <br />
              awareness and action.
            </h1>
          </div>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <Link to="/listHospital">
            <div className="emergency-button-ani-home">
              <b style={{ textAlign: "center", lineHeight: "2.8rem" }}>
                Emergency
              </b>
            </div>
            </Link>

          </div>
        </div>
        <div>
          <img src={imgquote1} alt="#" className="quote1-img-style" />
        </div>
      </div>
      <div className="quote-2-animation-flex">
        <div className="quote2-animation">
          <div>
            <h1 style={{ textAlign: "center", paddingTop: "3rem" }}>
              In the aftermath of a<br /> natural disaster, <br />
              we stand together to
              <br />
              rebuild what was lost.
            </h1>
          </div>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <Link to="/resources">
            <div className="resources-button-ani-home">
              <b style={{ textAlign: "center", lineHeight: "2.8rem" }}>
                Resources
              </b>
            </div>
            </Link>

          </div>
        </div>
        <div>
          <img src={imgquote2} alt="#" className="quote2-img-style" />
        </div>
      </div>
    </div>
  );
}
