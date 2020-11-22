import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import * as actions from '../actionTypes';
import styled from 'styled-components';
import {DialogContent, DialogFooter, ConfirmButton} from "../FoodDialog/FoodDialog";
import {formatPrice} from "../Data/FoodData";
import {Title} from '../Styles/title';
import {getPrice} from "../FoodDialog/FoodDialog";
//import {signin, authenticate} from '../auth';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
//import {API} from "../config";

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

  export const greyConfirmButton = styled(Title)`
  margin: 10px;
  color: white;
  height: 20px;
  border-radius: 5px;
  padding: 10px;
  text-align: center;
  width: 200px;
  cursor: pointer;
  background-color: grey;
  ${({disabled}) => disabled &&
  `
  opacity: .5;
  background-color: grey;
  pointer-events: none;
  `}
  @media (max-width: 700px){
  width: 25%
  }
  `;

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

export function Order({orders, setOrders, setOpenFood}) {
   // const [items, setItems] = useState([]);
    const dispatch = useDispatch();
    const cart = useSelector((state)=>state.cart);
    const subtotal = cart.reduce((total, order) => {
        return total + getPrice(order);
    }, 0);
    const tax = subtotal * 0.07;
    const processingFee = (tax + subtotal) * 0.05;
    const total = subtotal + tax + processingFee;

    // const [user, setUser] = useState({
    //     email: "guest@guest.com",
    //     password: "Franslk1",
    //     error: "",
    //     loading: false,
    //     redirectToReferrer: false,
    // });
    const classes = useStyles(); 

   // const {email, password, loading, error, redirectToReferrer} = user;

    const deleteItem= (index) => {
        const newOrders = [...orders];
        newOrders.splice(index, 1);
        setOrders(newOrders);
    };

    const removeReduxItem = (product) => {
        dispatch({type: actions.RMV_PRODUCT_FROM_CART, payload: product})
    }

    return <OrderStyled>
    {cart.length === 0 ?<OrderContent>Your cart is empty...
        </OrderContent> : 
        <OrderContent>
            {" "}
            <OrderContainer>
            You have {cart.length} item(s) in your cart.
            </OrderContainer>
            {" "}
            {cart.map((order, index) => (
                <OrderContainer editable>
                    <div editable
                        onClick={() => {
                            setOpenFood({...order, index});
                        }}
                        className={classes.root}>
                        <Grid container spacing={4}>
                        <Grid item xs>
                        {order.quantity}</Grid>
                        <Grid item xs>
                        {order.name}</Grid>
                        <Grid item xs 
                        style={{cursor: 'pointer'}} 
                        onClick={e =>{
                            e.stopPropagation();
                            deleteItem(index);removeReduxItem(order._id)}}>🗑</Grid>
            <Grid item xs>
            {formatPrice(getPrice(order))}</Grid>
            </Grid>
            </div>
                    <DetailItem>
                        {order.toppings
                        .filter(t => t.checked)
                        .map(topping => topping.name)
                        .join(", ")
                        }
                    </DetailItem>
                    {order.choice && <DetailItem>{order.choice}
                    </DetailItem>}
                </OrderContainer>
                 ))}
                <OrderContainer>
                    <OrderItem>
                    <div/>
                    <div>Sub-Total:</div>
                    <div>{formatPrice(subtotal)}</div>
                    </OrderItem>
                    <OrderItem>
                    <div/>
                    <div>Tax:</div>
                    <div>{formatPrice(tax)}</div>
                    </OrderItem>
                    <OrderItem>
                    <div/>
                    <div>Processing Fee:</div>
                    <div>{formatPrice(processingFee)}</div>
                    </OrderItem>
                </OrderContainer>
                <OrderContainer>
                    <OrderItem>
                    <div/>
                    <div>Total</div>
                    <div>{formatPrice(total)}</div>
                    </OrderItem>
                </OrderContainer>
           
        </OrderContent>}
        <DialogFooter>
            { cart.length === 0 ? <greyConfirmButton>Add Items</greyConfirmButton>:
            <ConfirmButton>
            <Link to="/checkout">
                Checkout </Link>
            </ConfirmButton>
            }
        </DialogFooter>
    </OrderStyled>
}