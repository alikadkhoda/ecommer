import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios'
import swal from 'sweetalert'
const Profile = () => {

    const [profile, setProfile] = useState([{
        birthday:'',
        image:''
    }])
    const [user, setUser]=useState([])
    const [loading, setLoading] = useState(false)

    const navigate = useNavigate()

    useEffect(() => {
        setLoading(true)

        axios.get('api/profile').then(res => {
            if (res.data.status === 200) {
                setUser(res.data.user)
                setProfile(res.data.profile)
            }
            else if (res.data.status === 404) {
                swal('خطا', res.data.message, 'error')
                navigate('/')
            }
        }).finally(() => {
            setLoading(false)
        })
    },[])
    
    return (
        <div className='container'>
            {loading ? <div className="d-flex justify-content-center">
                <div className="spinner-border" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            </div> :
                <div className='row mt-5 border p-2'>
                    <div className='col-md-8'>
                        <label>نام و نام خانوادگی:</label>
                        <p>{user.name}</p>
                        <label>تاریخ تولد:</label>
                        {profile.birthday ? <p>{profile.birthday}</p>:<p>بدون تاریخ</p> }
                        
                        <label>ایمیل:</label>
                        <p>{user.email}</p>
                        <label>تاریخ پیوستن:</label>
                        <p>{user.created_at}</p>
                    </div>
                    <div className='col-md-4 justify-content-center mt-5'>
                        <div className='d-flex flex-column'>
                            <label>تصویر:</label>
                        {profile.image ? 
                           <img src={`http://127.0.0.1:8000/${profile.image}`} alt='تصویر کاربر' width={'200px'} height={'200px'}
                            className='border mt-1 rounded'/> 
                           : <small>بدون تصویر</small>}
                        </div>
                        
                    </div>
                    <div>
                        <Link to={'/edit-profile'} className='btn btn-primary'>ویرایش</Link>
                    </div>
                </div>}
        </div>
    );
}

export default Profile;