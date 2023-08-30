import axios from 'axios';
import React from 'react';
import { Link, useNavigate } from 'react-router-dom'
import swal from 'sweetalert';
const Navbar = () => {
    const navigate = useNavigate()
    const handleSidebar=(e)=>{
        e.preventDefault()
        document.body.classList.toggle('sb-sidenav-toggled');
        localStorage.setItem('sb|sidebar-toggle', document.body.classList.contains('sb-sidenav-toggled'));
    }

    const logoutSubmit=(e)=>{
        e.preventDefault()
        axios.post(`/api/logout`).then(res=>{
            if(res.data.status===200){
              localStorage.removeItem('auth_token')
              localStorage.removeItem('auth_name')
              swal('خروج', res.data.message,'success')
              navigate('/')
            }
        })
      }
    return (
        <nav className="sb-topnav navbar navbar-expand navbar-dark bg-dark">

            <Link to={'/admin/dashboard'} className="navbar-brand ps-3" >پنل مدیریت</Link>
            <div className='d-flex justify-content-between w-100'>
                 <button onClick={handleSidebar} className="btn btn-link btn-sm order-1 order-lg-0 ms-4 me-lg-0" id="sidebarToggle" href="#!"><i className="fas fa-bars"></i></button>

            <ul className="navbar-nav me-auto ms-md-0 me-3 me-lg-4">
                <li className="nav-item dropdown">
                    <Link to='#' className="nav-link dropdown-toggle" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false"
                    ><i className="fas fa-user fa-fw"></i></Link>
                    <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="navbarDropdown">
                        <li><Link to={'/admin/profile'} className="dropdown-item">مشاهده پروفایل</Link></li>
                        <li><hr className="dropdown-divider" /></li>
                        <li><button onClick={logoutSubmit} className="dropdown-item">خروج</button></li>
                    </ul>
                </li>
            </ul>
            </div>
           
        </nav>
    );
}

export default Navbar;