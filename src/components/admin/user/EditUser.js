import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import swal from 'sweetalert';

const EditUser = () => {

    const [userInput, setUserInput]=useState({
        name:'',
        email:'',
        role_as:'',
    })
    const [loading,setLoading]=useState(false)
    const [errors, setErrors]=useState([])
    const {id}=useParams()
    const navigate=useNavigate()

    const handleInput=(e)=>{
        e.persist()
        setUserInput({...userInput, [e.target.name]:e.target.value})
    }

    const userSubmit=(e)=>{
        e.preventDefault()
        const data={
            name:userInput.name,
            email:userInput.email,
            role_as:userInput.role_as
        }
        axios.post(`api/update-user/${id}`,data).then(res=>{
            if(res.data.status===200){
                swal('آپدیت شد',res.data.message,'success')
            }
            else if (res.data.status === 422) {
                swal('خطا', 'لطفا فیلدهای خطادار را تصحیح کنید', 'error')
                setErrors(res.data.errors)
               
            }
        })
    }

    useEffect(()=>{
        setLoading(true)
        axios.get(`/api/edit-user/${id}`).then(res=>{
            if(res.data.status===200){
                setUserInput(res.data.user)
            }
            else if(res.data.status===404){
                swal('خطا', res.data.message, 'error')
                navigate('/admin/users')
            }
        }).finally(()=>{
            setLoading(false)
        })
    },[])
   
    return ( 
        <div className='container mt-3'>
            {loading ? <div className="d-flex justify-content-center">
                        <div className="spinner-border" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </div>
                    </div> :<div className='card'>
            <div className='card-header'>
            <h4>ویرایش کاربر  
                        <Link to={'/admin/view-users'} className='btn btn-primary btn-sm float-end'>بازگشت</Link>
                    </h4>
            </div>
            <div className='card-body'>
                <form onSubmit={userSubmit}>
                    <div className='row px-3'>
                        
                    <div className='form-group w-75 mb-3'>
                        <label>نام</label>
                        <input type="text" name="name" onChange={handleInput} value={userInput.name} className='form-control'/>
                        <span>{errors.name}</span>
                    </div>
                    <div className='form-group w-75 mb-3'>
                        <label>ایمیل</label>
                        <input type="text" name="email" onChange={handleInput} value={userInput.email} className='form-control'/>
                        <span>{errors.email}</span>
                    </div>
                    <div className='form-group w-75 mb-3'>
                        <label>نقش</label>
                        <select name='role_as' onChange={handleInput} value={userInput.role_as} className='form-control'>
                                <option value={'1'}>ادمین</option>
                                <option value={'0'}>کاربر</option>
                            </select>
                            
                        <span className='text-danger'>{errors.rol_as}</span>
                    </div>
                    </div>
                    <button type="submit" className='btn btn-primary mt-2 ms-3'>آپدیت</button>
                </form>
            </div>
            
           </div>}
           
        </div>
     );
}
 
export default EditUser;