import React from 'react';
import Navbar from './Navbar';
import { Outlet } from 'react-router-dom';
const FrontendLayout = () => {
    return ( 
        <div>
        <Navbar/>
        <Outlet/>
    </div>
     );
}
 
export default FrontendLayout;