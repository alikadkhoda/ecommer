import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import swal from 'sweetalert';

const OrderDetail = () => {
    const [loading, setLoading] = useState(false)
    const [orderItems, setOrderItems] = useState([])
    const navigate = useNavigate()
    const {id}=useParams()
    useEffect(() => {
        setLoading(true)
        axios.get(`/api/admin/view-order/${id}`).then(res => {
            if (res.data.status === 200) {
                setOrderItems(res.data.orderItems)

            }
            else if (res.data.status === 404) {
                navigate('/admin/orders')
                swal('خطا', res.data.message, 'error')
            }
        }).finally(() => {
            setLoading(false)
        })
    }, [])

    return (
        <div>
            <div className='py-4'>
                <div className='container'>
                    <div className='row'>
                        {loading ? <div className="d-flex justify-content-center">
                            <div className="spinner-border" role="status">
                                <span className="visually-hidden">Loading...</span>
                            </div>
                        </div> :
                            <div className='col-md-12'>
                                    <div>
                                        <div className='table-responsive'>
                                            <table className='table table-bordered'>
                                                <thead>
                                                    <tr>
                                                        <th>تصویر</th>
                                                        <th className='text-center'>نام محصول</th>
                                                        <th className='text-center'>قیمت</th>
                                                        <th className='text-center'>تعداد</th>
                                                        <th className='text-center'>جمع قیمت</th>
                                                       
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {orderItems.map((item) => {
                                                        return (
                                                            <tr key={item.id}>
                                                                <td width='10%'>
                                                                    <img src={`http://127.0.0.1:8000/${item.product.image}`} alt={item.product.name} width='50px' height='50px' />
                                                                </td>
                                                                <td>{item.product.name}</td>
                                                                <td width='15%' className='text-center'>{item.price}</td>
                                                                <td width='15%'>
                                                                   {item.qty}
                                                                </td>
                                                                <td width='15%' className='text-center'>{item.price * item.qty}</td>
                                                            </tr>
                                                        )
                                                    })}
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                            </div>
                        }

                    </div>
                </div>
            </div>
        </div>
    );
}

export default OrderDetail;