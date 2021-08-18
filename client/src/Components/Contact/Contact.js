import React, { useState } from "react";
import { baseUrl } from '../../utils';

const Contact = () => {
    const [success, setSuccess] = useState(null);
    const [error, setError] = useState(null);
    const [contact, setContact] = useState({
        name: '',
        emailAddress: '',
        subject: '',
        message: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setContact(contact => ({ ...contact, [name]: value }));
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        await fetch(`${baseUrl}/api/user/contact`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                'Accept': 'application/json'
            },
            body: JSON.stringify(contact),
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
        <>
            <section className="mb-4">
                <h2 className="h1-responsive font-weight-bold text-center my-4">Contact us</h2>
                <p className="text-center w-responsive mx-auto mb-5">Do you have any questions? Please do not hesitate to contact us directly. Our team will come back to you within
          a matter of hours to help you.</p>
                <div className="row">
                    <div className="col-md-9 mb-md-0 mb-5">
                        <form onSubmit={handleSubmit}>
                            <div className="row">
                                <div className="col-md-6">
                                    <div className="md-form mb-0">
                                        <label htmlFor="name" >Your name</label>
                                        <input type="text" id="name" name="name" className="form-control" onChange={handleChange} required />
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="md-form mb-0">
                                        <label htmlFor="email" >Your email</label>
                                        <input type="text" id="email" name="emailAddress" className="form-control" onChange={handleChange} required />
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-12">
                                    <div className="md-form mb-0">
                                        <label htmlFor="subject" >Subject</label>
                                        <input type="text" id="subject" name="subject" className="form-control" onChange={handleChange} required />
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-12">
                                    <div className="md-form">
                                        <label htmlFor="message">Your message</label>
                                        <textarea type="text" id="message" name="message" rows={2} className="form-control md-textarea" defaultValue={""} onChange={handleChange} required />
                                    </div>
                                </div>
                            </div>
                            {success && (
                                <h3 className="text-success" >{success}</h3>
                            )}
                            {error && (
                                <h3 className="text-danger" >{error}</h3>
                            )}
                            <div className=" mt-3 text-center text-md-left">
                                <button type="submit" className="btn btn-lg btn-primary">Send</button>
                            </div>
                        </form>
                        <div />
                    </div>
                    <div className="col-md-3 text-center">
                        <ul className="list-unstyled mb-0">
                            <li key={'1'}><i className="fas fa-map-marker-alt fa-2x" />
                                <p>San Francisco, CA 94126, USA</p>
                            </li>
                            <li key={'2'}><i className="fas fa-phone mt-4 fa-2x" />
                                <p>+ 01 234 567 89</p>
                            </li>
                            <li key={'3'}><i className="fas fa-envelope mt-4 fa-2x" />
                                <p>contact@mdbootstrap.com</p>
                            </li>
                        </ul>
                    </div>
                </div>
            </section>
        </>
    )
}
export default Contact;