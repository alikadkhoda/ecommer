import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import swal from 'sweetalert';
import MasterLayout from './layouts/admin/MasterLayout';

const AdminPrivateRoute = () => {
    const [Authenticated, setAuthenticated]=useState(false)
    const [loading, setLoading]=useState(true)
    const navigate=useNavigate()
    useEffect(()=>{
        axios.get('/api/checkingAuthenticated').then(res=>{
            if (res.data.status===200) {
                setAuthenticated(true)
            }
            setLoading(false)
           
        }).catch(()=>{
            console.log('Unauthenticated');
        })
        return ()=>{
            setAuthenticated(false)
        }
    },[])
    axios.interceptors.response.use(undefined ,function axiosRetryInterceptor(err){
        if(err.response.status === 401){
            swal('عدم احراز هویت',err.response.data.message,'warning')
            navigate('/')
        }
        return Promise.reject(err)
    })

    axios.interceptors.response.use(function (response){
        return response
    }, function (error){
        if (error.response.status === 403) {
            swal('ممنوع',error.response.data.message,'warning')
            navigate('/403')
        } else if (error.response.status === 404) {
            swal('صفحه یافت نشد','صفحه مورد نظر شما یافت نشد'.message,'warning')
            navigate('/404')
        }
        return Promise.reject(error)
    })

    if(loading){
        return <div className="d-flex align-items-center">
        <strong role="status">Loading...</strong>
        <div className="spinner-border ms-auto" aria-hidden="true"></div>
      </div>
    }
    return ( 
       Authenticated?
       <MasterLayout/>:<Navigate to={'/login'}/>
     );
}
 
export default AdminPrivateRoute;