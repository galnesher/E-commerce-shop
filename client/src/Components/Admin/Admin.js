import React, { useEffect } from "react"
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
} from "react-router-dom";
import Dashboard from "../Dashoard/Dashboard";
import Orders from "../Orders/Orders";
import UploadProduct from "../UploadProduct/UploadProduct";
import UploadCategory from '../UploadCategory/UploadCategory';
import { checkUserRoleAction, getAllOrdersAction, getAllUsersAction } from "../../Redux/Action/adminAction";
import { useSelector, useDispatch } from 'react-redux';
import Users from "../Users/Users";
import DeleteProduct from "../DeleteProduct/DeleteProduct";


const Admin = () => {
    const adminFromStore = useSelector(state => state.AdminReducer);
    const dispatch = useDispatch();
    const userFromStore = useSelector(state => state.UserReducer);

    useEffect(() => {
        if (userFromStore) {
            if (userFromStore.isLogged === true) {
                dispatch(checkUserRoleAction());
                if (adminFromStore.isAdmin === true) {
                    dispatch(getAllUsersAction());
                    dispatch(getAllOrdersAction());
                }
            }
        }
    }, [adminFromStore.isAdmin, dispatch, userFromStore])




    return (
        <>
            {adminFromStore.isAdmin === true ? (
                <Router>
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-sm-2 bg-dark">
                                <div className="text-white mt-3">
                                    <Link to="/admin"><h2 className="text-white">Dashboad</h2></Link>
                                    <hr className="bg-light"></hr>
                                </div>
                                <ul className="list-group ">
                                    <li className="list-group-item"><Link className="text-dark" to="/admin/orders">Orders</Link></li>
                                    <li className="list-group-item"><Link className="text-dark" to="/admin/users">Users</Link></li>
                                    <li className="list-group-item">
                                        <button className="btn btn-sm dropdown-toggle" type="button" data-toggle="dropdown">Products
                       <span className="caret"></span></button>
                                        <ul className="dropdown-menu">
                                            <li><Link className="text-dark" to="/admin/uploadcategory">Upload Category</Link></li>
                                            <li><Link className="text-dark" to="/admin/uploadproduct">Upload Products</Link> </li>
                                            <li><Link className="text-dark" to="/admin/deleteproduct">Delete Products</Link></li>
                                        </ul>
                                    </li>
                                </ul>
                            </div>
                            <div className="col-sm-10">
                                <Switch>
                                    <Route path="/admin/orders">
                                        <Orders orders={adminFromStore.orders} />
                                    </Route>
                                    <Route path="/admin/users">
                                        <Users users={adminFromStore.users} />
                                    </Route>
                                    <Route path="/admin/uploadcategory">
                                        <UploadCategory />
                                    </Route>
                                    <Route path="/admin/uploadproduct">
                                        <UploadProduct />
                                    </Route>
                                    <Route path="/admin/deleteproduct">
                                        <DeleteProduct />
                                    </Route>
                                    <Route exact path="/admin">
                                        <Dashboard orders={adminFromStore.orders} />
                                    </Route>
                                </Switch>
                            </div>
                        </div>
                    </div>
                </Router>
            ) : (
                <div className="alert-danger">
                    <h1>Sorry You are not Admin..</h1>
                </div>
            )}
        </>

    )

}

export default Admin;