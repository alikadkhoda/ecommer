import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import swal from 'sweetalert';

const ViewProductFront = () => {
    const [loading, setLoading] = useState(false)
    const [product, setProduct] = useState([])
    const [category, setCategory] = useState([])
    const navigate = useNavigate()
    const { slug } = useParams()
    const productCount = product.length
    useEffect(() => {
        setLoading(true)
        axios.get(`/api/fetchProducts/${slug}`).then(res => {
            if (res.data.status === 200) {
                setProduct(res.data.product_data.product)
                setCategory(res.data.product_data.category)
            }
            else if (res.data.status === 400) {
                swal('خطا', res.data.message, 'error')
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
                    <h6>Category {category.name}</h6>
                </div>
            </div>
            <div className='py-3'>
                <div className='container'>
                    <div className='row'>
                        {loading ? <div className="d-flex justify-content-center">
                            <div className="spinner-border" role="status">
                                <span className="visually-hidden">Loading...</span>
                            </div>
                        </div> : productCount ? product.map((item) => {
                            return (
                                <div className='col-md-3' key={item.id}>
                                    <div className='card'>
                                        <Link to={`/collections/${item.category.slug}/${item.slug}`}>
                                            <img src={`http://127.0.0.1:8000/${item.image}`} className='w-100' alt={item.name} />
                                        </Link>
                                        <div className='card-body'>
                                            <Link to={`/collections/${item.category.slug}/${item.slug}`}>
                                                <h5>{item.name}</h5>
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            )
                        }) :
                            <div className='col-md-12'>
                                <h4>در دسترس نیست {category.name} محصولات</h4>
                            </div>}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ViewProductFront;