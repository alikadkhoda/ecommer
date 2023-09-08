import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios'
import swal from 'sweetalert'
const AddProduct = () => {

    const [categoryList, setCategoryList] = useState([])
    const [productInput, setProduct] = useState({
        category_id: '',
        slug: '',
        description: '',
        meta_title: '',
        meta_keyword: '',
        meta_description: '',
        selling_price: '',
        orginal_price: '',
        qty: '',
        brand: '',
        featured: '',
        popular: '',
        status: ''
    })

    const [picture, setPicture] = useState([])
    const [errorList, setErrorList] = useState([])
    const handleInput = (e) => {
        e.persist()
        setProduct({ ...productInput, [e.target.name]: e.target.value })
    }

    const handleImage = (e) => {

        setPicture({ image: e.target.files[0] })
        
    }

    useEffect(() => {
        axios.get('/api/all-category').then((res) => {
            if (res.data.status === 200) {
                setCategoryList(res.data.category)
            }
        })
    }, [])

    const submitProduct = (e) => {
        e.preventDefault()
        const formData = new FormData()
        formData.append('image', picture.image)

        formData.append('category_id', productInput.category_id)
        formData.append('slug', productInput.slug)
        formData.append('name', productInput.name)
        formData.append('description', productInput.description)

        formData.append('meta_title', productInput.meta_title)
        formData.append('meta_keyword', productInput.meta_keyword)
        formData.append('meta_description', productInput.meta_description)

        formData.append('selling_price', productInput.selling_price)
        formData.append('orginal_price', productInput.orginal_price)
        formData.append('qty', productInput.qty)
        formData.append('brand', productInput.brand)
        formData.append('featured', productInput.featured)
        formData.append('popular', productInput.popular)
        formData.append('status', productInput.status)

        axios.post('/api/store-product', formData, {
            headers: { 'Content-Type': 'multipart/form-data' }
        }).then(res => {
            if (res.data.status === 200) {
                swal('محصول اضافه شد', res.data.message, 'success')
                setErrorList([])
                setProduct({
                    category_id: '',
                    slug: '',
                    description: '',
                    meta_title: '',
                    meta_keyword: '',
                    meta_description: '',
                    selling_price: '',
                    orginal_price: '',
                    qty: '',
                    brand: '',
                    featured: '',
                    popular: '',
                    status: ''
                })
            }
            else if (res.data.status === 422) {
                swal('خطا', 'اعتبار سنجی با مشکل مواجه شد', 'error')
                setErrorList(res.data.errors)
            }
        }).catch((err) => {
            console.log(err);
        })
    }

    return (
        <div className='container-fluid px-4'>
            <div className='card mt-4'>
                <div className='card-header'>
                    <h4>اضافه کردن محصول
                        <Link to={'/admin/view-product'} className='btn btn-primary btn-sm float-start'>مشاهده محصولات</Link>
                    </h4>
                </div>
                <div className='card-body'>

                    <form onSubmit={submitProduct} encType='multipart/form-data'>
                        <ul className="nav nav-tabs" id="myTab" role="tablist">
                            <li className="nav-item" role="presentation">
                                <button className="nav-link active" id="home-tab" data-bs-toggle="tab" data-bs-target="#home-tab-pane" type="button" role="tab" aria-controls="home-tab-pane" aria-selected="true">اصلی</button>
                            </li>
                            <li className="nav-item" role="presentation">
                                <button className="nav-link" id="seotags-tab" data-bs-toggle="tab" data-bs-target="#seotags-tab-pane" type="button" role="tab" aria-controls="seotags-tab-pane" aria-selected="false">سئو</button>
                            </li>
                            <li className="nav-item" role="presentation">
                                <button className="nav-link" id="otherdetails-tab" data-bs-toggle="tab" data-bs-target="#otherdetails-tab-pane" type="button" role="tab" aria-controls="otherdetails-tab-pane" aria-selected="false">جزییات بیشتر</button>
                            </li>

                        </ul>
                        <div className="tab-content" id="myTabContent">
                            <div className="tab-pane fade card-body border show active" id="home-tab-pane" role="tabpanel" aria-labelledby="home-tab" tabIndex="0">
                                <div className='form-group mb-3'>
                                    <label>انتخاب دسته بندی</label>
                                    <select name='category_id' onChange={handleInput} value={productInput.category_id} className='form-control'>
                                        <option>انتخاب دسته بندی</option>
                                        {
                                            categoryList.map(item => {
                                                return (
                                                    <option value={item.id} key={item.id}>{item.name}</option>
                                                )
                                            })
                                        }
                                    </select>
                                    <span className='text-danger'>{errorList.category_id}</span>
                                </div>
                                <div className='form-group mb-3'>
                                    <label>اسلاگ</label>
                                    <input type="text" name="slug" onChange={handleInput} value={productInput.slug} className='form-control' />
                                    <span className='text-danger'>{errorList.slug}</span>
                                </div>
                                <div className='form-group mb-3'>
                                    <label>نام</label>
                                    <input type="text" name="name" onChange={handleInput} value={productInput.name} className='form-control' />
                                    <span className='text-danger'>{errorList.name}</span>
                                </div>
                                <div className='form-group mb-3'>
                                    <label>توضیحات</label>
                                    <textarea name='description' onChange={handleInput} value={productInput.description} className='form-control'></textarea>
                                </div>

                            </div>
                            <div className="tab-pane fade card-body border" id="seotags-tab-pane" role="tabpanel" aria-labelledby="seotags-tab" tabIndex="0">
                                <div className='form-group mb-3'>
                                    <label >Meta Title</label>
                                    <input type="text" name="meta_title" onChange={handleInput} value={productInput.meta_title} className='form-control' />
                                    <span className='text-danger'>{errorList.meta_title}</span>
                                </div>
                                <div className='form-group mb-3'>
                                    <label >Meta keywords</label>
                                    <textarea name="meta_keyword" onChange={handleInput} value={productInput.meta_keyword} className='form-control' />
                                </div>
                                <div className='form-group mb-3'>
                                    <label>Meta Description</label>
                                    <textarea name="meta_description" onChange={handleInput} value={productInput.meta_description} className='form-control' />
                                </div>
                            </div>
                            <div className="tab-pane fade card-body border" id="otherdetails-tab-pane" role="tabpanel" aria-labelledby="otherdetails-tab" tabIndex="0">
                                <div className='row'>
                                    <div className='col-md-4 form-group mb-3'>
                                        <label>قیمت فروش</label>
                                        <input type="text" name="selling_price" onChange={handleInput} value={productInput.selling_price} className='form-control' />
                                        <span className='text-danger'>{errorList.selling_price}</span>
                                    </div>
                                    <div className='col-md-4 form-group mb-3'>
                                        <label>قیمت اصلی</label>
                                        <input type="text" name="orginal_price" onChange={handleInput} value={productInput.orginal_price} className='form-control' />
                                        <span className='text-danger'>{errorList.orginal_price}</span>
                                    </div>
                                    <div className='col-md-4 form-group mb-3'>
                                        <label>تعداد</label>
                                        <input type="text" name="qty" onChange={handleInput} value={productInput.qty} className='form-control' />
                                        <span className='text-danger'>{errorList.qty}</span>
                                    </div>
                                    <div className='col-md-4 form-group mb-3'>
                                        <label>برند</label>
                                        <input type="text" name="brand" onChange={handleInput} value={productInput.brand} className='form-control' />
                                        <span className='text-danger'>{errorList.brand}</span>
                                    </div>
                                    <div className='col-md-8 form-group mb-3'>
                                        <label>تصویر</label>
                                        <input type="file" name="image" onChange={handleImage} className='form-control' />
                                        <span className='text-danger'>{errorList.image}</span>
                                    </div>
                                    <div className='col-md-4 form-group mb-3'>
                                        <label>ویژگی‌ها (checked=shown)</label>
                                        <input type="checkbox" name="featured" onChange={handleInput} value={productInput.featured} className='w-50 h-50' />
                                    </div>
                                    <div className='col-md-4 form-group mb-3'>
                                        <label>عمومی (checked=shown)</label>
                                        <input type="checkbox" name="popular" onChange={handleInput} value={productInput.popular} className='w-50 h-50' />
                                    </div>
                                    <div className='col-md-4 form-group mb-3'>
                                        <label>وضعیت (checked=Hidden)</label>
                                        <input type="checkbox" name="status" onChange={handleInput} value={productInput.status} className='w-50 h-50' />
                                    </div>
                                </div>
                            </div>

                        </div>
                        <button type="submit" className='btn btn-primary px-4 mt-2'>ارسال</button>
                    </form>
                </div>
            </div>
        </div >
    );
}

export default AddProduct;