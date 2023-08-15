import React from 'react';
import Footer from './Footer';
import Navbar from './Navbar';
import Sidbar from './Sidebar';
import '../../assets/admin/css/styles.css';
import '../../assets/admin/js/scripts.js'
import { Navigate, Outlet, Route, Routes } from 'react-router-dom';
import Profile from '../../components/admin/Profile';
const MasterLayout = () => {
    return (
        <div className='sb-nav-fixed'>
            <Navbar />
            <div id="layoutSidenav">

                <div id="layoutSidenav_nav">
                    <Sidbar />
                </div>
                <div id="layoutSidenav_content">
                    <main>
                        <Navigate to={'/admin/dashboard'} replace={true}/>
                        <Outlet/>
                    </main>
                    <Footer/>
                </div>

            </div>
        </div>
    );
}

export default MasterLayout;