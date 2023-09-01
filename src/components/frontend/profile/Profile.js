import React from 'react';
import { Link } from 'react-router-dom';

const Profile = () => {
    
    return ( 
        <div className='container'>
            <div className='row mt-5'>
                <div className='col-md-8'>
                    <p>نام و نام خانوادگی:</p>
                    <p>تاریخ تولد:</p>
                    <p>ایمیل:</p>
                    <p>تاریخ پیوستن:</p>

                </div>
                <div className='col-md-4'>
                    <img src="" alt="image"/>
                </div>
                <div>
                    <Link to={'/edit-profile'} className='btn btn-primary'>ویرایش</Link>
                </div>
            </div>
        </div>
     );
}
 
export default Profile;