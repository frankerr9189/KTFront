import React, {useState, useEffect} from 'react';
import {Navbar} from '../Navar/Navbar';
import {Banner} from "../Banner/Banner";
import {GlobalStyle} from "../Styles/GlobalStyle";
import styled from 'styled-components';
import {DialogContent, DialogFooter, ConfirmButton} from "../FoodDialog/FoodDialog";

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    paper: {
      padding: theme.spacing(2),
      textAlign: 'center',
      color: theme.palette.text.secondary,
    },
  }));


const OrderStyled = styled.div`
position: fixed;
right: 0px;
top: 57px;
width: 30%;
background-color: white;
height: calc(100% - 48px);
z-index: 10;
box-shadow: 4px 0px 5px 4px grey;
display: flex;
flex-direction: column;
@media (max-width: 700px){
    width: 45%;}
`;

const OrderContent = styled(DialogContent)`
padding: 20px;
height: 100%;
width: calc(100% - 48px);
display: flex;
flex-direction: column;
`;

const OrderContainer = styled.div`
    padding: 10px 0px;
    border-bottom: 1px solid grey;
    ${({editable}) =>
editable ? `
&:hover {
    cursor: pointer;
    background-color: #e7e7e7;
}
`
    : `
    pointer-events: none;
    `}
`;

const OrderItem = styled.div`
    padding: 10px 0px;
    display: grid;
    grid-template-columns: 20px 150px 20px 60px;
    justify-content: space-between;
    width = 100%;
`;

const DetailItem = styled.div`
    color: gray;
    font-size: 10px;
    display: flex;
flex-direction: column;
`

function refreshPage() {
    window.location.reload(false);
  }

function ThankYou() {
    
    return (
        <>
    <GlobalStyle/>
    <Navbar/>
    <Banner/>
        <html>
  <head><title>Thanks for your order!</title></head>
  <body>
    <h1>Thanks for your order!</h1>
    <p>
      We appreciate your business!
      If you have any questions, please email
      <a href="mailto:orders@example.com">orders@example.com</a>.
    </p>
  </body>
</html>
</>
    )
};

export default ThankYou;
