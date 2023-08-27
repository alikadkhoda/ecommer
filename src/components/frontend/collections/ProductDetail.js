import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import swal from 'sweetalert';

const ProductDetail = () => {
    const [loading, setLoading] = useState(false)
    const [product, setProduct] = useState([])
    const [category, setCategory] = useState([])
    const navigate = useNavigate()
    const { category_slug, product_slug } = useParams()
    const [quantity, setQuantity]=useState(1)
    
    const handleDecrement=()=>{
        if(quantity>1)
        setQuantity(prevCount=>prevCount-1)
    }

    const handleIncrement=()=>{
        if(quantity<10)
        setQuantity(prevCount=>prevCount+1)
    }

    const submitAddToCart=(e)=>{
        e.preventDefault()
        const data={
            product_id:product.id,
            product_qty:quantity
        }

        axios.post('/api/add-to-cart', data).then((res)=>{
            if(res.data.status===201){
                swal('انجام شد',res.data.message,'success')
            }
            else if(res.data.status===409){
                swal('هشدار',res.data.message,'warning')
            }
            else if(res.data.status===401){
                swal('خطا',res.data.message,'error')
            }
            else if(res.data.status===404){
                swal('خطا',res.data.message,'error')
            }
        })
    }

    useEffect(() => {
        setLoading(true)
        axios.get(`/api/viewProductDetail/${category_slug}/${product_slug}`).then(res => {
            if (res.data.status === 200) {
                setProduct(res.data.product)
                setCategory(res.data.category)
            }
            else if (res.data.status === 404) {
                navigate('/collections')
                swal('صفحه یافت نشد', res.data.message, 'error')
            }
        }).finally(() => {
            setLoading(false)
        })
    }, [])

    return (
        <div>
            <div className='py-3 bg-warning'>
                <div className='container'>
                    <h6>Collection / {category.name} /{product.name}</h6>
                </div>
            </div>
            <div className='py-3'>
                <div className='container'>
                    <div className='row'>
                        {loading ? <div className="d-flex justify-content-center">
                            <div className="spinner-border" role="status">
                                <span className="visually-hidden">Loading...</span>
                            </div>
                        </div> : null}
                        <div className='col-md-4 border-end'>
                            <img src={`http://127.0.0.1:8000/${product.image}`} alt={product.name} className='w-100' />
                        </div>
                        <div className='col-md-8'>
                            <h4>
                                {product.name}
                                <span className='float-end badge btn-sm bg-danger badge-pill rounded'>{product.brand}</span>
                            </h4>
                            <p>{product.description}</p>
                            <h4 className='mb-1'>
                                Rs:{product.selling_price}
                                <s className='ms-2'>Rs:{product.orginal_price}</s>
                            </h4>
                            <div>
                                {product.qty > 0 ?
                                    <div>
                                        <label className='btn-sm bg-success p-1 rounded text-white px-4 mt-2'>In stock</label>
                                        <div className='row'>
                                            <div className='col-md-3 mt-3'>
                                                <div className='input-group'>
                                                    <button type="button" onClick={handleDecrement} className='input-group-text'>-</button>
                                                    <div className='form-control text-center'>
                                                        {quantity}
                                                    </div>
                                                    <button type="button" onClick={handleIncrement} className='input-group-text'>+</button>
                                                </div>
                                            </div>
                                            <div className='col-md-3 mt-3'>
                                                <button type="button" onClick={submitAddToCart} className='btn btn-primary w-100'>Add to Cart</button>
                                            </div>
                                        </div>
                                    </div> :
                                    <label className='btn-sm bg-danger p-1 rounded text-white px-4 mt-2'>out of stock</label>

                                }

                                <button type="button" className='btn btn-danger mt-3'>Add to WishList</button>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProductDetail;