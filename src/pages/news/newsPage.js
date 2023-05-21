import "./newsPage.css";
import Header from "../../components/header";
import Footer from "../../components/footer";
import { useState, useEffect } from "react";
import axios from "axios";
import imgFix from '../../assets/covid-fix.jpeg'
function NewsPage() {
  const [newsDB, setnewsDB] = useState();

  useEffect(() => {
    axios.get("https://newsdata.io/api/1/news?apikey=pub_20589bb6e7946018a8101cfc194d92803d065&q=covid&country=in&language=en&category=health")
        .then((response) => {
            setnewsDB(response.data.results);
        })
        .catch((error) => {
            console.log(error);
        });
  }, []);
  console.log("NEWS",newsDB);
  return (
    <div className="news-wrapper">
      <Header />
      {newsDB ? (
        <div className="news-details">
          <h1 style={{ paddingTop: "3vh", fontSize: "8vh" }}>
            ERS - Top Health News
          </h1>
          <div className="my-published-section">
            {
                newsDB ?
                newsDB.map((data, i) => 
              <div className="news-item" key={i}>
                <div>
                  <img src={data.image_url ? data.image_url : imgFix} alt="#" />
                  <div style={{ marginTop: "1rem" }}>
                    <h7>
                      <b>{data.source_id}</b>
                    </h7>
                  </div>
                  <div style={{ marginBottom: "1rem" }}>{data.pubDate}</div>
                  <h2>{data.title}</h2>
                  <p>{data.description}...</p>
                  <div style={{ display: "flex", justifyContent: "center" }}>
                    <a href={data.link} className="readmore">
                      Read More
                    </a>
                  </div>
                </div>
              </div>
            )
            :null}
          </div>
        </div>
      ) : (
        "LOADING"
      )}
      <Footer />
    </div>
  );
}

export default NewsPage;
