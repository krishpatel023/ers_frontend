import "./styles/review.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { backendURL, config } from "../utils";

import star from "../assets/favorite.png";

function Review(props) {
  const [showInput, setShowInput] = useState(false);

  const [dataBase, setDatabase] = useState();
  const [blocker, setBlocker] = useState();
  const [feedbackRes, setFeedbackRes] = useState();
  const [Feedback, setFeedback] = useState();
  const [created, setCreated] = useState(false);

  const navigate = useNavigate();
  function redirectLogin(req, res, next) {
    try {
      if (req.error) {
        navigate("/login");
      }
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    if (props.userId) {
      axios
        .get(`${backendURL}/api/users/${props.userId}`, config)
        .then(function (response) {
          setDatabase(response.data);
          setBlocker(true);
        })
        .catch(function (error) {
          redirectLogin(error.response.data);
          console.log(error);
        });
    }

    axios
      .get(
        `${backendURL}/api/feedbacks/feedbackReply/${props.feedbackId}`,
        config
      )
      .then(function (response) {
        setFeedbackRes(response.data);
      })
      .catch(function (error) {
        redirectLogin(error.response.data);
        console.log(error);
      });
  }, [blocker]);

  const replySubmit = () => {
    try {
      axios
        .post(
          `${backendURL}/api/feedbacks/feedbackReply`,
          {
            feedback: Feedback,
            feedbackBy: props.userId,
            isPublished: false,
            replyOf: props.feedbackId,
          },
          config
        )
        .then(function () {
          setCreated(true);
          // navigate(`/viewHospital/${props.hospId}`);
        })
        .catch(function (error) {
          redirectLogin(error.response.data);
          console.log(error);
        });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="review-wrapper">
      {dataBase ? (
        <div className="review-box">
          <div className="review-section-1">
            <div className="review-img-section">
              <img src={dataBase.img} alt="" />
            </div>
            <div className="review-name-section">
              <h3>
                {dataBase.firstname} {dataBase.lastname}
              </h3>
              {props.rating ? (
                <span>
                  4 <img src={star} alt="" style={{ width: "15px" }} />
                </span>
              ) : null}
            </div>
          </div>
          <div className="review-section-2">
            <div className="review-display-section">
              <h4>{props.feedbackMessage}</h4>
            </div>
          </div>
          {showInput && created===true ? null : (
            <div className="review-change-button">
              <button
                onClick={() => {
                  setShowInput(true);
                }}
              >
                Reply
              </button>
            </div>
          )}
          {showInput && !created? (
            <div className="review-reply-section">
              <input type="text" onChange={(e)=>{setFeedback(e.target.value)}}/>
              <button onClick={replySubmit}>Submit</button>
            </div>
          ) : null}
          {
            created?
            <div className="reply-created">
              <h4>Replied Successfully!</h4>
              <h6>(Refresh to view your response.)</h6>
            </div>
            :null
          }
          <div className="reply-display-section">
            {feedbackRes
              ? feedbackRes.map((data, i) => (
                  <div className="reply-display-section-box" key={i}>
                    <Review
                      key={i}
                      userId={data.feedbackBy}
                      feedbackMessage={data.feedback}
                      feedbackId={data._id}
                      hospId={props.hospId}
                    />
                  </div>
                ))
              : null}
          </div>
        </div>
      ) : null}
    </div>
  );
}
export default Review;
