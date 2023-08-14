import React from 'react';
import Footer from './Footer';
import Navbar from './Navbar';
import Sidbar from './Sidebar';
import '../../assets/admin/css/styles.css';
import '../../assets/admin/js/scripts.js'
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
                        Master File
                    </main>
                    <Footer/>
                </div>

            </div>
        </div>
    );
}

export default MasterLayout;