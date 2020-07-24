import React, {useState} from 'react';
import {Navbar} from '../Navar/Navbar';
import {Banner} from "../Banner/Banner";
import {GlobalStyle} from "../Styles/GlobalStyle";
import {FoodDialog} from "../FoodDialog/FoodDialog";
import {Order} from "../Order/Order";
import {useOpenFood} from "../Hooks/useOpenFood";
import {useOrders} from "../Hooks/useOrders";
import {useTitle} from "../Hooks/useTitle";
import {CheckoutStyled} from "./CheckoutStyled";
import {Cart} from "./cart";
import {getBraintreeClientToken} from "../admin/adminApi";

function Checkout() {
  const openFood = useOpenFood();
  const orders = useOrders();
  useTitle({...openFood, ...orders});

  return (
    <>
    <GlobalStyle/>
    <FoodDialog {...openFood}{...orders}/>
    <Navbar/>
    <Banner/>
    <CheckoutStyled {...openFood}{...orders}/>
   </>
  );
}

export default Checkout;
