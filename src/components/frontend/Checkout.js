import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import swal from 'sweetalert';

const Checkout = () => {
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()
    const [cart, setCart] = useState([])
    const [checkoutInput, setCheckoutInput] = useState({
        firstname: '',
        lastname: '',
        phone: '',
        email: '',
        address: '',
        city: '',
        state: '',
        zipcode: ''
    })
    const [error, setError] = useState([])
    var totalCartPrice = 0

    if (!localStorage.getItem('auth_token')) {
        navigate('/')
        swal('warning', 'Login to goto Cart Page', 'error')
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

    const handleInput = (e) => {
        e.persist()
        setCheckoutInput({ ...checkoutInput, [e.target.name]: e.target.value })
    }

    const submitOrder = (e) => {
        e.preventDefault()

        const data = {
            firstname: checkoutInput.firstname,
            lastname: checkoutInput.lastname,
            phone: checkoutInput.phone,
            email: checkoutInput.email,
            address: checkoutInput.address,
            city: checkoutInput.city,
            state: checkoutInput.state,
            zipcode: checkoutInput.zipcode
        }
        axios.post('/api/place-order', data).then(res => {
            if (res.data.status === 200) {
                swal('انجام شد', res.data.message, 'success')
                setError([])
                navigate('/')
            }
            else if (res.data.status === 422) {
                swal('مشکل اعتبار سنجی', '', 'error')
                setError(res.data.errors)
            }
        })
    }

    return (
        <div>
            <div className='py-3 bg-warning'>
                <div className='container'>
                    <h6>Home / Checkout</h6>
                </div>
            </div>
            <div className='py-4'>
                <div className='container'>
                    <div className='row'>
                        {loading ? <div className="d-flex justify-content-center">
                            <div className="spinner-border" role="status">
                                <span className="visually-hidden">Loading...</span>
                            </div>
                        </div> : cart.length > 0 ?
                            <div className='row'>
                                <div className='col-md-7'>
                                    <div className='card'>
                                        <div className='card-header'>
                                            <h4>اطلاعات پایه:</h4>
                                        </div>
                                        <div className='card-body'>
                                            <div className='row'>
                                                <div className='col-md-6'>
                                                    <div className='form-group mb-3'>
                                                        <label>First Name:</label>
                                                        <input type="text" name="firstname" onChange={handleInput} value={checkoutInput.firstname} className='form-control' />
                                                        <small className='text-danger'>{error.firstname}</small>
                                                    </div>
                                                </div>
                                                <div className='col-md-6'>
                                                    <div className='form-group mb-3'>
                                                        <label>Last Name:</label>
                                                        <input type="text" name="lastname" onChange={handleInput} value={checkoutInput.lastname} className='form-control' />
                                                        <small className='text-danger'>{error.lastname}</small>
                                                    </div>
                                                </div>
                                                <div className='col-md-6'>
                                                    <div className='form-group mb-3'>
                                                        <label>Phone Number:</label>
                                                        <input type="text" name="phone" onChange={handleInput} value={checkoutInput.phone} className='form-control' />
                                                        <small className='text-danger'>{error.phone}</small>
                                                    </div>
                                                </div>
                                                <div className='col-md-6'>
                                                    <div className='form-group mb-3'>
                                                        <label>Email Address:</label>
                                                        <input type="text" name="email" onChange={handleInput} value={checkoutInput.email} className='form-control' />
                                                        <small className='text-danger'>{error.email}</small>
                                                    </div>
                                                </div>
                                                <div className='col-md-12'>
                                                    <div className='form-group mb-3'>
                                                        <label>Full Address:</label>
                                                        <textarea rows="3" name='address' onChange={handleInput} value={checkoutInput.address} className='form-control'></textarea>
                                                        <small className='text-danger'>{error.address}</small>
                                                    </div>
                                                </div>
                                                <div className='col-md-4'>
                                                    <div className='form-group mb-3'>
                                                        <label>City:</label>
                                                        <input type="text" name="city" onChange={handleInput} value={checkoutInput.city} className='form-control' />
                                                        <small className='text-danger'>{error.city}</small>
                                                    </div>
                                                </div>
                                                <div className='col-md-4'>
                                                    <div className='form-group mb-3'>
                                                        <label>State:</label>
                                                        <input type="text" name="state" onChange={handleInput} value={checkoutInput.state} className='form-control' />
                                                        <small className='text-danger'>{error.state}</small>
                                                    </div>
                                                </div>
                                                <div className='col-md-4'>
                                                    <div className='form-group mb-3'>
                                                        <label>Zip Code:</label>
                                                        <input type="text" name="zipcode" onChange={handleInput} value={checkoutInput.zipcode} className='form-control' />
                                                        <small className='text-danger'>{error.zipcode}</small>
                                                    </div>
                                                </div>
                                                <div className='col-md-12'>
                                                    <div className='form-group text-end'>
                                                        <button type="button" onClick={submitOrder} className='btn btn-primary'>Place Order</button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className='col-md-5'>
                                    <table className='table table-bordered'>
                                        <thead>
                                            <tr>
                                                <th width='50%'>Product</th>
                                                <th>Price</th>
                                                <th>Qty</th>
                                                <th>Total</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {cart.map((item) => {
                                                totalCartPrice += item.product.selling_price * item.product_qty
                                                return (
                                                    <tr key={item.id}>
                                                        <td>{item.product.name}</td>
                                                        <td>{item.product.selling_price}</td>
                                                        <td>{item.product_qty}</td>
                                                        <td>{item.product.selling_price * item.product_qty}</td>
                                                    </tr>
                                                )
                                            })}
                                            <tr>
                                                <td colSpan={'2'} className='text-end fw-bold'>Grand Total:</td>
                                                <td colSpan={'2'} className='text-end fw-bold'>{totalCartPrice}</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div> :
                            <div>
                                <div className='card card-body py-5 text-center shadow-sm'>
                                    <h4>لیست خرید شما خالی است</h4>
                                </div>
                            </div>
                        }
                    </div>

                </div>
            </div>
        </div>
    );
}

export default Checkout;