import React, { useState, useEffect } from "react";
import { useSelector } from 'react-redux';
import { baseUrl } from "../../utils";

const Users = () => {
    const adminFromStore = useSelector(state => state.AdminReducer);
    const [contacts, setContacts] = useState([]);
    const [subscribes, setSubscribes] = useState([]);

    useEffect(() => {
        fetch(`${baseUrl}/api/user/subscribes`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                'Accept': 'application/json'
            },
        }).then((res) => res.json())
            .then((data) => {
                if (data) {
                    setSubscribes(data);
                }
            });
        fetch(`http://localhost:5000/api/user/contacts`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        }).then((res) => res.json())
            .then((data) => {
                if (data) {
                    setContacts(data);
                }
            })
    }, [])



    return (
        <>
            <div className="container-fluid vh-100">
                <div className="table-responsive">
                    <h1>All Users</h1>
                    <table className="table table-sm table-striped table-light col">
                        <thead className="thead-dark">
                            <tr>
                                <th scope="col">User ID</th>
                                <th scope="col">Name</th>
                                <th scope="col">Email</th>
                                <th scope="col">Created At</th>
                            </tr>
                        </thead>
                        <tbody>
                            {adminFromStore.users && (
                                <>


                                    {adminFromStore.users.map((user) => (
                                        <tr key={user._id}>
                                            <td>{user._id}</td>
                                            <td>{user.firstName} {user.lastName}</td>
                                            <td>{user.emailAddress}</td>
                                            <td>{new Date(user.createdAt).toString()}</td>
                                        </tr>
                                    ))}
                                </>
                            )}
                        </tbody>
                    </table>
                </div>
                <div className="table-responsive">
                    <h1>Contacts</h1>
                    <table className="table table-sm table-striped table-light col">
                        <thead className="thead-dark">
                            <tr>
                                <th scope="col">Name</th>
                                <th scope="col">Email</th>
                                <th scope="col">Subject</th>
                                <th scope="col">Message</th>
                                <th scope="col">Created At</th>
                            </tr>
                        </thead>
                        <tbody >
                            {contacts.map((contact) => (
                                <tr key={contact.name}>
                                    <td>{contact.name}</td>
                                    <td>{contact.emailAddress}</td>
                                    <td>{contact.subject}</td>
                                    <td>{contact.message}</td>
                                    <td>{new Date(contact.createdAt).toDateString()}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <div className="table-responsive">
                    <h1>Subscribes</h1>
                    <table className="table table-sm table-striped table-light col">
                        <thead className="thead-dark">
                            <tr>
                                <th scope="col">Email</th>
                                <th scope="col">Created At</th>
                            </tr>
                        </thead>
                        <tbody >
                            {subscribes.map((subscribe) => (
                                <tr key={subscribe.emailAddress}>
                                    <td>{subscribe.emailAddress}</td>
                                    <td>{new Date(subscribe.createdAt).toDateString()}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    )
}

export default Users;