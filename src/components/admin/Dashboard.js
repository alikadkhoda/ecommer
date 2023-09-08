import React, { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import axios from 'axios'

const Dashboard = () => {
  const [data,setData]=useState([])
  const [loading, setLoading]=useState(false)

  useEffect(()=>{
    setLoading(true)
    axios.get('api/sale-category').then(res=>{
      if(res.data.status===200){
        setData(res.data.data)
      }
    }).finally(()=>{
      setLoading(false)
    })
  }, [])
  
  return (
    <div className='d-flex flex-column  mt-5' dir='ltr'>
     
        <h4 className='m-auto'>(تومان) قیمت کل بر اساس دسته بندی</h4>
      
{loading ? <div className="d-flex justify-content-center">
                            <div className="spinner-border" role="status">
                                <span className="visually-hidden">Loading...</span>
                            </div>
                        </div> : 
                        <div>
                          
      <ResponsiveContainer width="90%" aspect={2}>
        <BarChart
          width={600}
          height={300}
          data={data}
          margin={ {top: 5, right: 15, bottom: 5, left: 5} }
          barSize={10}
        >
          <XAxis dataKey="name" scale="point" padding={{ left: 20, right: 10 }} />
          <YAxis/>
          {/* dx={10} */}
          <Tooltip />
          <Legend />
          <CartesianGrid strokeDasharray="3 3" />
          <Bar dataKey="total_price" fill="#8884d8" background={{ fill: '#eee' }} />
        </BarChart>
      </ResponsiveContainer>

                        </div>
      }
    </div>
  );
}

export default Dashboard;
