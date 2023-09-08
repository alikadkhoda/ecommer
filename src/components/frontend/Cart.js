import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import swal from 'sweetalert';

const Cart = () => {
    const [loading, setLoading] = useState(false)
    const [cart, setCart] = useState([])
    var totalCartPrice = 0
    const navigate = useNavigate()

    if (!localStorage.getItem('auth_token')) {
        navigate('/')
        swal('warning', 'لطفا برای مشاهده سبد خرید وارد شوید', 'error')
    }


    useEffect(() => {
        setLoading(true)
        axios.get(`/api/cart`).then(res => {
            if (res.data.status === 200) {
                setCart(res.data.cart)

            }
            else if (res.data.status === 401) {
                navigate('/')
                swal('خطا', res.data.message, 'error')
            }
        }).finally(() => {
            setLoading(false)
        })
    }, [])

    const handleDecrement = (cart_id) => {
        setCart(cart =>
            cart.map(item =>
                cart_id === item.id ? { ...item, product_qty: item.product_qty - (item.product_qty > 1 ? 1 : 0) } : item
            ))
        updateCartQuantity(cart_id, 'dec')
    }

    const handleIncrement = (cart_id) => {
        setCart(cart =>
            cart.map(item =>
                cart_id === item.id ? { ...item, product_qty: item.product_qty + (item.product_qty < 10 ? 1 : 0) } : item
            ))
        updateCartQuantity(cart_id, 'inc')
    }

    function updateCartQuantity(cart_id, scope) {
        axios.put(`/api/cart-updateQuantity/${cart_id}/${scope}`).then((res) => {
            if (res.data.status === 200) {
                swal('انجام شد', res.data.message, 'success')
            }
        })
    }

    const deleteCartItem = (e, cart_id) => {
        e.preventDefault()
        const thisClicked = e.currentTarget
        thisClicked.innerText = 'در حال حذف'
        axios.delete(`/api/delete-cartItem/${cart_id}`).then(res => {
            if (res.data.status === 200) {
                swal('انجام شد', res.data.message, 'success')
                thisClicked.closest('tr').remove()
            }
            else if (res.data.status === 404) {
                swal('خطا', res.data.message, 'error')
                thisClicked.innerText = 'حذف'
            }
        })
    }

    return (
        <div>
            <div className='py-3 bg-warning'>
                <div className='container'>
                    <h6>سبد خرید</h6>
                </div>
            </div>
            
            <div className='py-4'>
                <div className='container'>
                    <div className='row'>
                        {loading ? <div className="d-flex justify-content-center">
                            <div className="spinner-border" role="status">
                                <span className="visually-hidden">Loading...</span>
                            </div>
                        </div> :
                            <div className='col-md-12'>
                                {cart.length > 0 ?
                                    <div>
                                        <div className='table-responsive'>
                                            <table className='table table-bordered'>
                                                <thead>
                                                    <tr>
                                                        <th>تصویر</th>
                                                        <th className='text-center'>محصول</th>
                                                        <th className='text-center'>قیمت</th>
                                                        <th className='text-center'>تعداد</th>
                                                        <th className='text-center'>هزینه کل</th>
                                                        <th>حذف</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {cart.map((item) => {
                                                        totalCartPrice += item.product.selling_price * item.product_qty
                                                        return (
                                                            <tr key={item.id}>
                                                                <td width='10%'>
                                                                    <img src={`http://127.0.0.1:8000/${item.product.image}`} alt={item.product.name} width='50px' height='50px' />
                                                                </td>
                                                                <td>{item.product.name}</td>
                                                                <td width='15%' className='text-center'>{item.product.selling_price}</td>
                                                                <td width='15%'>
                                                                    <div className='input-group'>
                                                                        <button type="button" onClick={() => handleDecrement(item.id)} className='input-group-text'>-</button>
                                                                        <div className='form-control text-center'>{item.product_qty}</div>
                                                                        <button type="button" onClick={() => handleIncrement(item.id)} className='input-group-text'>+</button>
                                                                    </div>
                                                                </td>
                                                                <td width='15%' className='text-center'>{item.product.selling_price * item.product_qty}</td>
                                                                <td width='10%'>
                                                                    <button type="button" onClick={(e) => deleteCartItem(e, item.id)} className='btn btn-danger btn-sm'>حذف</button>
                                                                </td>
                                                            </tr>
                                                        )
                                                    })}
                                                </tbody>
                                            </table>

                                        </div>



                                        <div className='col-md-8'></div>
                                        <div className='col-md-4'>
                                            <div className='card card-body mt-3'>
                                                <h4 className='text-end'>مجموع هزینه‌ها:
                                                    <span className='float-start'>{totalCartPrice}تومان</span>
                                                    
                                                </h4>
                                                <h4>هزینه کل:
                                                    <span className='float-start'>{totalCartPrice}تومان</span>
                                                </h4>
                                                <Link to={'/checkout'} className='btn btn-primary'>پرداخت</Link>
                                            </div>
                                        </div>
                                    </div>
                                    :
                                    <div>
                                        <div className='card card-body py-5 text-center shadow-sm'>
                                            <h4>لیست خرید شما خالی است</h4>
                                        </div>
                                    </div>
                                }

                            </div>
                        }

                    </div>
                </div>
            </div>
        </div>
    );
}

export default Cart;