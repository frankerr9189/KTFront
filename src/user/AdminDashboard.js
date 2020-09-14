import React, {useState} from 'react';
import {Navbar} from '../Navar/Navbar';
import {Banner} from "../Banner/Banner";
import {GlobalStyle} from "../Styles/GlobalStyle";
import {FoodDialog} from "../FoodDialog/FoodDialog";
import styled from "styled-components";
import {DashHelper} from "./dashboardhelper";
import {CatDialog} from "./CategoryDialog";
import {ProdDialog} from "./ProductDialog";
import {ProdUpdateDialog} from "./ProductUpdate";
import {Link} from 'react-router-dom';

export const DialogContent = styled.div`
overflow: auto; 
height: 100px;
padding-top: 150px;
padding-bottom: 80px;
`;


const AdminDashboard =() => {
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
    <Banner>
      <DialogContent>
    <Link
           style={{cursor: "pointer", color: "#ffffff"}}
           className="nav-link" 
           to="/"
           >
           Online Ordering
           </Link>
           </DialogContent>
           </Banner>
    <DashHelper setCategoryWin={setCategoryWin} setProductWin={setProductWin} setProductUpdate={setProductUpdate} />
   </>
    );
}
export default AdminDashboard;