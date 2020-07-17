import React, {useState} from 'react';
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
import {CatDialog} from "./CategoryDialog";

const Dashboard =() => {
    const [categoryWin, setCategoryWin] =useState();
    return(
        <>
    <GlobalStyle/>
    <CatDialog/>
    <FoodDialog/>
    <CatDialog categoryWin={categoryWin} setCategoryWin={setCategoryWin}/>
    <Navbar/>
    <Banner/>
    <div>{categoryWin}</div>
    <DashHelper setCategoryWin={setCategoryWin}/>
   </>
    );
}
export default Dashboard;