import axios from 'axios';
import React, { useState } from 'react';
import swal from 'sweetalert'
import {useNavigate} from 'react-router-dom'

const Login = () => {
    const [loginInput, setLoginInput]=useState({
        email:'',
        password:'',
        error_list:[]
    })

    const navigate=useNavigate()

    const handleInput=(e)=>{
        e.persist()
        setLoginInput({...loginInput, [e.target.name]:e.target.value})
    }

    const loginSubmit=(e)=>{
        e.preventDefault()
        const data={
            email:loginInput.email,
            password:loginInput.password
        }
        axios.get('/sanctum/csrf-cookie').then(response => {
        axios.post(`api/login`, data).then(res=>{
            if(res.data.status===200){
                localStorage.setItem('auth_token',res.data.token)
                localStorage.setItem('auth_name',res.data.username)
                swal('ورود', res.data.message,'success')
                navigate('/')
            }else if(res.data.status===401){
                swal('هشدار', res.data.message,'warning')
            }else{
                setLoginInput({...loginInput, error_list:res.data.validation_errors})
            }
        })
    });
    }
    return ( 
        <div className='container py-5'>
            <div className='row justify-content-center'>
                <div className='col-md-6 py-5'>
                    <div className='card '>
                        <div className='card-header'>
                            <h4>ورود</h4>
                        </div>
                        <div className='card-body'>
                            <form onSubmit={loginSubmit}>
                                <div className='form-group mb-3'>
                                    <label for="">ایمیل:</label>
                                    <input type="text" name="email" onChange={handleInput} value={loginInput.email} className='form-control' />
                                    <span className='text-danger'>{loginInput.error_list.email}</span>
                                </div>
                                <div className='form-group mb-3'>
                                    <label for="">رمز عبور:</label>
                                    <input type="text" name="password" onChange={handleInput} value={loginInput.password} className='form-control' />
                                    <span className='text-danger'>{loginInput.error_list.password}</span>
                                </div>
                                <div className='form-group mb-3'>
                                    <button type="submit" className='btn btn-primary'>ورود</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
     );
}
 
export default Login;