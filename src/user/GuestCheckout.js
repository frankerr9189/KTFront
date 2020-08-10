import React from 'react';
import {Navbar} from '../Navar/Navbar';
import {Banner} from "../Banner/Banner";
import {GlobalStyle} from "../Styles/GlobalStyle";
import {FoodDialog} from "../FoodDialog/FoodDialog";
import {useOpenFood} from "../Hooks/useOpenFood";
import {useOrders} from "../Hooks/useOrders";
import {useTitle} from "../Hooks/useTitle";
import {CheckoutStyled} from "./CheckoutStyled";
import {Link} from 'react-router-dom';
import styled from 'styled-components';

export const DialogContent = styled.div`
overflow: auto; 
height: 100px;
padding-top: 150px;
padding-bottom: 80px;
`;


function GuestCheckout() {
  const openFood = useOpenFood();
  const orders = useOrders();
  useTitle({...openFood, ...orders});

  return (
    <>
    <GlobalStyle/>
    <FoodDialog {...openFood}{...orders}/>
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
    <CheckoutStyled/>
   </>
  );
}

export default GuestCheckout;
