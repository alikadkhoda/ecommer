import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const ViewProduct = () => {
    const [product, setProduct]=useState([])
    const [loading, setLoading]=useState(false)
    useEffect(()=>{
        document.title='View Product'
        setLoading(true)
        axios.get('/api/view-product').then((res)=>{
            if(res.data.status===200){
                setProduct(res.data.products)
                
            }
        }).finally(()=>{
            setLoading(false)
            
        })
    },[])
 
    return ( 
        <div className='card  mt-3 m-3'>
            <div className='card-header'>
                <h4>مشاهده محصول
                    <Link to={'/admin/add-product'} className='btn btn-primary btn-sm float-end'>اضافه کردن محصول</Link>
                </h4>   
            </div>
            <div className='card-body'>
            {loading ? <div className="d-flex justify-content-center">
                        <div className="spinner-border" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </div>
                    </div>:null}
                <div className='table-responsive'>
                    <table className='table table-bordered table-striped'>
                        <thead>
                        <tr>
                            <th>آیدی</th>
                            <th>نام دسته بندی</th>
                            <th>نام محصول</th>
                            <th>قیمت فروش</th>
                            <th>تصویر</th>
                            <th>ویرایش</th>
                            <th>وضعیت</th>

                        </tr>
                        </thead>
                        <tbody>
                            {
                                product.map((item)=>{
                                  
                                    return(
                                    
                                        <tr key={item.id}>
                                            <td >{item.id}</td>
                                            <td >{item.category.name}</td>
                                            <td >{item.name}</td>
                                            <td >{item.selling_price}</td>
                                            <td ><img src={`http://127.0.0.1:8000/${item.image}`} width='50px' alt={item.name}/></td>
                                            <td ><Link to={`/admin/edit-product/${item.id}`} className='btn btn-success btn-sm'>ویرایش</Link></td>
                                            <td >{item.status ===1 ? 'مخفی':'نمایش'}</td>
                                            
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
     );
}
 
export default ViewProduct;