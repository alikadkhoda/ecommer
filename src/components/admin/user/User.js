import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import swal from 'sweetalert';

const User = () => {

    const [loading, setLoading] = useState(false)
    const [userList, setUserList] = useState([])

    useEffect(() => {
        setLoading(true)
        axios.get('/api/view-users').then(res => {

            if (res.data.status === 200) {
                setUserList(res.data.users)
            }
        }).finally(() => {
            setLoading(false)
        })
    }, [])

    const deleteUser=(e,id)=>{
        e.preventDefault()
        const thisClicked=e.currentTarget
        thisClicked.innerText='درحال حذف'

        axios.delete(`/api/delete-user/${id}`).then((res)=>{
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
    console.log(userList);
    return ( 
        <div className='container px-4'>
            <div className='card mt-4'>
                <div className='card-header'>
                    <h4>لیست دسته بندی‌ها</h4>
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
                                <th>ایمیل</th>
                                <th>نقش</th>
                                <th>ویرایش</th>
                                <th>حذف</th>
                            </tr>
                        </thead>
                        <tbody>
                            {userList.map(item => {
                               
                                return (
                                    <tr key={item.id}>
                                        <td>{item.id}</td>
                                        <td>{item.name}</td>
                                        <td>{item.email}</td>
                                        <td>{item.role_as ===1 ? 'ادمین':'کاربر'}</td>
                                        <td>
                                            <Link to={`/admin/edit-user/${item.id}`} className='btn btn-success btn-sm'>ویرایش</Link>
                                        </td>
                                        <td>
                                            <button type="button" onClick={(e)=>{deleteUser(e,item.id)}} className='btn btn-danger btn-sm'>حذف</button>
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
 
export default User;