import "./dataPage.css";
import Header from "../../components/header";
import Footer from "../../components/footer";
import { useEffect, useState } from "react";
import axios from "axios";
import { backendURL, config } from "../../utils";
function DataPage() {
  const [dataBase, setDataBase] = useState();
  const [change, setChange] = useState(false);
  useEffect(() => {
    axios
      .get(`${backendURL}/api/covidData/`,config)
        .then(function (response) {
          setDataBase(response.data);
        })
        .catch(function (error) {
          console.error(error);
        });
  }, [change]);
  // console.log(dataBase[0])
  return (
    <div className="data-page-wrapper">
      <Header />

      {dataBase ? (
        <div>
          <div className="country">
            <div className="countryflex">
              <div className="conf">
                <div
                  style={{
                    textAlign: "center",
                    marginTop: "20px",
                    color: "rgb(130, 0, 0)",
                  }}
                >
                  CONFIRMED
                </div>
                <div className="confdata">{dataBase[0].confirmed}</div>
              </div>
              <div className="recovered">
                <div
                  style={{
                    textAlign: "center",
                    marginTop: "20px",
                    color: "rgb(0, 72, 0)",
                  }}
                >
                  RECOVERED
                </div>
                <div className="recoverdata">{dataBase[0].recovered}</div>
              </div>
              <div className="active1">
                <div
                  style={{
                    textAlign: "center",
                    marginTop: "20px",
                    color: "rgb(0, 0, 100)",
                  }}
                >
                  ACTIVE
                </div>
                <div className="activedata">{dataBase[0].active}</div>
              </div>
              <div className="death">
                <div
                  style={{
                    textAlign: "center",
                    marginTop: "20px",
                    color: "rgb(0, 0, 0)",
                  }}
                >
                  DEATHS
                </div>
                <div className="deathdata">{dataBase[0].deaths}</div>
              </div>
            </div>
          </div>
          <div className="search">
            <div className="abovesearch">
              <h2>EXPLORE STATEWISE DATA OF COVID-19 CASES</h2>
            </div>
            {/* <div className="search-form">
              <form action="#">
                <input type="text" placeholder="  Search.." name="search" />
                <button type="submit">&#128269;</button>
              </form>
            </div> */}
          </div>
          {dataBase[0].statewise.map((data, i) => (
            <div className="state" key={i}>
              <div className="stateflex">
                <div className="statename">{data.state}</div>
                <div className="statedata">
                  <div className="statedatacss">
                    <div>CONFIRMED</div>
                    <div className="stateconf">{data.confirmed}</div>
                  </div>
                  <div className="statedatacss">
                    <div>RECOVERED</div>
                    <div className="staterecover">{data.recovered}</div>
                  </div>
                  <div className="statedatacss">
                    <div>ACTIVE</div>
                    <div className="stateactive">{data.active}</div>
                  </div>
                  <div className="statedatacss">
                    <div>DEATH</div>
                    <div className="statedeath">{data.deaths}</div>
                  </div>
                </div>
              </div>
            </div>
          ))}
          <Footer/>
        </div>
      ) : (
        "LOADING"
      )}
    </div>
  );
}
export default DataPage;