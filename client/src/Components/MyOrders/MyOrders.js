import React, { useState, useEffect } from "react";
import { baseUrl, formatCurrency } from "../../utils";

const MyOrders = () => {
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        fetch(`${baseUrl}/api/user/myOrders`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ _id: localStorage.getItem('UserId') }),
        }).then((res) => res.json())
            .then((data) => {
                setOrders(data)
            })
    }, [])




    return (
        <>
            <div >
                {!orders ? (
                    <div>אין הזמנות למשתמש זה.</div>
                ) : (
                    <div className="container">
                        <div className="row">
                            <h1 className="col-sm-12">My Orders</h1>
                            <p className="col">Here you can see the orders you have made and be updated on the status of the order.</p>
                        </div>
                        <div className="row ">
                            <table className="table table-responsive table-striped table-dark col" Style={"height: 400px; overflow: scroll;"}>
                                <thead className="thead-dark ">
                                    <tr>
                                        <th>Order ID</th>
                                        <th>Name</th>
                                        <th>City</th>
                                        <th>Address</th>
                                        <th>Email </th>
                                        <th> Products</th>
                                        <th>Price</th>
                                        <th>Status</th>
                                        <th>Created At</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {orders.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).map((order) => (
                                        <tr key={order._id}>
                                            <td>{order._id}</td>
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
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )
                }
            </div>
        </>
    );
}

export default MyOrders;