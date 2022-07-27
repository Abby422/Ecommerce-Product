import { Outlet } from 'react-router';
import { Link } from 'react-router-dom';
import './admin.css'
const AdminPage = () => {
    return (

        <div className="adminPage">
            <div className="navigation">
                <Link to='/admin/dashboard'>
                    <p>Dashboard</p>
                </Link>
                <Link to='/admin/addProduct'>
                    <p>Add Product</p>
                </Link>
                <Link to='/admin/updateProduct'>
                    <p>Update Product</p>
                </Link>
                <Link to='/admin/DeleteProduct'>
                    <p>Delete Product</p>
                </Link>
                <Link to='/admin/setAdmin'>
                    <p>Set Admin</p>
                </Link>
            </div>
            <div className="content">
                <div className="navbar">
                    <p>Welcome Admin</p>
                </div>
                <div className="changingContent">
                    <Outlet />
                </div>
            </div>
        </div>

    );
}

export default AdminPage;