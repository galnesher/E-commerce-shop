import React, { useState, useEffect } from "react";
import $ from 'jquery';
import './nav.css';
import { useSelector, useDispatch } from 'react-redux';
import { logoutAction } from '../../Redux/Action/userActions';
import {
    Link,
} from "react-router-dom";


// $(document).ready(function () {
//     $(".menu-icon").on("click", function () {
//         $("nav ul").toggleClass("showing");
//     });
// });
// Scrolling Effect
$(window).on("scroll", function () {
    if ($(window).scrollTop()) {
        $('nav').addClass('black');
    }
    else {
        $('nav').removeClass('black');
    }
})



const Nav = () => {

    const dispatch = useDispatch();
    const userFromStore = useSelector(state => state.UserReducer);
    const CartFromStore = useSelector(state => state.CartReducer);
    const [userName, setuserName] = useState(localStorage.getItem('UserName'));

    useEffect(() => {
        setuserName(localStorage.getItem('UserName'))
    }, [userFromStore.user])


    return (
        <>

            <nav className="navbar navbar-expand-md navbar-dark fixed-top">
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarCollapse" aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon" />
                </button>
                <Link to="/" >
                    <img src="https://res.cloudinary.com/dorromano/image/upload/v1614711964/ezgif.com-gif-maker_5_ap2dgu.webp" alt="LogoImg" width="50px" height="50px" />
                </Link>
                <span className="cart-icon">

                    <Link to="/cart" className=" text-white" onClick={(e) => e.stopPropagation()}>
                        <i className="fa fa-shopping-cart fa-2x ">
                            <span className="badge badge-pill red "> {CartFromStore.cartItems.reduce((a, c) => a + c.count, 0)}</span>
                        </i>
                    </Link>
                </span>
                <div className="collapse navbar-collapse" id="navbarCollapse">
                    <ul className="navbar-nav mr-auto">
                        <li className="nav-item mr-3">

                        </li>
                        <li className="nav-item active">
                            <Link className="nav-link" to="/">Home <span className="sr-only">(current)</span></Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/about">About Us</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/contact">Contact Us</Link>
                        </li>
                        {userFromStore.isLogged !== true ? (
                            <>
                                <li className="nav-item"><Link className="nav-link" to="/register">SignUp</Link></li>
                                <li className="nav-item"><Link className="nav-link" to="/login">Login</Link></li>
                            </>
                        ) : (
                            <>
                                <li className="nav-item"><Link className="nav-link" to="/myorders">My Orders</Link></li>
                                <li className="nav-item text-white mt-2"><h5>Hello {userName}</h5></li>
                                <li className="nav-item"><a onClick={() => {
                                    dispatch(logoutAction())
                                }} className="nav-link" href="/" >Logout</a></li>
                            </>
                        )}
                    </ul>
                </div>
            </nav>
        </>
    );
}

export default Nav;