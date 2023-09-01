import React from 'react';
import { Link } from 'react-router-dom';
const Sidbar = ({user}) => {
    return (
        <nav className="sb-sidenav accordion sb-sidenav-dark" id="sidenavAccordion">
            <div className="sb-sidenav-menu">
                <div className="nav">
                   
                    <Link className="nav-link" to={'/admin/dashboard'}>
                        <div className="sb-nav-link-icon"><i className="fas fa-tachometer-alt ms-1"></i></div>
                        داشبورد
                    </Link>
                    <Link className="nav-link collapsed" href="#" data-bs-toggle="collapse" data-bs-target="#collapseCollection" aria-expanded="false" aria-controls="collapseCollection">
                        <div className="sb-nav-link-icon"><i className="fas fa-tachometer-alt ms-1"></i></div>
                        دسته بندی
                        <div className="sb-sidenav-collapse-arrow"><i className="fas fa-angle-down"></i></div>
                    </Link>
                    <div className="collapse" id="collapseCollection" aria-labelledby="headingOne" data-bs-parent="#sidenavAccordion">
                        <nav className="sb-sidenav-menu-nested nav">
                            <Link className="nav-link" to={'/admin/add-category'}>افزودن دسته بندی</Link>
                            <Link className="nav-link" to={'/admin/view-category'}>مشاهده دسته بندی‌ها</Link>
                        </nav>
                    </div>
                    
                    <Link className="nav-link collapsed" href="#" data-bs-toggle="collapse" data-bs-target="#collapseProduct" aria-expanded="false" aria-controls="collapseProduct">
                        <div className="sb-nav-link-icon"><i className="fas fa-box ms-1"></i></div>
                        محصولات
                        <div className="sb-sidenav-collapse-arrow"><i className="fas fa-angle-down"></i></div>
                    </Link>
                    <div className="collapse" id="collapseProduct" aria-labelledby="headingOne" data-bs-parent="#sidenavAccordion">
                        <nav className="sb-sidenav-menu-nested nav">
                            <Link className="nav-link" to={'/admin/add-product'}>اضافه کردن محصولات</Link>
                            <Link className="nav-link" to={'/admin/view-product'}>مشاهده محصولات</Link>
                        </nav>
                    </div>
                    <Link className="nav-link" to={'/admin/orders'}>
                        <div className="sb-nav-link-icon"><i className="fas fa-shopping-basket ms-1"></i></div>
                        سفارشات
                    </Link>
                    <Link className="nav-link" to={'/admin/view-users'}>
                        <div className="sb-nav-link-icon"><i className="fas fa-user mt-1 ms-1"></i></div>
                        کاربران
                    </Link>
                </div>
            </div>
            <div className="sb-sidenav-footer">
                <div className="bold">ادمین:</div>
                <span>
                     {user}
                </span>
              
            </div>
        </nav>
    );
}

export default Sidbar;