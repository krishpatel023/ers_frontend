import './adminDashboard.css'
import AdminNavbar from '../../components/adminNavbar'

function adminDashboard(){
    return(
        <div className="admin-wrapper">
            <div className="admin-nav-section">
                <AdminNavbar />
            </div>
            <div className="admin-detail-section">
                <div className="admin-detail-wrapper">
                    <div className="admin-detail-section-1">
                        <div className="admin-detail-box">
                            <h4>TOTAL USERS</h4>
                            <h1>1234</h1>
                        </div>
                    </div>
                    <div className="admin-detail-section-2">
                        <div className="admin-detail-box">
                            <h4>TOTAL HOSPITALS</h4>
                            <h1>1234</h1>
                        </div>
                    </div>
                    <div className="admin-detail-section-3">
                        <div className="admin-detail-box">
                            <h4>TOTAL ADMINS</h4>
                            <h1>1234</h1>
                        </div>
                        <div className="admin-detail-box">
                            <h4>TOTAL DEVELOPERS</h4>
                            <h1>1234</h1>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default adminDashboard