import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const CategoryHome = () => {
    const [category,setCategory]=useState([])

    useEffect(()=>{
        axios.get('api/getCategory').then(res=>{
            if(res.data.status===200){
                setCategory(res.data.category)
            }

        })
    }, [])
    return ( 
        <div className='mt-5 '>
            <h3 className='text-center mb-3'>دسته بندی‌ها</h3>
            <hr className='m-auto mb-3' width='250px'/>
            <ul className='list-unstyled d-flex justify-content-around '>
            {category.map(item=>{
                return (
                    <li key={item.id} className='d-flex flex-column'>
                        <img src={`http://127.0.0.1:8000/${item.image}`} alt={item.id} className='rounded-5 ' width='60px' height='60px'/>
                        <Link to={`/collections/${item.slug}`} className='text-center mt-1 text-decoration-none text-black'>{item.name}</Link>
                    </li>
                )
            })}
            </ul>
            
        </div>
     );
}
 
export default CategoryHome;