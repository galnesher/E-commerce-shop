import React, { useEffect } from "react"
import { useDispatch } from 'react-redux';
import Main from './Components/Main/Main';
import Footer from './Components/Footer/Footer';
import { getAllCategoriesAction, getAllProductAction, } from "./Redux/Action/productAction";
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import Nav from "./Components/Nav/Nav";
import { checkUserAction } from "./Redux/Action/userActions";
import Admin from "./Components/Admin/Admin";
import { checkUserRoleAction } from "./Redux/Action/adminAction";
import { useSelector } from 'react-redux';
function App() {
  const dispatch = useDispatch();
  const UserFromStore = useSelector(state => state.UserReducer);

  useEffect(() => {
    dispatch(checkUserAction());
    dispatch(getAllProductAction());
    dispatch(getAllCategoriesAction());
    if (UserFromStore.isLogged === true) {
      dispatch(checkUserRoleAction());
    }
  }, [UserFromStore.isLogged, dispatch]);

  return (
    <>
      <Router>
        <Switch>
          <Route path="/admin">
            <Admin />
          </Route>
          <Route path="/">
            <Nav />
            <Main />
            <Footer />
          </Route>
        </Switch>
      </Router>
    </>
  );

}

export default App;
