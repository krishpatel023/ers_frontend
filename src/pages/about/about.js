import Header from "../../components/header";
import Footer from "../../components/footer";
import "./about.css";
function About() {
  return (
    <div className="about-us-wrapper">
      <div className="about-us-header">
        <Header />
      </div>
      <div className="about-us-main">
        <h1>ABOUT US</h1>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          marginTop: "120px",
          marginBottom: "120px",
        }}
      >
        <div className="about-us-flex1">
          <div className="flex1-div1">
            <h1>Our Vision</h1>
            <p>
              "In the face of nature's fury, resilience and unity shine
              brightest, reminding us that together we can weather any storm and
              rebuild stronger than before."
            </p>
          </div>
          <div className="flex1-div2">
            <img
              src="https://images.pexels.com/photos/355948/pexels-photo-355948.jpeg?auto=compress&cs=tinysrgb&w=800"
              alt="#"
            />
          </div>
        </div>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          marginTop: "120px",
          marginBottom: "120px",
        }}
      >
        <div className="about-us-flex1" style={{ flexWrap: "wrap-reverse" }}>
          <div className="flex2-div2">
            <img
              src="https://images.pexels.com/photos/392018/pexels-photo-392018.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
              alt="#"
            />
          </div>
          <div className="flex2-div1">
            <h1>Our Approach</h1>
            <p>
              "In the aftermath of natural disasters, developers become
              architects of hope, leveraging technology to rebuild communities,
              restore lives, and pave the way for a brighter future."
            </p>
          </div>
        </div>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          marginTop: "120px",
          marginBottom: "120px",
        }}
      >
        <div className="about-us-flex1">
          <div className="flex1-div1">
            <h1>Our Process</h1>
            <p>
              "Amidst the chaos of nature's fury, developers forge digital
              landscapes of support, weaving together innovation and empathy to
              create virtual lifelines that connect, inform, and empower
              affected communities."
            </p>
          </div>
          <div className="flex1-div2">
            <img
              src="https://images.pexels.com/photos/270360/pexels-photo-270360.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
              alt="#"
            />
          </div>
        </div>
      </div>
      <div className="about-us-footer">
        <Footer />
      </div>
    </div>
  );
}
export default About;
