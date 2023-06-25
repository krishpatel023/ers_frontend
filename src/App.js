import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AdminDashboard from "./pages/admin/adminDashboard"
import AdminUsers from './pages/admin/adminUsers/adminUsers'
import AdminCreateUser from './pages/admin/adminUsers/adminCreateUser'
import AdminEditUser from './pages/admin/adminUsers/adminEditUser'
import AdminViewUser from './pages/admin/adminUsers/adminViewUser'
import AdminHospitals from './pages/admin/adminHospitals/adminHospitals';
import AdminCreateHospital from './pages/admin/adminHospitals/adminCreateHospital'
import AdminEditHospital from './pages/admin/adminHospitals/adminEditHospital'
import NoPage from './pages/noPage/noPage'
import AdminFeedbacks from './pages/admin/adminFeedbacks/adminFeedbacks';
import DataPage from './pages/data/dataPage';
import NewsPage from './pages/news/newsPage';
import HomePage from './pages/home/homePage';
import Login from './pages/login/login';
import Register from './pages/register/register';
import ViewHospital from './pages/hospital/viewHospital/viewHospital';
import Logout from './pages/logout/logout';
import ChangeUserPassword from './pages/changePassword/changeUserPassword';
import ListHospital from './pages/hospital/listHospital/listHospital'
import Feedback from './pages/feedback/feedback'
import UserDashboard from './pages/userDadhboard/Dashboard'
import Resources from './pages/resources/Resources'
import About from './pages/about/about';
import AdminLogin from './pages/adminHospital/login';
import AdminHospEdit from './pages/adminHospital/hospitalEdit'
// import { CookiesProvider } from 'react-cookie';
function App() {
  return (
    <div className="App">

      <BrowserRouter>
      <Routes>
        <Route path='/' element={<HomePage/>}/>
        <Route path="/dataPage" element={<DataPage/>}/>
        <Route path="/newsPage" element={<NewsPage/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/logout" element={<Logout/>}/>
        <Route path="/changeUserPassword" element={<ChangeUserPassword/>}/>
        <Route path="/register" element={<Register/>}/>
        <Route path="/listHospital" element={<ListHospital/>}/>
        <Route path="/viewHospital/:id" element={<ViewHospital/>}/>
        <Route path="/resources" element={<Resources/>}/>
        <Route path="/feedback/:id" element={<Feedback/>}/>
        <Route path="/about" element={<About/>}/>
        <Route path="/userDashboard" element={<UserDashboard/>}/>
        <Route path="/admin" >
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="users" element={<AdminUsers />}/>
          <Route path="User">
            <Route path="viewUser/:id" element={<AdminViewUser/>} />
            <Route path="createUser" element={<AdminCreateUser/>} />
            <Route path="editUser/:id" element={<AdminEditUser/>} />
          </Route>
          <Route path="hospitals" element={<AdminHospitals />}/>
          <Route path="Hospital">
            <Route path="createHospital" element={<AdminCreateHospital/>} />
            <Route path="editHospital/:id" element={<AdminEditHospital/>} />
          </Route>
          <Route path="feedback" element={<AdminFeedbacks />} />
        </Route>

        <Route path="/hospitalAdmin" >
          <Route path="login" element={<AdminLogin />} />
          <Route path="edit/:id" element={<AdminHospEdit />} />
        </Route>
        <Route path="*" element={<NoPage/>}/>
      </Routes>
    </BrowserRouter>
    </div>
  );
}

export default App;
