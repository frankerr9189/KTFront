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


const Dashboard =() => {

    return(
        <>
    <GlobalStyle/>
    <FoodDialog/>
    <Navbar/>
    <Banner/>
    <DashHelper/>

   </>
    )
}
export default Dashboard;