import React from "react";
import imgstar from "../assets/favorite.png";
import imgprofile from "../assets/hospital.jpg";
import "./styles/FeedbackHome.css";

export default function FeedbackHome() {
  return (
    <div className="feedback-home-main">
      <div className="section">
        <div className="stars">
          <h4>4</h4>
          <img src={imgstar} alt="#" />
        </div>
        <div className="user-feedback-text-home">
          <p>
            Recusandae reiciendis deserunt tenetur nihil velit quaerat possimus.
            Et quas reiciendis impedit fugit perspiciatis, maxime accusantium
            vel praesentium alias facilis at officiis.Lorem ipsum dolor sit amet
            consectetur adipisicing elit. Recusandae reiciendis deserunt tenetur
          </p>
        </div>
        <div className="written">
          <div className="user-name-feedback-home">
            <h3>Krish Patel</h3>
          </div>
          <div className="written-img">
            <img src={imgprofile} alt="#" />
          </div>
        </div>
      </div>
    </div>
  );
}
