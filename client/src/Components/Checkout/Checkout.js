import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { createOrderAction } from "../../Redux/Action/orderAction";
import { formatCurrency } from "../../utils";
import Modal from 'react-modal';
import Zoom from 'react-reveal/Zoom';

const customStyles = {
    content: {
        top: '20%',
        right: '10%',
        left: '10%',
    },
}
const Checkout = () => {
    const userId = localStorage.getItem('UserId');
    const CartFromStore = useSelector(state => state.CartReducer);
    const dispatch = useDispatch();
    const OrderFromStore = useSelector(state => state.OrderReducer);
    const [order, setOrder] = useState({
        firstName: '',
        lastName: '',
        emailAddress: '',
        phoneNumber: '',
        city: '',
        cartItems: CartFromStore.cartItems,
        userId: userId ? userId : '',
        totalPrice: CartFromStore.cartItems.reduce((a, c) => a + c.price * c.count, 0),
    });
    const [isOpen, setIsOpen] = useState(true);
    const handleChangeInputs = (e) => {
        const { name, value } = e.target;
        setOrder(order => ({ ...order, [name]: value }));
    }

    const submitHandler = (e) => {
        e.preventDefault();
        if (order.cartItems.length > 0) {
            dispatch(createOrderAction(order));
        }
        else {
            alert('cart items empty')
        }
    }
    const closeModal = () => {
        setIsOpen(false);
    }

    useEffect(() => {
        if (OrderFromStore.order && isOpen === false) {
            if (OrderFromStore.order.userId) {
                window.location.reload(false);
            }
        }
    }, [OrderFromStore.order, isOpen])

    return (
        <>
            <div className="container">
                <div className="row">
                    <div className="col-md-4 order-md-2 mb-4">
                        <h4 className="d-flex justify-content-between align-items-center mb-3">
                            <span className="text-muted">Shopping Cart</span>
                            <span className="badge badge-secondary badge-pill">{CartFromStore.cartItems.length}</span>
                        </h4>
                        <ul className="list-group mb-3">
                            {CartFromStore.cartItems.map(product => (
                                <>
                                    <li key={product._id} className="list-group-item d-flex justify-content-between lh-condensed">
                                        <div>
                                            <h6 className="my-0">{product.name}</h6>
                                        </div>
                                        <span className="text-muted">{formatCurrency(product.price)}X{product.count}</span>
                                    </li>
                                </>
                            ))}

                            <li key={"1"} className="list-group-item d-flex justify-content-between">
                                <span>Total Price:</span>
                                <strong>{formatCurrency(CartFromStore.cartItems.reduce((a, c) => a + c.price * c.count, 0).toFixed(2))}</strong>
                            </li>
                        </ul>
                    </div>
                    <div className="col-md-8 order-md-1">
                        <h4 className="mb-3">Billing address</h4>
                        <form onSubmit={submitHandler} >
                            <div className="row">
                                <div className="col-md-6 mb-3">
                                    <lable htmlFor="firstName">First Name</lable>
                                    <input type="text" className="form-control" id="firstName" name="firstName" onChange={handleChangeInputs} required />
                                </div>
                                <div className="col-md-6 mb-3">
                                    <lable htmlFor="lastName">Last Name</lable>
                                    <input type="text" className="form-control" id="lastName" name="lastName" onChange={handleChangeInputs} required />
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-6 mb-3">
                                    <label htmlFor="emailAddress">Email<span className="text-muted small "> (This email will be used to send a receipt for the order)</span></label>
                                    <input type="email" className="form-control" id="emailAddress" name="emailAddress" onChange={handleChangeInputs} required />
                                </div>
                                <div className="col-md-6 mt-2">
                                    <lable htmlFor="phoneNumber">Phone Number</lable>
                                    <input type="tel" className="form-control" id="phoneNumber" name="phoneNumber" pattern="[0-9]{3}[0-9]{3}[0-9]{4}" placeholder="0501231234" onChange={handleChangeInputs} required />
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-6 mt-2 mb-3">
                                    <lable htmlFor="city">City</lable>
                                    <input type="text" className="form-control" id="city" name="city" onChange={handleChangeInputs} required />
                                </div>
                                <div className="col-md-6 mb-3 ">
                                    <label htmlFor="address">Adress</label>
                                    <input type="text" className="form-control" id="address" name="address" onChange={handleChangeInputs} placeholder="1234 Main St" required />
                                </div>
                            </div>

                            <hr className="mb-4" />
                            {OrderFromStore.order && (
                                <>
                                    {OrderFromStore.order._id ? (
                                        <Modal isOpen={isOpen}
                                            onRequestClose={closeModal}
                                            style={customStyles}
                                            ariaHideApp={false}
                                        >
                                            < Zoom >
                                                <button className="btn btn-danger" onClick={() => { closeModal() }}>x</button>
                                                <div className="container pt-2 pt-md-4 px-md-5">
                                                    <div className="row justify-content-center">
                                                        <div width="50px" height="50px" className="bg-dark">
                                                            <img src="https://res.cloudinary.com/dorromano/image/upload/v1614711964/ezgif.com-gif-maker_5_ap2dgu.webp" alt="Men's Beard" width="50px" height="50px" />
                                                        </div>

                                                    </div>
                                                    <table className="table table-borderless">
                                                        <tbody>
                                                            <tr>
                                                                <td className="border-0">
                                                                    <div className="row">
                                                                        <div className="col-md text-center text-md-left mb-3 mb-md-0">
                                                                            <h2 className="mb-1"><strong>Men's Bread</strong></h2>
                                                                            <p> 787 Brunswick, Los Angeles, CA 50028</p>
                                                                            <p> support@Men'sBeard.com / 4444 555 555</p>
                                                                            <strong>www.Men'sBeard.com</strong>
                                                                        </div>
                                                                        <div className="col text-center text-md-right">
                                                                            <span className="d-none d-md-block">
                                                                                <h1>Billed To</h1>
                                                                            </span>
                                                                            <h4 className="mb-0">{OrderFromStore.order.name}</h4>
                                                                            <h6>  {OrderFromStore.order.firstName} {OrderFromStore.order.lastName}</h6>
                                                                            <h6>  {OrderFromStore.order.address},{OrderFromStore.order.city}</h6>
                                                                            <h6>{OrderFromStore.order.email}</h6>
                                                                            <h6>{OrderFromStore.order.phoneNumber}</h6>
                                                                            <h5 className="mb-0 mt-3">{new Date(OrderFromStore.order.createdAt).toString()}</h5>
                                                                        </div>
                                                                    </div>
                                                                </td>
                                                            </tr>
                                                        </tbody>
                                                    </table>
                                                    <table className="table">
                                                        <thead>
                                                            <tr>
                                                                <th>Summary</th>
                                                                <th className="text-right">Price</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            {OrderFromStore.order.cartItems.map((x) => (
                                                                <tr key={x._id}>
                                                                    <td>
                                                                        {x.count} {"*"} {x.name}
                                                                    </td>
                                                                    <td className="font-weight-bold align-middle text-right text-nowrap">{formatCurrency(x.price * x.count)}</td>
                                                                </tr>
                                                            ))}
                                                            <tr>
                                                                <td className="text-right border-0 pt-4 colspan-2">
                                                                    <h5>Total: {formatCurrency(OrderFromStore.order.totalPrice)}</h5>
                                                                </td>
                                                            </tr>
                                                        </tbody>
                                                    </table>
                                                </div>
                                            </Zoom>
                                        </Modal>
                                    ) : (
                                        <>
                                            <h3 className="alert-danger">{OrderFromStore.order}</h3>
                                            <hr className="mb-4" />
                                        </>
                                    )
                                    }
                                </>
                            )
                            }
                            <button className="btn btn-primary btn-lg btn-block mb-3" type="submit">Pay</button>
                        </form>
                    </div>
                </div>
            </div>

        </>
    )
}

export default Checkout;