import React from "react";
import {
    BrowserRouter as Router,
    Switch,
    Route,
} from "react-router-dom";
import '../Cart/Cart.css'
import About from "../About/About";
import Cart from "../Cart/Cart";
import Contact from "../Contact/Contact";
import Home from "../Home/Home";
import Login from "../Login/Login";
import Products from "../Products/Products";
import Register from "../Register/Register";
import Verification from "../Verification/Verification";
import Checkout from "../Checkout/Checkout";
import Header from "../Header/Header";
import MyOrders from "../MyOrders/MyOrders";




const Main = () => {
    return (
        <>
            <Header />
            <main className="container-fluid    ">
                <div className="row h-100">
                    <div className="col">
                        <Route>
                            <Switch>
                                <Route path="/register">
                                    <Register />
                                </Route>
                                <Route path="/verify">
                                    <Verification />
                                </Route>
                                <Route path="/login">
                                    <Login />
                                </Route>
                                <Route path="/about">
                                    <About />
                                </Route>
                                <Route path="/contact">
                                    <Contact />
                                </Route>
                                <Route path="/products">
                                    <Products />
                                </Route>
                                <Route path="/cart">
                                    <Cart />
                                </Route>
                                <Route path="/checkout">
                                    <Checkout />
                                </Route>
                                <Route path="/myorders">
                                    <MyOrders />
                                </Route>
                                <Route exact path="/">
                                    <Home />
                                </Route>
                            </Switch>
                        </Route>
                    </div>
                </div>




            </main>
        </>
    );
}

export default Main;