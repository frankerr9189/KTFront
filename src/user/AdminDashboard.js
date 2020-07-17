import React from 'react';
import {Navbar} from '../Navar/Navbar';
import {Banner} from "../Banner/Banner";
import {GlobalStyle} from "../Styles/GlobalStyle";
import {FoodDialog, Dialog} from "../FoodDialog/FoodDialog";
import styled from "styled-components";
import {Title} from "../Styles/title";
import {isAuthenticated} from "../auth";
import {Link} from 'react-router-dom';
import {Food, FoodGrid, FoodLabel} from "../Menu/FoodGrid";
import {DashHelper} from "./dashboardhelper";


const AdminDashboard =() => {

    const {user} = isAuthenticated();

    const userLinks = () =>{
        return (
            <div>
                <h1>User Links</h1>
                <ul>
                    <Link className="nav-link" to="/profile/update">Update Profile</Link>
                </ul>
            </div>
        )
    }

    const userInfo = () => {
        return (
<div>
        <h3>User Information</h3>
    <ul>
    <li>Name: {user.name}</li>
    <li>Email: {user.email} </li>
    <li>Role: {user.role === 1? 'Admin' : "Registered User"}</li>
     </ul>   
</div>
        )
    }

    return(
        <>
    <GlobalStyle/>
    <FoodDialog/>
    <Navbar/>
    <Banner/>
    <DashHelper/>
    <div className="container-fluid"></div>
    <div className="row">
        <div className="col-3">
            {userLinks()}
        </div>
        <div className="col-9">
            {userInfo()}
        </div>
    </div>
   </>
    )
}
export default AdminDashboard;