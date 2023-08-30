import React from 'react';
import Footer from './Footer';
import Navbar from './Navbar';
import Sidbar from './Sidebar';
import '../../assets/admin/css/styles.css';
import '../../assets/admin/js/scripts.js';
import { Navigate, Outlet} from 'react-router-dom';

const MasterLayout = ({user}) => {
    return (
        <div className='sb-nav-fixed'>
            <Navbar />
            <div id="layoutSidenav">

                <div id="layoutSidenav_nav">
                    <Sidbar user={user} />
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