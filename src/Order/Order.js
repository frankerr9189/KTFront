import React, {useState, useEffect} from 'react';
import {Redirect, Link} from 'react-router-dom';
import styled from 'styled-components';
import {DialogContent, DialogFooter, ConfirmButton} from "../FoodDialog/FoodDialog";
import {formatPrice} from "../Data/FoodData";
import {getPrice} from "../FoodDialog/FoodDialog";
import {removeItem, getCart} from "../Cart/carthelper";
import {signin, authenticate} from '../auth';

  
const OrderStyled = styled.div`
position: fixed;
right: 0px;
top: 57px;
width: calc(27% - 48px);
background-color: white;
height: calc(100% - 48px);
z-index: 10;
box-shadow: 4px 0px 5px 4px grey;
display: flex;
flex-direction: column;
`;

const OrderContent = styled(DialogContent)`
padding: 20px;
height: 100%
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
`;

const DetailItem = styled.div`
    color: gray;
    font-size: 10px;
`

function refreshPage() {
    window.location.reload(false);
  }

export function Order({orders, setOrders, setOpenFood}) {
    const [items, setItems] = useState([]);
    const subtotal = items.reduce((total, order) => {
        return total + getPrice(order);
    }, 0);
    const tax = subtotal * 0.07;
    const processingFee = (tax + subtotal) * 0.05;
    const total = subtotal + tax + processingFee;
    const [run, setRun] = useState(false);
    const [user, setUser] = useState({
        email: "guest@guest.com",
        password: "Franslk1",
        error: "",
        loading: false,
        redirectToReferrer: false,
    });

    const {email, password, loading, error, redirectToReferrer} = user;

    const clickSubmit = event => {
        event.preventDefault();
        setUser({...user, error: false, loading: true});
        signin({email, password})
        .then(data => {
            if(data.error) {
                setUser({...user, error: data.error, loading: false});
            } else {
                authenticate(data, () => {
                    setUser({
                        ...user,
                        redirectToReferrer: true
                    });
                    refreshPage()
                });
            }
        });
    };

    const redirectUser = () => {
        if(redirectToReferrer){
            return <Redirect to="/checkout"/>;
        }
    };

    useEffect(()=> {
        setItems(getCart());
        console.log(items);
    }, [run]);

    const deleteItem= (index) => {
        const newOrders = [...orders];
        newOrders.splice(index, 1);
        setOrders(newOrders);
        
    }

    return <OrderStyled>
    {items.length === 0 ?<OrderContent>Your cart is empty...
        </OrderContent> : 
        <OrderContent>
            {" "}
            <OrderContainer>
            You have {items.length} item(s) in your cart.
            </OrderContainer>
            {" "}
            {items.map((order, index) => (
                <OrderContainer editable>
                    <OrderItem
                    onClick={() => {
                        setOpenFood({...order, index});

                    }}
                    >
                        <div>{order.quantity}</div>
                        <div>{order.name}</div>
                        <div 
                        style={{cursor: 'pointer'}} 
                        onClick={e =>{
                            e.stopPropagation();
                            deleteItem(index);removeItem(order._id);refreshPage()}}>🗑</div>
            <div>{formatPrice(getPrice(order))}</div>
                    </OrderItem>
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
            <ConfirmButton>
                <Link to="/checkout">
                Checkout </Link>
            </ConfirmButton>
            <ConfirmButton>
                <Link to="/checkout"
                onClick={clickSubmit}
                >
                Guest Checkout </Link>
                {redirectUser()}
            </ConfirmButton>
            
        </DialogFooter>
    </OrderStyled>
}