import React, { useState } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { formatCurrency } from "../../utils";
import Fade from 'react-reveal/Fade';
import { removeFromCartAction } from '../../Redux/Action/cartAction';
import { Redirect } from 'react-router-dom';
import { LazyLoadImage } from 'react-lazy-load-image-component';



const Cart = () => {
    const CartFromStore = useSelector(state => state.CartReducer);
    const [redirect, setredirect] = useState(null);
    const dispatch = useDispatch();

    const checkoutHandler = () => {
        setredirect('/checkout')
    }
    return (
        <>
            {redirect && (
                <Redirect to={redirect} />
            )}
            <Fade right>
                <div className="container">
                    <div className="row mt-3">
                        <h3>Shopping Cart</h3>
                    </div>
                    <div className="row mt-3 ">
                        <div className="col">
                            <div className="row ">
                                <table className="table table-sm">
                                    <thead>
                                        <tr>
                                            <th className="b-0"></th>
                                            <th className="b-0"></th>
                                            <th className="b-0">Price</th>
                                            <th className="b-0">Qty</th>
                                            <th className="b-0"></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {CartFromStore.cartItems.map((product) => (
                                            <tr key={product._id}>
                                                <td>
                                                    <LazyLoadImage
                                                        className="card-img-top"
                                                        effect="blur"
                                                        src={product.imageUrl}
                                                        alt={product.name}
                                                        width="40px"
                                                        height="40px"
                                                    />
                                                </td>
                                                <td className="">{product.name}</td>
                                                <td>{formatCurrency(product.price)}</td>
                                                <td>{product.count}</td>

                                                <td>
                                                    <button onClick={() => dispatch(removeFromCartAction(product))} className="btn btn-sm mt-1">🗑️</button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                            <p className="col"> Total Price :  {formatCurrency(
                                CartFromStore.cartItems.reduce((a, c) => a + c.price * c.count, 0).toFixed(2))}
                            </p>
                            <div className="row">
                                <button className="btn btn-sm btn-success" onClick={checkoutHandler}>Checkout</button>
                            </div>
                        </div>
                    </div>
                </div>
            </Fade>
        </>
    )

}
export default Cart;