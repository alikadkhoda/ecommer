import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
const Order = () => {
    const [orders, setOrders] = useState([])
    const [loading, setLoading] = useState(false)
    useEffect(() => {
        document.title = 'Orders'
        setLoading(true)
        axios.get('/api/admin/orders').then((res) => {
            if (res.data.status === 200) {
                setOrders(res.data.orders)

            }
        }).finally(() => {
            setLoading(false)

        })
    }, [])
    return (
        <div className='container px-4 mt-3'>
            <div className='card'>
                <div className='card-header'>
                    <h4>سفارشات</h4>
                </div>

               


                    {loading ? <div className="d-flex justify-content-center">
                        <div className="spinner-border" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </div>
                    </div> : null}
                    <div className='card-body'>
                    <div className='table-responsive'>
                        <table className='table table-bordered table-striped'>
                            <thead>
                                <tr>
                                    <th>آیدی</th>
                                    <th>شناسه رهگیری</th>
                                    <th>شماره تماس</th>
                                    <th>ایمیل</th>
                                    <th>فعالیت</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    orders.map((item) => {

                                        return (

                                            <tr key={item.id}>
                                                <td >{item.id}</td>
                                                <td >{item.tracking_no}</td>
                                                <td >{item.phone}</td>
                                                <td >{item.email}</td>

                                                <td ><Link to={`/admin/view-order/${item.id}`} className='btn btn-success btn-sm'>مشاهده</Link></td>


                                            </tr>
                                        )
                                    })
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Order;