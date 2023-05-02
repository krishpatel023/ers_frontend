import React from "react";
import "./Resources.css";
import imgres1 from "../../assets/resource-img-1.jpg";
import imgres2 from "../../assets/resource-img-2.jpg";
import imgres3 from "../../assets/resource-img-3.jpg";
import imgres4 from "../../assets/resource-img-4.jpg";
import Header from "../../components/header";
import Footer from "../../components/footer";

export default function Resources() {
  return (
    <div className="resources-wrapper">
      <div className="header-resources">
        <Header/>
      </div>
      <div className="main-resources">
      <div className="resources-comp-main">
      <div className="individual-comp-back">
        <div className="resources-comp-flex">
          <div className="resources-img-width">
            <img src={imgres1} alt="#" className="resources-img" />
          </div>
          <div className="resources-article-width">
            <div className="resources-article-flex">
              <div>
                <h3
                  style={{
                    borderBottom: "1px solid black",
                    width: "fit-content",
                  }}
                >
                  Health
                </h3>
              </div>
              <div>
                <h1>
                  Operational Update: 11 Million Doses of Medication Distributed
                  Over Past Week
                </h1>
              </div>
              <div>
                <b>
                  Over the past seven days, Direct Relief has delivered 369
                  shipments of requested medical aid to 45 U.S. states and
                  territories and 13 countries worldwide. The shipments
                  contained 11 million defined daily doses of medication,
                  including surgical supplies, personal care products, and more.
                </b>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="individual-comp-back">
        <div className="resources-comp-flex">
          <div className="resources-img-width">
            <img src={imgres2} alt="#" className="resources-img" />
          </div>
          <div className="resources-article-width">
            <div className="resources-article-flex">
              <div>
                <h3
                  style={{
                    borderBottom: "1px solid black",
                    width: "fit-content",
                  }}
                >
                  Flooding
                </h3>
              </div>
              <div>
                <h1>
                  Health Centers Become First Responders During California's
                  Pajaro and Watsonville Flood
                </h1>
              </div>
              <div>
                <b>
                  For the fourth time in 30 years, levees failed migrant farm
                  communities in Monterrey and Santa Cruz, California. Local
                  health centers have acted as first responders during floods.
                  SCCH was forced to temporarily close clinics due to flooding,
                  high winds and intermittent power. Patients who needed to see
                  providers were moved to a telehealth system.
                </b>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="individual-comp-back">
        <div className="resources-comp-flex">
          <div className="resources-img-width">
            <img src={imgres3} alt="#" className="resources-img" />
          </div>
          <div className="resources-article-width">
            <div className="resources-article-flex">
              <div>
                <h3
                  style={{
                    borderBottom: "1px solid black",
                    width: "fit-content",
                  }}
                >
                  Health
                </h3>
              </div>
              <div>
                <h1>
                  Operational Update: Supporting Health Workers in Turkey, First
                  Responders in Ukraine
                </h1>
              </div>
              <div>
                <b>
                  Over the past seven days, Direct Relief has delivered 364
                  shipments of requested medical aid to 41 U.S. states and
                  territories and 11 countries worldwide.
                </b>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="individual-comp-back">
        <div className="resources-comp-flex">
          <div className="resources-img-width">
            <img src={imgres4} alt="#" className="resources-img" />
          </div>
          <div className="resources-article-width">
            <div className="resources-article-flex">
              <div>
                <h3
                  style={{
                    borderBottom: "1px solid black",
                    width: "fit-content",
                  }}
                >
                  Tornado
                </h3>
              </div>
              <div>
                <h1>
                  Someone To Talk To: Health Center Provides Support After
                  Devastating Tornado
                </h1>
              </div>
              <div>
                <b>
                  After an EF4 tornado landed in a small, rural town of
                  Mississippi, employees of the oldest health center in the
                  nation are going door-to-door to check on neighbors’ health.
                </b>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
      </div>
      <div className="footer-resources">
        <Footer/>
      </div>
    </div>
    
  );
}
