import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import swal from 'sweetalert';

const EditProfile = () => {

    const [profileInput, setProfileInput] = useState([{
        image:'',
        birthday:''
    }])
    const [userInput, setUserInput]=useState([])
    const [picture, setPicture] = useState([])
    const [loading, setLoading] = useState(false)
    const [errors, setErrors] = useState([])

    const navigate = useNavigate()

    const handleProfileInput = (e) => {
        e.persist()
        setProfileInput({ ...profileInput, [e.target.name]: e.target.value })
    }

    const handleUserInput = (e) => {
        e.persist()
        setUserInput({ ...userInput, [e.target.name]: e.target.value })
    }

    const handleImage = (e) => {

        setPicture({ image: e.target.files[0] })
        

    }

    const profileSubmit = (e) => {
        e.preventDefault()
        const formData = new FormData()
        formData.append('image', picture.image)
        formData.append('name', userInput.name)
        formData.append('email',userInput.email)
        formData.append('birthday',profileInput.birthday)

        axios.post('api/update-profile',formData, {
            headers: { 'Content-Type': 'multipart/form-data' }
        }).then(res=>{
            if(res.data.status===200){
                swal('آپدیت شد',res.data.message,'success')
                setErrors([])
            }
            else if(res.data.status===422){
                swal('خطا','اعتبارسنجی با مشکل مواجه شد','error')
                setErrors(res.data.errors)
            }
        })

    }

    useEffect(() => {
        setLoading(true)
        axios.get(`api/edit-profile`).then(res => {
            if (res.data.status === 200) {
                if(res.data.profile){
                    setProfileInput(res.data.profile)
                }
                
                setUserInput(res.data.user)
            }
            else if (res.data.status === 404) {
                swal('خطا', res.data.message, 'error')
                navigate('/')
            }
        }).finally(()=>{
            setLoading(false)
        })
    }, [])
    
    
    return (
        <div className='container py-5'>
            <div className='row justify-content-center'>
                <div className='col-md-8'>
                    {
                        loading ? <div className="d-flex justify-content-center">
                            <div className="spinner-border" role="status">
                                <span className="visually-hidden">Loading...</span>
                            </div>
                        </div> :
                            <div className='card'>
                                <div className='card-header'>
                                    <h4>پروفایل</h4>
                                </div>
                                <div className='card-body'>
                                    <form onSubmit={profileSubmit} encType='multipart/form-data'>
                                        <div className='form-group mb-3'>
                                            <label>نام و نام خانوادگی:</label>
                                            <input type="text" name="name" onChange={handleUserInput} value={userInput.name} className='form-control' />
                                            <span className='text-danger'>{errors.name}</span>
                                        </div>
                                        <div className='form-group mb-3'>
                                            <label>ایمیل:</label>
                                            <input type="email" name="email" onChange={handleUserInput} value={userInput.email} className='form-control text-end' />
                                            <span className='text-danger'>{errors.email}</span>
                                        </div>
                                        
                                        <div className='form-group mb-3'>
                                            <label>تاریخ تولد:</label>
                                            <input type="date" name="birthday" onChange={handleProfileInput} value={profileInput.birthday} className='form-control' />

                                        </div>
                                        <div className='form-group mb-3'>
                                            <label>تصویر</label>
                                            <input type="file" name="image" onChange={handleImage} className='form-control' />
                                            {profileInput.image ?
                                                <img src={`http://127.0.0.1:8000/${profileInput.image}`} alt='تصویر کاربر' width={'50px'} />
                                                : <small>بدون تصویر</small>}

                                        </div>
                                        <div className='form-group mb-3'>
                                            <button type="submit" className='btn btn-primary'>آپدیت</button>
                                        </div>
                                    </form>
                                </div>
                            </div>}
                </div>
            </div>
        </div>
    );
}

export default EditProfile;