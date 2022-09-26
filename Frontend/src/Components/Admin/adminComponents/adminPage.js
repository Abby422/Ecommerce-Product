import { Outlet } from 'react-router';
import { Link } from 'react-router-dom';
import './admin.css'
import { AiOutlineLogout } from 'react-icons/ai'
import { useState } from 'react';


const AdminPage = () => {

    const [name, setName] = useState('ADMIN')

    return (

        <div className="adminPage">
            <div className="navigation">
                <div className="links">
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
            </div>
            <div className="content">
                <div className="navbar">
                    <div className='welcome'>
                        <span className='text'>{`Welcome admin ${name}`}</span>
                        <span className='icon'> <AiOutlineLogout /></span>
                    </div>
                </div>
                <div className="changingContent">
                    <Outlet />
                </div>
            </div>
        </div>

    );
}

export default AdminPage;