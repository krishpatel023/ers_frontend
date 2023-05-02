import React from "react";
import imgnews from "../assets/hospital.jpg";
import "./styles/NewsComp.css";

export default function NewsComp() {
  return (
    <>
      <div className="news-comp-main">
        <div className="news-card-home">
          <div className="news-card-img">
            <img src={imgnews} alt="#" />
          </div>
          <div className="news-card-headline">
            <b>
              This is a top news headline that you must read before you skip to
              the next{" "}
            </b>
          </div>
          <div className="news-card-textarea">
            <p>
              this a news that actually people reads the most of the time you
              should also read it this a news that actually people reads the
              most of the time you should also read it this a news that actually
              people reads the most of the time you should also...
            </p>
          </div>
          <div className="news-card-readmore">
            <b>Read More</b>
          </div>
        </div>
      </div>
    </>
  );
}
