import React from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import Signup from './user/Signup';
import Signin from './user/Signin';
import App from './App';
import PrivateRoute from './auth/PrivateRoute';
import AdminRoute from './auth/AdminRoute';
import Dashboard from './user/UserDashboard';
import BossDashboard from './user/BossDashboard';

const Routes = () =>{
    return (
        <BrowserRouter>
        <Switch>
            <Route path="/signin" exact component={Signin}/>
            <Route path="/signup" exact component={Signup}/>
            <Route path="/" exact component={App}/>
            <PrivateRoute path="/dashboard" exact component={Dashboard}/>
            <AdminRoute path="/boss/dashboard" exact component={BossDashboard}/>
        </Switch>
        </BrowserRouter>
    );
};

export default Routes;