import React, { useState } from "react";
import { useSelector } from 'react-redux';
import { baseUrl } from "../../utils";
import {
    Link,
} from "react-router-dom";
const Footer = () => {
    const [emailAddress, setEmailAddress] = useState();
    const [success, setSuccess] = useState(null);
    const [error, setError] = useState(null);
    const adminFromStore = useSelector(state => state.AdminReducer);



    const handleChange = (e) => {
        const { name, value } = e.target;
        setEmailAddress({ [name]: value.toLowerCase() });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        await fetch(`${baseUrl}/api/user/subscribe`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                'Accept': 'application/json'
            },
            body: JSON.stringify(emailAddress),
        }).then((res) => res.json())
            .then((data) => {
                if (data.success) {
                    setSuccess(data.success.message)
                } else {
                    setError(data.error.message)
                }
            })
    }

    return (
        <footer className="bg-dark text-center text-white">
            <div className="container p-4">
                <section>
                    <form onSubmit={handleSubmit}>
                        <div className="row d-flex justify-content-center">
                            <div className="col-auto">
                                <p className="pt-2">
                                    <strong>Sign up for our newsletter</strong>
                                </p>
                            </div>
                            <div className="col-md-5 col-12">
                                <div className="form-outline form-white mb-4">
                                    <input type="email" id="form5Example2" className="form-control" name="emailAddress" placeholder="Email address" onChange={handleChange} />
                                    {success ? (
                                        <h6 className="text-success" >{success}</h6>
                                    ) : (
                                        <>
                                            {error && (
                                                <h6 className="text-danger" >{error}</h6>
                                            )}
                                        </>
                                    )}

                                </div>
                            </div>
                            <div className="col-auto">
                                <button type="submit" className="btn btn-outline-light mb-4"  >
                                    Subscribe
                            </button>
                            </div>
                        </div>
                    </form>
                </section>
                <section >
                    <div className="row">
                        <div className="col-lg-3 col-md-6 mb-4 mb-md-0">
                            <h5 className="text-uppercase">For users</h5>
                            <ul className="list-unstyled mb-0">
                                <li>
                                    <Link to="/login" className="text-white">User Login</Link>
                                </li>
                                <li>
                                    <Link to="/register" className="text-white">User Register</Link>
                                </li>
                                <li>
                                    <Link to="/myorders" className="text-white">My Orders</Link>
                                </li>
                            </ul>
                        </div>
                        {adminFromStore.isAdmin === true && (
                            <div className="col-lg-3 col-md-6 mb-4 mb-md-0">
                                <h5 className="text-uppercase">For Admin</h5>
                                <ul className="list-unstyled mb-0">

                                    <li>
                                        <Link to="/admin" className="text-white">Dashboard</Link>
                                    </li>
                                    <li>
                                        <div class="dropdown">
                                            <span class=" dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                Product Actions
                                            </span>
                                            <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                                <Link className="dropdown-item" to="/admin/uploadproduct">Upload Product</Link>
                                                <Link className="dropdown-item" to="/admin/uploadcategory">Upload Category</Link>
                                                <Link className="dropdown-item" to="/admin/deleteproduct">Delete Products</Link>                                            </div>
                                        </div>
                                    </li>
                                    <li>
                                        <Link to="/admin/orders" className="text-white">Orders</Link>
                                    </li>
                                    <li>
                                        <Link to="/admin/users" className="text-white">Users</Link>
                                    </li>

                                </ul>
                            </div>
                        )}
                    </div>
                </section>
            </div>
            <div className="text-center p-3" style={{ backgroundColor: 'rgba(0, 0, 0, 0.2)' }}>
                © 2021 Copyright:{" "}
                <span className="text-white">Dor Romano</span>
            </div>
        </footer>
    );
}

export default Footer;