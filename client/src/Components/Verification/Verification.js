import React, { useState } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { verificationCodeAction } from "../../Redux/Action/userActions";
import { Redirect } from 'react-router-dom';


const Verification = () => {
    const [verificationCode, setverificationCode] = useState('');
    const dispatch = useDispatch();
    const userFromStore = useSelector(state => state.UserReducer);
    const emailAddress = localStorage.getItem('UserEmailAddress')

    const handleChange = (e) => {
        const { name, value } = e.target;
        setverificationCode({ ...verificationCode, [name]: value });
    }




    const handleSubmit = (e) => {
        e.preventDefault();
        if (emailAddress && verificationCode) {
            let detailsToSend = { ...verificationCode, emailAddress: emailAddress }
            if (verificationCode) {
                console.log(detailsToSend);
                dispatch(verificationCodeAction(detailsToSend));
            }
        }
    }

    return (
        <>
            {userFromStore.userVerified === true ? (
                <Redirect to="/login" />

            ) : (
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="">
                            <h2>Email verification:</h2>
                            <h5>Please enter the verification code that we sent to you at the email address :<span> {emailAddress}</span> </h5>
                            <form className="form col-md-8" onSubmit={handleSubmit}>
                                <div className="form-group">
                                    <label htmlFor="verificationCode">Verification Code:</label>
                                    <input className="form-control" type="text" name="verificationCode" id="verificationCode" onChange={handleChange} placeholder="אמת קוד בן 4 ספרות." required />
                                </div>
                                <div>
                                    {userFromStore.userVerified === true && (
                                        <h4 className="alert-success">Well done , you are Verified</h4>
                                    )}
                                    {userFromStore.userVerified === false && (
                                        <h4 className="alert-danger">Worng Code, Please Try Again</h4>
                                    )}
                                </div>

                                <button type="submit" className="btn btn-primary float-left" >Verify code </button>
                            </form>
                        </div>
                    </div>

                </div>
            )}
        </>
    );
}

export default Verification;