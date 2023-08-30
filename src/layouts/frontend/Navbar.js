import axios from 'axios';
import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import swal from 'sweetalert'
import {useNavigate} from 'react-router-dom'
import img from '../../assets/frontend/logo/codeyad.png'
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
          <NavLink className={({isActive})=>isActive?'nav-link active':'nav-link'} to={'/login'}>ورود</NavLink>
        </li>
        <li className="nav-item">
          <NavLink className={({isActive})=>isActive?'nav-link active':'nav-link'} to={'/Register'}>ثبت نام</NavLink>
        </li>
      </div>
    )
  } else {
    AuthButtons=(
      <li className="nav-item">
      <button type="button" onClick={logoutSubmit} className='btn btn-danger nav-link'>خروج</button>
    </li>
    )
    
  }
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary shadow sticky-top">
      <div className="container">
        <Link className="navbar-brand" to={'/'}>
          <img src={img} alt='navbar' width='50px' height='40px'/>
        </Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0  gap-3">
            <li className="nav-item">
              <NavLink className={({isActive})=>isActive?'nav-link active':'nav-link'} to={'/'}>خانه</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className={({isActive})=>isActive?'nav-link active':'nav-link'} to={'/collections'}>دسته بندی</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className={({isActive})=>isActive?'nav-link active':'nav-link'} to={'/cart'}>سبد خرید</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className={({isActive})=>isActive?'nav-link active':'nav-link'} to={'/about'}>درباره ما</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className={({isActive})=>isActive?'nav-link active':'nav-link'} to={'/contact'}>محتوا</NavLink>
            </li>

              {AuthButtons}
          </ul>

        </div>
      </div>
    </nav>
  );
}

export default Navbar;