import React from "react";
import Cart from '../Cart/Cart';
import Products from '../Products/Products';
import { useSelector } from 'react-redux';

const Home = () => {
    const CartFromStore = useSelector(state => state.CartReducer);

    return (
        <>
            <div className="row">
                <div className="col">
                    <Products />
                </div>
                {CartFromStore.cartItems.length > 0 && (
                    <div className="col-md-4 cart">
                        <Cart />
                    </div>
                )}
            </div>
        </>
    )
}
export default Home;