import React from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import Signup from './user/Signup';
import Signin from './user/Signin';
import App from './App';
import PrivateRoute from './auth/PrivateRoute';
import AdminRoute from './auth/AdminRoute';
import Dashboard from './user/UserDashboard';
import AdminDashboard from './user/AdminDashboard';
import Checkout from './user/Checkout';
import AdminOrders from './user/AdminOrders';
import stripeAccount from './stripeAccountSetup';
import ThankYou from './user/ThankYouPage';
const Routes = () =>{
    return (
        <BrowserRouter>
        <Switch>
            <Route path="/signin" exact component={Signin}/>
            <Route path="/thankyou" exact component={ThankYou}/>
            <Route path="/signup" exact component={Signup}/>
            <Route path="/accountsetup" exact component={stripeAccount}/>
            <Route path="/" exact component={App}/>
            <PrivateRoute path="/dashboard" exact component={Dashboard}/>
            <Route path="/checkout" exact component={Checkout}/>
            <AdminRoute path="/admindash" exact component={AdminDashboard}/>
            <AdminRoute path="/adminorders" exact component={AdminOrders}/>
        </Switch>
        </BrowserRouter>
    );
};

export default Routes;