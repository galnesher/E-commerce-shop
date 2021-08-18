import React, { useState } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { registerAction } from "../../Redux/Action/userActions";
import { Redirect } from 'react-router-dom';
import { validateConfirmPassword } from "../../utils";

// registerAction
const Register = () => {
    const [user, setUser] = useState({
        firstName: '',
        lastName: '',
        emailAddress: '',
        password: '',
        role: 'User'
    });
    const [confirmPassword, setConfirmPassword] = useState('');
    const dispatch = useDispatch();
    const userFromStore = useSelector(state => state.UserReducer);

    const handleConfirmPassword = (e) => {
        const { value } = e.target;
        setConfirmPassword(value.toLowerCase())
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === 'emailAddress') {
            setUser(user => ({ ...user, [name]: value.toLowerCase() }));
        } else {
            setUser(user => ({ ...user, [name]: value }));
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (user.firstName && user.lastName && user.emailAddress && user.password) {
            //set item need to remove!
            localStorage.setItem('UserEmailAddress', user.emailAddress)
            dispatch(registerAction(user));
        }
    }

    return (
        <>
            <div className="container vh-100 ">
                <div className="row mt-5 justify-content-center">
                    <h1>
                        Signup
                        </h1>
                </div>
                <div className="row justify-content-center mt-5 ">
                    <form onSubmit={handleSubmit} className="col-md-8 row">
                        <div className="col">
                            <div className="form-group">
                                <label htmlFor="firstName">First Name</label>
                                <input type="text" className="form-control" id="firstName" name="firstName" onChange={handleChange} required />
                            </div>
                            <div className="form-group">
                                <label htmlFor="lastName">Last Name</label>
                                <input type="text" id="lastName" className="form-control" name="lastName" onChange={handleChange} required />
                            </div>
                            <div className="form-group">
                                <label htmlFor="emailAddress">Email</label>
                                <input type="email" className="form-control" id="emailAddress" aria-describedby="emailAddress" name="emailAddress" onChange={handleChange} required />
                                <small id="emailAddress" className="form-text text-muted">We will never share your details with anyone else.</small>
                            </div>
                        </div>
                        <div className="col">

                            <div className="form-group">
                                <label htmlFor="password">Password</label>
                                <input type="password" name="password" className="form-control" id="password" onChange={handleChange} required />
                            </div>
                            <div className="form-group">
                                <label htmlFor="confirmPassword">Confirm Password</label>
                                {!validateConfirmPassword(user.password, confirmPassword) && (
                                    <p className="text-danger bold">Please enter identical passwords.</p>
                                )}
                                <input type="password" name="confirmPassword" className="form-control" id="confirmPassword" onChange={handleConfirmPassword} required />
                            </div>
                            {userFromStore.userRegisteration && (
                                <>
                                    {userFromStore.userRegisteration.success ? (
                                        <Redirect to="/verify" />
                                    ) : (
                                        <>
                                            < h5 className="alert-danger">{userFromStore.userRegisteration.error.message}</h5>
                                        </>
                                    )}
                                </>
                            )}
                            <div className="form-group mt-5">
                                <button type="submit" className="btn btn-primary">SignUp</button>
                            </div>

                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}

export default Register;