import React, { useState } from 'react';
import axios from 'axios'
import swal from 'sweetalert'
import {useNavigate} from 'react-router-dom'
const Register = () => {
    const [registerInput, setRegisterInput] = useState({
        name: '',
        email: '',
        password: '',
        error_list:[]
    })
    const navigate=useNavigate()
    const handleInput = (e) => {
        e.persist()
        setRegisterInput({ ...registerInput, [e.target.name]: e.target.value })
    }
    const registerSubmit = (e) => {
            e.preventDefault()
            const data={
                name:registerInput.name,
                email:registerInput.email,
                password:registerInput.password
            }
            axios.get('/sanctum/csrf-cookie').then(response => {
                 axios.post(`api/register`, data).then(res=>{
                    if (res.data.status === 200) {
                        localStorage.setItem('auth_token',res.data.token)
                        localStorage.setItem('auth_name',res.data.username)
                        swal('ثبت نام', res.data.message,'success')
                        navigate('/')
                    }else{
                        setRegisterInput({...registerInput, error_list : res.data.validation_errors})
                    }
            })
            });
           
    }
    return (
        <div className='container py-5'>
            <div className='row justify-content-center'>
                <div className='col-md-6'>
                    <div className='card'>
                        <div className='card-header'>
                            <h4>ثبت نام</h4>
                        </div>
                        <div className='card-body'>
                            <form onSubmit={registerSubmit}>
                                <div className='form-group mb-3'>
                                    <label for="">نام و نام خانوادگی:</label>
                                    <input type="text" name="name" onChange={handleInput} value={registerInput.name} className='form-control' />
                                    <span className='text-danger'>{registerInput.error_list.name}</span>
                                </div>
                                <div className='form-group mb-3'>
                                    <label for="">ایمیل:</label>
                                    <input type="email" name="email" onChange={handleInput} value={registerInput.email} className='form-control' />
                                    <span className='text-danger'>{registerInput.error_list.email}</span>
                                </div>
                                <div className='form-group mb-3'>
                                    <label for="">رمز عبور:</label>
                                    <input type="password" name="password" onChange={handleInput} value={registerInput.password} className='form-control' />
                                    <span className='text-danger'>{registerInput.error_list.password}</span>
                                </div>
                                <div className='form-group mb-3'>
                                    <button type="submit" className='btn btn-primary'>ثبت نام</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Register;