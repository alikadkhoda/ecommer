import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import swal from 'sweetalert';

const ViewCategory = () => {
    const [loading, setLoading] = useState(false)
    const [categoryList, setCategoryList] = useState([])

    useEffect(() => {
        setLoading(true)
        axios.get('/api/view-category').then(res => {

            if (res.data.status === 200) {
                setCategoryList(res.data.category)
            }
        }).finally(() => {
            setLoading(false)
        })
    }, [])

    const deleteCategory=(e,id)=>{
        e.preventDefault()
        const thisClicked=e.currentTarget
        thisClicked.innerText='Deleting'

        axios.delete(`/api/delete-category/${id}`).then((res)=>{
            if(res.data.status===200){
                swal('حذف شد',res.data.message,'success')
                thisClicked.closest('tr').remove()
            }
            else if(res.data.status===404){
                swal('خطا',res.data.message,'error')
                thisClicked.innerText='Delete'
            }
        })
    }

    return (
        <div className='container px-4'>
            <div className='card mt-4'>
                <div className='card-header'>
                    <h4>لیست دسته بندی‌ها
                        <Link to={'/admin/add-category'} className='btn btn-primary btn-sm float-end'>افزودن دسته بندی جدید</Link>
                    </h4>
                    
                </div>
                <div className='card-body'>
                    {loading ? <div className="d-flex justify-content-center">
                        <div className="spinner-border" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </div>
                    </div>:null}
                
                    <table className='table table-bordered table-striped'>
                        <thead>
                            <tr>
                                <th>آیدی</th>
                                <th>نام</th>
                                <th>اسلاگ</th>
                                <th>وضعیت</th>
                                <th>ویرایش</th>
                                <th>حذف</th>
                            </tr>
                        </thead>
                        <tbody>


                            {categoryList.map(item => {
                                return (
                                    <tr key={item.id}>
                                        <td>{item.id}</td>
                                        <td>{item.name}</td>
                                        <td>{item.slug}</td>
                                        <td>{item.status=== 1 ?'مخفی':'نمایش'}</td>
                                        <td>
                                            <Link to={`/admin/edit-category/${item.id}`} className='btn btn-success btn-sm'>ویرایش</Link>
                                        </td>
                                        <td>
                                            <button type="button" onClick={(e)=>{deleteCategory(e,item.id)}} className='btn btn-danger btn-sm'>حذف</button>
                                        </td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default ViewCategory;