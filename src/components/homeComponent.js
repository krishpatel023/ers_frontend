import "./styles/homeComponent.css";
import {Link} from 'react-router-dom'
import NewsComp from "./NewsComp";
import FeedbackHome from "./FeedbackHome";
import HomeQuote from './HomeQuote'
export default function homeComponent() {
  return (
    <>
      <div className="home-main">
        <HomeQuote/>
      </div>
      <div className="top-headlines-home">
        <h1>TOP HEADLINES!!</h1>
        <div className="top-heaglines-card-flex">
          <NewsComp />
          <NewsComp />
          <NewsComp />
        </div>
      </div>
      <div className="developer-quote-home">
        <div className="developer-quote-home-wrapper">
          <h1>
            Our best effort is to design a platform that not only provides resources, but also connects and uplifts communities in their darkest hour.
          </h1>
        </div>
      </div>
      <div className="reviews-display-home">
        <FeedbackHome />
        <FeedbackHome />
        <FeedbackHome />
      </div>
      <div className="rate-us-home">
        <h1>
          As developers, we must constantly review and refine our work to ensure that it stays relevant and useful to those who rely on it.
        </h1>
        <Link to='/feedback/ers' className="rate-us-button-home-link Link-Universal">
          <div className="rate-us-button-home">
            <b>Rate Us</b>
          </div>
        </Link>

      </div>
    </>
  );
}
