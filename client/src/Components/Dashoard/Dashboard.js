// import React, { useState, useEffect, useMemo } from "react";
import { formatCurrency } from "../../utils";
import { Line } from "react-chartjs-2";
import { useSelector } from 'react-redux';


const Dashboard = () => {
    const adminFromStore = useSelector(state => state.AdminReducer);
    let ordersByMonth = [];
    let revenueByMonth = [];
    const data = {
        labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "July", "Aug", "Sep", "Oct", "Nov", "Dec"],
        datasets: [
            {
                label: "Orders By Month",
                data: ordersByMonth,
                fill: true,
                backgroundColor: "rgba(75,192,192,0.2)",
                borderColor: "rgba(75,192,192,1)"
            },
            {
                label: "Revenue By Month",
                data: revenueByMonth,
                fill: false,
                borderColor: "#742774"
            }
        ]
    };

    if (adminFromStore.orders) {
        for (let i = 0; i < data.labels.length; i++) {
            let sumOrdersEachMonth = 0;
            let sumRevenueByMonth = 0
            for (let j = 0; j < adminFromStore.orders.length; j++) {
                let jDate = new Date(adminFromStore.orders[j].createdAt)
                let jMonth = jDate.getMonth();
                if (jMonth === i) {
                    sumOrdersEachMonth++;
                    sumRevenueByMonth += adminFromStore.orders[j].totalPrice;
                    revenueByMonth[i] = sumRevenueByMonth;
                    ordersByMonth[i] = sumOrdersEachMonth;
                }
            }
        }
    }

    return (
        <>
            <div className="container">
                <div className="row">
                    <div className="card-columns mt-3">
                        {adminFromStore.orders && (
                            <>
                                <div className="card bg-primary ">
                                    <div className="cart-title ml-2 mt-2">
                                        <h2>Revenue</h2>
                                    </div>
                                    <div className="card-body text-center">
                                        <h4 className="card-text">{formatCurrency(adminFromStore.orders.reduce((accumulator, order) => accumulator + order.totalPrice, 0).toFixed(2))}</h4>
                                    </div>
                                </div>
                                <div className="card bg-warning ">
                                    <div className="cart-title ml-2 mt-2">
                                        <h2>Total Sales</h2>
                                    </div>
                                    <div className="card-body text-center">
                                        <h4 className="card-text">{adminFromStore.orders.length}</h4>
                                    </div>
                                </div>
                            </>
                        )}
                        <div className="card bg-success">
                            <div className="cart-title ml-2 mt-2">
                                <h2>Users</h2>
                            </div>
                            <div className="card-body text-center">
                                {adminFromStore.users && (
                                    <h4 className="card-text">{adminFromStore.users.length}</h4>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <Line data={data} />
                </div>
            </div>
        </>
    )
}

export default Dashboard;