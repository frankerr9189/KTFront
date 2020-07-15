import React from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import Signup from './Signup';
import Signin from './Signin';
import App from '../App';

const Routes = () =>{
    return (
        <BrowserRouter>
        <Switch>
            <Route path="/signin" exact component={Signin}/>
            <Route path="/signup" exact component={Signup}/>
            <Route path="/" exact component={App}/>
        </Switch>
        </BrowserRouter>
    );
};

export default Routes;