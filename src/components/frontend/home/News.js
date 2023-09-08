import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const News = () => {
    const [newsProduct, setNewsProduct] = useState([])

    

    useEffect(() => {
        axios.get('api/news-product').then(res => {
            if (res.data.status === 200) {
                setNewsProduct(res.data.newsProduct)
            }
        })
    }, [])

    return (
        <div>
            <h3 className='text-center mb-3'>تازه ترین محصولات</h3>
            <hr className='m-auto mb-3' width='250px' />
            <div className='row justify-content-around mt-3 container-fluid'>
                {
                    newsProduct.map(item => {
                        return (
                            <div className='col-md-4' key={item.id}>
                                <div className="card bordered mb-3 m-auto position-relative" style={{width:'260px', height:'320px'}}>
                                    <img src={`http://127.0.0.1:8000/${item.image}`} alt={item.name} className='border' height='130px'/>
                                    <div className='card-body' >
                                        <h5>{item.name}</h5>
                                        <p>{item.description}</p>
                                        <Link to={`collections/${item.category.slug}/${item.slug}`} className='btn btn-primary position-absolute bottom-0 mb-3'>مشاهده</Link>
                                    </div>
                                </div>
                            </div>
                        )
                    })
                }
            </div>

        </div>
    );
}

export default News;