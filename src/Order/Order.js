import React from 'react';
import styled from 'styled-components';
import {DialogContent, DialogFooter, ConfirmButton} from "../FoodDialog/FoodDialog";

const OrderStyled = styled.div`
position: fixed;
right: 0px;
top: 57px;
width: 340px;
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
`
const OrderItem = styled.div`
    padding: 10px 0px;
`

export function Order({orders}) {
    return <OrderStyled>
    {orders.length === 0 ?<OrderContent>Your cart is empty...
        </OrderContent> : 
        <OrderContent>
            {" "}
            <OrderContainer>
            You have {orders.length} item(s) in your cart.
            </OrderContainer>
            {" "}
            {orders.map(order => (
                <OrderContainer>
                    <OrderItem>
                        {order.name}
                    </OrderItem>
                </OrderContainer>
            ))}
        </OrderContent>}
        <DialogFooter>
            <ConfirmButton>
                Checkout
            </ConfirmButton>
        </DialogFooter>
    </OrderStyled>;
}