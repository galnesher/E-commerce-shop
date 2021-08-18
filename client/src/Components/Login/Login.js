import React, { useState } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { Redirect } from "react-router-dom";
import { loginAction } from "../../Redux/Action/userActions";
import './login.css';

const Login = () => {
    const [user, setUser] = useState({
        emailAddress: '',
        password: '',
    });
    const dispatch = useDispatch();
    const userFromStore = useSelector(state => state.UserReducer);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUser(user => ({ ...user, [name]: value.toLowerCase() }));
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (user.emailAddress && user.password) {
            dispatch(loginAction(user))
        }
    }

    return (
        <>
            {userFromStore.user === 'Unverified User' && (
                <>
                    < Redirect to='/verify' />
                    <h3>You Need To Verify Code</h3>
                </>
            )}
            {userFromStore.isLogged ? (
                <Redirect to="/" />
            ) : (
                <>
                    <div className="container vh-100">
                        <div className="row justify-content-center mt-5">
                            <h1>Login</h1>
                        </div>
                        <div className="row mt-5">
                            <form onSubmit={handleSubmit} className="mx-auto" >
                                <div className="form-group">
                                    <label htmlFor="emailAddress">Email</label>
                                    <input type="text" className="form-control" name="emailAddress" id="emailAddress" onChange={handleChange} placeholder="example@example.com" required />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="password">Password</label>
                                    <input type="password" className="form-control" id="password" name="password" onChange={handleChange} required />
                                </div>
                                {userFromStore.user && (
                                    <>
                                        {userFromStore.user._id ? (
                                            <>
                                                <h5 className="alert-success">Login Success</h5>
                                            </>
                                        ) : (
                                            <>
                                                <h5 className="alert-danger">{userFromStore.user}</h5>
                                            </>
                                        )}
                                    </>
                                )}
                                <button type="submit" className="btn btn-success">Login</button>
                            </form>
                        </div>
                    </div>
                </>
            )}
        </>
    );
}


export default Login;