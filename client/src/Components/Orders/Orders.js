import React, { useState, useEffect } from "react";
import { formatCurrency } from "../../utils";
import Modal from 'react-modal';
import Zoom from 'react-reveal/Zoom';
import { useSelector } from 'react-redux';

const Orders = () => {
    const [orderModal, setOrderModal] = useState(null);
    const adminFromStore = useSelector(state => state.AdminReducer);

    const openModal = (order) => {
        setOrderModal(order);
    };

    const closeModal = () => {
        setOrderModal(null)
    };



    const changeStatusHandler = async (orderId) => {
        await fetch(`http://localhost:5000/api/order/changestatus`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                'Accept': 'application/json'
            },
            body: JSON.stringify({ _id: orderId }),
        }).then((res) => res.json())
            .then((data) => {
                console.log(data);
                window.location.reload(false);
            })
    }

    useEffect(() => {
        console.log(orderModal);
    }, [orderModal])
    useEffect(() => {
        //Refresh page every 5 min to see new orders
        const timer = setTimeout(() => {
            window.location.reload(false);
        }, 300000);
        return () => clearTimeout(timer);

    }, [])

    return (
        <>
            <div className="w-100 vh-100">
                <h1>Active Orders</h1>
                <div className="row">
                    <table className="table table-sm table-responsive table-striped table-light col " Style="height: 500px; overflow: scroll;" >
                        <thead className="thead-dark">
                            <tr>
                                <th scope="col">Order ID</th>
                                <th scope="col">Name</th>
                                <th scope="col">City</th>
                                <th scope="col">Address</th>
                                <th scope="col">Email</th>
                                <th scope="col">Products</th>
                                <th scope="col">Price</th>
                                <th scope="col">Status</th>
                                <th scope="col">Created At</th>
                                <th scope="col">Actions</th>
                            </tr>
                        </thead>
                        <tbody >
                            {adminFromStore.orders && (
                                <>
                                    {adminFromStore.orders.filter(order => order.status === "Active").sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).map((order) => (
                                        <tr key={order._id}>
                                            <td >{order._id}</td>
                                            <td>{order.firstName} {order.lastName}</td>
                                            <td>{order.city}</td>
                                            <td>{order.address}</td>
                                            <td>{order.emailAddress}</td>
                                            <td>{order.cartItems.map(item => (
                                                <p key={item.name} className="small mute">{item.name},</p>
                                            ))}</td>
                                            <td>{formatCurrency(order.totalPrice)}</td>
                                            <td>{order.status}</td>
                                            <td>{new Date(order.createdAt).toString()}</td>
                                            <td>
                                                <button className=" btn col mb-1" onClick={() => { openModal(order) }}>👀</button>
                                                <button className="btn btn-sm btn-success col" onClick={() => { changeStatusHandler(order._id) }}>Mark as sent</button>
                                            </td>
                                        </tr>
                                    ))}
                                </>
                            )}

                        </tbody>
                    </table>
                </div>
                <div className="w-100">
                    <h1>All Orders</h1>
                    <div className="row">
                        <table className="col table table-sm table-striped table-light table-responsive " Style="height: 500px; overflow: scroll;">
                            <thead className="thead-dark">
                                <tr>
                                    <th scope="col">Order ID</th>
                                    <th scope="col">Name</th>
                                    <th scope="col">City</th>
                                    <th scope="col">Address</th>
                                    <th scope="col">Email</th>
                                    <th scope="col">Products</th>
                                    <th scope="col">Price</th>
                                    <th scope="col">Status</th>
                                    <th scope="col">Created At</th>
                                    <th scope="col">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {adminFromStore.orders && (
                                    <>
                                        {adminFromStore.orders.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).map((order) => (
                                            <tr key={order._id}>
                                                <td>{order._id}</td>
                                                <td>{order.firstName} {order.lastName}</td>
                                                <td>{order.city}</td>
                                                <td>{order.address}</td>
                                                <td>{order.emailAddress}</td>
                                                <td>{order.cartItems.map(item => (
                                                    <p key={item._id} className="small mute">{item.name},</p>
                                                ))}</td>
                                                <td>{formatCurrency(order.totalPrice)}</td>
                                                <td>{order.status}</td>
                                                <td>{new Date(order.createdAt).toString()}</td>
                                                <td>
                                                    <button className=" btn col mb-1" onClick={() => openModal(order)}>👀</button>
                                                    {order.status === "Active" && (
                                                        <button className="btn btn-sm btn-success col" onClick={() => { changeStatusHandler(order._id) }}>Mark as sent</button>
                                                    )}
                                                </td>
                                            </tr>
                                        ))}
                                    </>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            {orderModal && (
                <>
                    <Modal ariaHideApp={false}
                        isOpen={true}
                        onRequestClose={closeModal}>
                        <Zoom >
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
                                                        <h4 className="mb-0">{orderModal.name}</h4>
                                                        <h6>{orderModal.firstName} {orderModal.lastName}</h6>
                                                        <h6>{orderModal.address},{orderModal.city}</h6>
                                                        <h6>{orderModal.email}</h6>
                                                        <h6>{orderModal.phoneNumber}</h6>
                                                        <h5 className="mb-0 mt-3">{new Date(orderModal.createdAt).toString()}</h5>
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
                                        {orderModal.cartItems && (
                                            <>
                                                {orderModal.cartItems.map((x) => (
                                                    <tr key={x._id}>
                                                        <td>
                                                            {x.count} {"*"} {x.name}
                                                        </td>
                                                        <td className="font-weight-bold align-middle text-right text-nowrap">{formatCurrency(x.price * x.count)}</td>
                                                    </tr>
                                                ))}
                                            </>
                                        )}
                                        <tr>
                                            <td className="text-right border-0 pt-4 colspan-2">
                                                <h5>Total: {formatCurrency(orderModal.totalPrice)}</h5>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <button className="btn btn-sm btn-danger col" onClick={closeModal}>close</button>
                        </Zoom>
                    </Modal>
                </>
            )}
        </>
    )
}

export default Orders;