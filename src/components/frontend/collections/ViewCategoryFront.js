import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const ViewCategoryFront = () => {
    const [category, setCategory] = useState([])
    const [loading, setLoading] = useState(false)
    useEffect(() => {
        setLoading(true)
        axios.get('/api/getCategory').then((res) => {
            if (res.data.status === 200) {
                setCategory(res.data.category)
            }
        }).finally(() => {
            setLoading(false)
        })
    }, [])
    return (
        <div>
            <div className='py-3 bg-warning'>
                <div className='container'>
                    <h6>دسته بندی‌ها</h6>
                </div>
            </div>
            <div className='py-3'>
                <div className='container'>
                    <div className='row'>
                        {loading ? <div className="d-flex justify-content-center">
                            <div className="spinner-border" role="status">
                                <span className="visually-hidden">Loading...</span>
                            </div>
                        </div> : category.map((item) => {
                            return (
                                <div className='col-md-4' key={item.id}>
                                    <div className='card mb-4 w-75'>
                                        <Link to={`/collections/${item.slug}`}>
                                            <img src={`http://127.0.0.1:8000/${item.image}`} alt={item.name} className='w-100 border-bottom' width='250px' height='250px' />
                                        </Link>
                                        <div className='card-body'>
                                            <Link to={`/collections/${item.slug}`} className='text-decoration-none'>
                                                <h5>{item.name}</h5>
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>
        </div>

    );
}

export default ViewCategoryFront;