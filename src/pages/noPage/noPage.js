import { useNavigate } from "react-router-dom"
import './noPage.css'
function NoPage() {
  let navigate = useNavigate()
  return (
    <div className="noPage-wrapper">
        <h1>UNDER CONSTRUCTION</h1>
        <button onClick={() => navigate(-1)}>Go Back</button>
    </div>
  );
  }
  
  export default NoPage;