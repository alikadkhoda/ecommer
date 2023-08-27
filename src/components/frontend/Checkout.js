import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import swal from 'sweetalert';

const Checkout = () => {
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()
    const [cart, setCart] = useState([])
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
                        </div> :
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
                                                        <input type="text" name="firstname" className='form-control' />
                                                    </div>
                                                </div>
                                                <div className='col-md-6'>
                                                    <div className='form-group mb-3'>
                                                        <label>Last Name:</label>
                                                        <input type="text" name="lastname" className='form-control' />
                                                    </div>
                                                </div>
                                                <div className='col-md-6'>
                                                    <div className='form-group mb-3'>
                                                        <label>Phone Number:</label>
                                                        <input type="text" name="phone" className='form-control' />
                                                    </div>
                                                </div>
                                                <div className='col-md-6'>
                                                    <div className='form-group mb-3'>
                                                        <label>Email Address:</label>
                                                        <input type="text" name="email" className='form-control' />
                                                    </div>
                                                </div>
                                                <div className='col-md-12'>
                                                    <div className='form-group mb-3'>
                                                        <label>Full Address:</label>
                                                        <textarea rows="3" className='form-control'></textarea>
                                                    </div>
                                                </div>
                                                <div className='col-md-4'>
                                                    <div className='form-group mb-3'>
                                                        <label>City:</label>
                                                        <input type="text" name="city" className='form-control' />
                                                    </div>
                                                </div>
                                                <div className='col-md-4'>
                                                    <div className='form-group mb-3'>
                                                        <label>State:</label>
                                                        <input type="text" name="state" className='form-control' />
                                                    </div>
                                                </div>
                                                <div className='col-md-4'>
                                                    <div className='form-group mb-3'>
                                                        <label>Zip Code:</label>
                                                        <input type="text" name="zipcode" className='form-control' />
                                                    </div>
                                                </div>
                                                <div className='col-md-12'>
                                                    <div className='form-group text-end'>
                                                        <button type="button" className='btn btn-primary'>Place Order</button>
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
                            </div>
                        }
                    </div>

                </div>
            </div>
        </div>
    );
}

export default Checkout;