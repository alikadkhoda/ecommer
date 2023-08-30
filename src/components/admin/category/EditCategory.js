import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import swal from 'sweetalert';
const EditCategory = () => {
    const [categoryInput, setCategoryInput] = useState([])
    const [loading, setLoading] = useState(false)
    const [errors, setErrors] = useState([])

    const {id}=useParams()
    const navigate=useNavigate()
    useEffect(()=>{
        setLoading(true)
        axios.get(`/api/edit-category/${id}`).then((res)=>{
            if(res.data.status===200){
                setCategoryInput(res.data.category)
            }
            else if(res.data.status===404){
                swal('خطا',res.data.message,'error')
                navigate('/admin/view-category')
            }
        }).finally(()=>{
            setLoading(false)
        })
    },[id])
    const handleInput = (e) => {
        e.persist()
        setCategoryInput({ ...categoryInput, [e.target.name]: e.target.value })
    }
    const updateCategory=(e)=>{
        e.preventDefault()
        const data=categoryInput
        axios.put(`/api/update-category/${id}`,data).then((res)=>{
            if(res.data.status===200){
                swal('آپدیت شد',res.data.message,'success')
                setErrors([])
            }
            else if(res.data.status===422){
                swal('خطا','لطفا فیلدهای خطادار را تصحیح کنید','error')
                setErrors(res.data.errors)
            }
            else if(res.data.status===404){
                swal('خطا',res.data.message,'error')
                navigate('/admin/view-category')
            }
        })
    }
    return (
        <div className='container px-4'>
            <div className='card mt-4'>
                <div className='card-header'>
                    <h4>ویرایش دسته بندی‌ها
                        <Link to={'/admin/view-category'} className='btn btn-primary btn-sm float-end'>بازگشت</Link>
                    </h4>

                </div>

                <div className='card-body'>
                {loading?<div className="d-flex justify-content-center">
                        <div className="spinner-border" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </div>
                    </div>:
                    <form onSubmit={updateCategory}>
                        <ul className="nav nav-pills mb-3" id="pills-tab" role="tablist">
                            <li className="nav-item" role="presentation">
                                <button className="nav-link active" id="pills-home-tab" data-bs-toggle="pill" data-bs-target="#pills-home" type="button" role="tab" aria-controls="pills-home" aria-selected="true">Home</button>
                            </li>
                            <li className="nav-item" role="presentation">
                                <button className="nav-link" id="seo-tags-tab" data-bs-toggle="pill" data-bs-target="#seo-tags" type="button" role="tab" aria-controls="seo-tags" aria-selected="false">SEO Tags</button>
                            </li>
                        </ul>
                        <div className="tab-content" id="pills-tabContent">
                            <div className="tab-pane fade show active card-body border p-3" id="pills-home" role="tabpanel" aria-labelledby="pills-home-tab" tabIndex="0">
                                <div className='form-group mb-3'>
                                    <label >slug</label>
                                    <input type="text" name="slug" onChange={handleInput} value={categoryInput.slug} className='form-control' />
                                    <small className='text-danger'>{errors.slug}</small>
                                </div>
                                <div className='form-group mb-3'>
                                    <label>نام</label>
                                    <input type="text" name="name" onChange={handleInput} value={categoryInput.name} className='form-control' />
                                    <small className='text-danger'>{errors.name}</small>
                                </div>
                                <div className='form-group mb-3'>
                                    <label>توضیحات</label>
                                    <textarea name="description" onChange={handleInput} value={categoryInput.description} className='form-control' />
                                </div>
                                <div className='form-group mb-3'>
                                    <label>وضعیت</label>
                                    <input type="checkbox" onChange={handleInput} value={categoryInput.status} name="status" />  وضعیت1=نمایش/وضعیت0=مخفی
                                </div>

                            </div>
                            <div className="tab-pane fade card-body border p-3" id="seo-tags" role="tabpanel" aria-labelledby="seo-tags-tab" tabIndex="0">
                                <div className='form-group mb-3'>
                                    <label>Meta Title</label>
                                    <input type="text" name="meta_title" onChange={handleInput} value={categoryInput.meta_title} className='form-control' />
                                    <small className='text-danger'>{errors.meta_title}</small>
                                </div>
                                <div className='form-group mb-3'>
                                    <label>Meta keywords</label>
                                    <textarea name="meta_keyword" onChange={handleInput} value={categoryInput.meta_keyword} className='form-control' />
                                </div>
                                <div className='form-group mb-3'>
                                    <label>Meta Description</label>
                                    <textarea name="meta_description" onChange={handleInput} value={categoryInput.meta_description} className='form-control' />
                                </div>
                            </div>
                            <button type="submit" className='btn btn-primary float-endt mt-1'>آپدیت</button>
                        </div>
                    </form>}
                </div>
            </div>
        </div>
    );
}

export default EditCategory;