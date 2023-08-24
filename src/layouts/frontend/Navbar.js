import axios from 'axios';
import React from 'react';
import { Link } from 'react-router-dom';
import swal from 'sweetalert'
import {useNavigate} from 'react-router-dom'
const Navbar = () => {
  const navigate=useNavigate()

  const logoutSubmit=(e)=>{
    e.preventDefault()
    axios.post(`/api/logout`).then(res=>{
        if(res.data.status===200){
          localStorage.removeItem('auth_token')
          localStorage.removeItem('auth_name')
          swal('خروج', res.data.message,'success')
          navigate('/')
        }
    })
  }
  var AuthButtons = ''
  if (!localStorage.getItem('auth_token')) {
    AuthButtons = (
      <div className='d-flex'>
        <li className="nav-item">
          <Link className="nav-link" to={'/login'}>ورود</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to={'/Register'}>ثبت نام</Link>
        </li>
      </div>
    )
  } else {
    AuthButtons=(
      <li className="nav-item">
      <button type="button" onClick={logoutSubmit} className='nav-link btn btn-danger btn-sm text-white'>خروج</button>
    </li>
    )
    
  }
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary shadow sticky-top">
      <div className="container">
        <Link className="navbar-brand" to={'#'}>Navbar</Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0  gap-3">
            <li className="nav-item">
              <Link className="nav-link active" to={'/'}>خانه</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to={'/about'}>درباره ما</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to={'/contact'}>محتوا</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to={'#'}>دسته بندی</Link>
            </li>

              {AuthButtons}
          </ul>

        </div>
      </div>
    </nav>
  );
}

export default Navbar;