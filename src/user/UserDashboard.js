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
import {ProdDialog} from "./ProductDialog";

const Dashboard =() => {
    const [categoryWin, setCategoryWin] =useState();
    const [productWin, setProductWin] =useState();
    return(
        <>
    <GlobalStyle/>
    <CatDialog/>
    <FoodDialog/>
    <CatDialog categoryWin={categoryWin} setCategoryWin={setCategoryWin}/>
    <ProdDialog productWin={productWin} setProductWin={setProductWin}/>
    <Navbar/>
    <Banner/>
    <DashHelper setCategoryWin={setCategoryWin} setProductWin={setProductWin}/>
   </>
    );
}
export default Dashboard;