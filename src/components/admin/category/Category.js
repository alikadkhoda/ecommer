import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import swal from 'sweetalert';

const Category = () => {

    const [categoryInput, setCategoryInput] = useState({
        slug: '',
        name: '',
        description: '',
        status: '',
        meta_title: '',
        meta_keyword: '',
        meta_description: '',
        error_list: []
    })
    const [picture,setPicture]=useState([])
    const navigate = useNavigate()

    const handleInput = (e) => {
        e.persist()
        setCategoryInput({ ...categoryInput, [e.target.name]: e.target.value })
    }
    const handleImage = (e) => {

        setPicture({ image: e.target.files[0] })
        
    }
    const submitCategory = (e) => {
        e.preventDefault()
        const formData = new FormData()
        formData.append('image', picture.image)
        formData.append('slug', categoryInput.slug )
        formData.append('name', categoryInput.name )
        formData.append('description', categoryInput.description )
        formData.append('status', categoryInput.status )
        formData.append('meta_title', categoryInput.meta_title )
        formData.append('meta_keyword', categoryInput.meta_keyword )
        formData.append('meta_description', categoryInput.meta_description )
        console.log(formData);
        axios.post('/api/store-category', formData,{
            headers: { 'Content-Type': 'multipart/form-data' }
        }).then(res => {
            if (res.data.status === 200) {
                swal('دسته بندی جدید', res.data.message, 'success')
                document.getElementById('CATEGORY_FORM').reset()
                navigate('/admin/view-category')
            } else if (res.data.status === 400) {
                setCategoryInput({ ...categoryInput, error_list: res.data.errors })
            }
        })




    }
    var display_errors = []
    if (categoryInput.error_list) {
        display_errors = [
            categoryInput.error_list.slug,
            categoryInput.error_list.name,
            categoryInput.error_list.meta_title
        ]
    }
    return (
        <div className='container-fluid px-4'>
            <h2 className='mt-4'> افزودن دسته بندی</h2>
            {
                display_errors.map(item => {
                    return (<p className='mb-1 text-danger' key={item}>{item}</p>)
                })
            }
            <form onSubmit={submitCategory} id='CATEGORY_FORM' encType='multipart/form-data' >
                <ul className="nav nav-pills mb-3" id="pills-tab" role="tablist">
                    <li className="nav-item" role="presentation">
                        <button className="nav-link active" id="pills-home-tab" data-bs-toggle="pill" data-bs-target="#pills-home" type="button" role="tab" aria-controls="pills-home" aria-selected="true">اصلی</button>
                    </li>
                    <li className="nav-item" role="presentation">
                        <button className="nav-link" id="seo-tags-tab" data-bs-toggle="pill" data-bs-target="#seo-tags" type="button" role="tab" aria-controls="seo-tags" aria-selected="false">سئو</button>
                    </li>
                </ul>
                <div className="tab-content" id="pills-tabContent">
                    <div className="tab-pane fade show active card-body border p-3" id="pills-home" role="tabpanel" aria-labelledby="pills-home-tab" tabindex="0">
                        <div className='form-group mb-3'>
                            <label for="">اسلاگ</label>
                            <input type="text" name="slug" onChange={handleInput} value={categoryInput.slug} className='form-control' />
                            <span></span>
                        </div>
                        <div className='form-group mb-3'>
                            <label for="">نام</label>
                            <input type="text" name="name" onChange={handleInput} value={categoryInput.name} className='form-control' />
                        </div>
                        <div className='form-group mb-3'>
                            <label for="">توضیحات</label>
                            <textarea name="description" onChange={handleInput} value={categoryInput.description} className='form-control' />
                        </div>
                        <div className='col-md-8 form-group mb-3'>
                            <label>تصویر</label>
                            <input type="file" name="image" onChange={handleImage} className='form-control' />
                         
                        </div>
                        <div className='form-group mb-3'>
                            <label for="">وضعیت</label>
                            <input type="checkbox" onChange={handleInput} value={categoryInput.status} name="status" />  وضعیت1=نمایش/وضعیت0=مخفی
                        </div>

                    </div>
                    <div className="tab-pane fade card-body border p-3" id="seo-tags" role="tabpanel" aria-labelledby="seo-tags-tab" tabindex="0">
                        <div className='form-group mb-3'>
                            <label for="">Meta Title</label>
                            <input type="text" name="meta_title" onChange={handleInput} value={categoryInput.meta_title} className='form-control' />
                        </div>
                        <div className='form-group mb-3'>
                            <label for="">Meta keywords</label>
                            <textarea name="meta_keyword" onChange={handleInput} value={categoryInput.meta_keyword} className='form-control' />
                        </div>
                        <div className='form-group mb-3'>
                            <label for="">Meta Description</label>
                            <textarea name="meta_description" onChange={handleInput} value={categoryInput.meta_description} className='form-control' />
                        </div>
                    </div>
                    <button type="submit" className='btn btn-primary float-endt mt-1'>ارسال</button>
                </div>
            </form>
        </div>
    );
}

export default Category;