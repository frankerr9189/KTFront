import React from 'react';
import styled from 'styled-components';
import {DialogContent, DialogFooter, ConfirmButton} from "../FoodDialog/FoodDialog";
import {formatPrice} from "../Data/FoodData";
import {getPrice} from "../FoodDialog/FoodDialog";

const CartStyled = styled.div`
position: fixed;
right: 10px;
top: 70px;
width: 600px;
background-color: white;
height: calc(100% - 48px);
z-index: 10;
box-shadow: 4px 0px 5px 4px grey;
display: flex;
flex-direction: column;
`;

const CartContent = styled(DialogContent)`
padding: 20px;
height: 100%
`;

const CartContainer = styled.div`
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

const CartItem = styled.div`
    padding: 10px 0px;
    display: grid;
    grid-template-columns: 20px 150px 20px 60px;
    justify-content: space-between;
`;

const DetailItem = styled.div`
    color: gray;
    font-size: 10px;
`

export function Cart({orders, setOrders, setOpenFood}) {
    const subtotal = orders.reduce((total, order) => {
        return total + getPrice(order);
    }, 0);
    const tax = subtotal * 0.07;
    const processingFee = (tax + subtotal) * 0.05;
    const total = subtotal + tax + processingFee;

    const deleteItem= index => {
        const newOrders = [...orders];
        newOrders.splice(index, 1);
        setOrders(newOrders);
    }

    return <CartStyled>
    {orders.length === 0 ?<CartContent>Your cart is empty...
        </CartContent> : 
        <CartContent>
            {" "}
            <CartContainer>
            You have {orders.length} item(s) in your cart.
            </CartContainer>
            {" "}
            {orders.map((order, index) => (
                <CartContainer editable>
                    <CartItem
                    onClick={() => {
                        setOpenFood({...order, index})
                    }}
                    >
                        <div>{order.quantity}</div>
                        <div>{order.name}</div>
                        <div 
                        style={{cursor: 'pointer'}} 
                        onClick={e =>{
                            e.stopPropagation();
                            deleteItem(index)}}>🗑</div>
            <div>{formatPrice(getPrice(order))}</div>
                    </CartItem>
                    <DetailItem>
                        {order.toppings
                        .filter(t => t.checked)
                        .map(topping => topping.name)
                        .join(", ")
                        }
                    </DetailItem>
                    {order.choice && <DetailItem>{order.choice}
                    </DetailItem>}
                </CartContainer>
                 ))}
                <CartContainer>
                    <CartItem>
                    <div/>
                    <div>Sub-Total:</div>
                    <div>{formatPrice(subtotal)}</div>
                    </CartItem>
                    <CartItem>
                    <div/>
                    <div>Tax:</div>
                    <div>{formatPrice(tax)}</div>
                    </CartItem>
                    <CartItem>
                    <div/>
                    <div>Processing Fee:</div>
                    <div>{formatPrice(processingFee)}</div>
                    </CartItem>
                </CartContainer>
                <CartContainer>
                    <CartItem>
                    <div/>
                    <div>Total</div>
                    <div>{formatPrice(total)}</div>
                    </CartItem>
                </CartContainer>
           
        </CartContent>}
        <DialogFooter>
        </DialogFooter>
    </CartStyled>;
}