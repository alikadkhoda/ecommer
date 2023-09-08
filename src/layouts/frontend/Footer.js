import React from 'react';
import img from '../../assets/frontend/logo/logo192.png'

const Footer = () => {
    return (
        <footer className='d-flex align-items-center justify-content-between p-4 bg-primary'>
            <span>این وبسایت با استفاده از <b>React.js</b> ساخته شده است</span>
            <img className='icon me-5' src={img} alt="icon-footer" width='70px' />
        </footer>
        
    );
}

export default Footer;