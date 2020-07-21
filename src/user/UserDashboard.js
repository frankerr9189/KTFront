import React, {useState} from 'react';
import {Navbar} from '../Navar/Navbar';
import {Banner} from "../Banner/Banner";
import {GlobalStyle} from "../Styles/GlobalStyle";
import {FoodDialog, Dialog} from "../FoodDialog/FoodDialog";
import styled from "styled-components";
import {Title} from "../Styles/title";
import {isAuthenticated} from "../auth";
import {DashHelper} from "./dashboardhelper";
import {CatDialog} from "./CategoryDialog";
import {ProdDialog} from "./ProductDialog";
import {ProdUpdateDialog} from "./ProductUpdate";


const Dashboard =() => {
    const [categoryWin, setCategoryWin] =useState();
    const [productWin, setProductWin] =useState();
    const [productUpdate, setProductUpdate]=useState();

    return(
        <>
    <GlobalStyle/>
    <CatDialog/>
    <FoodDialog/>
    <CatDialog categoryWin={categoryWin} setCategoryWin={setCategoryWin}/>
    <ProdDialog productWin={productWin} setProductWin={setProductWin}/>
    <ProdUpdateDialog productUpdate={productUpdate} setProductUpdate={setProductUpdate}/>
    <Navbar/>
    <Banner/>
    <DashHelper setCategoryWin={setCategoryWin} setProductWin={setProductWin} setProductUpdate={setProductUpdate} />
   </>
    );
}
export default Dashboard;