import React from 'react';
import Navbar from './Navbar';
import { Outlet } from 'react-router-dom';
import Footer from './Footer';
const FrontendLayout = () => {
    return ( 
        <div className='vh-100'>
        <Navbar/>
        <Outlet/>
        
    </div>
     );
}
 
export default FrontendLayout;