import React, { useEffect } from 'react';
import {useDispatch, useSelector} from 'react-redux'
import * as actions from '../actionTypes';
import styled from 'styled-components';
import {FoodLabel} from "../Menu/FoodGrid";
import {seaBlue} from '../Styles/colors';
import {Title} from '../Styles/title';
import {formatPrice} from "../Data/FoodData";
import {QuantityInput} from "./QuantityInput";
import {useQuantity} from "../Hooks/useQuantity";
import {Toppings} from "./Toppings";
import {useToppings} from "../Hooks/useToppings";
import {useChoice} from "../Hooks/useChoice";
import {Choices} from "./Choices";
import {API} from "../config";


export const Dialog = styled.div`
    width: 500px;
    background-color: white;
    position: fixed;
    top: 75px;
    z-index: 5;
    max-height: calc(100% - 100px);
    left: calc(50% - 250px);
    display: flex;
    flex-direction: column;
`;
const DialogShadow = styled.div`
    position: fixed;
    height: 100%;
    width: 100%;
    top: 0px;
    background-color: black;
    opacity: 0.7;
    z-index: 4;
`;

const DialogBanner = styled.div`
min-height: 200px;
margin-bottom: 20px;
${({img}) => (img ? `background-image: url(${img});` : `min-height: 75px;`)}
background-position: center;
background-size: cover;
`;

const DialogBannerName = styled(FoodLabel)`
    font-size: 30px;
    padding: 5px 40px;
    top: ${({img}) => (img ? `100px` : `20px`)};
`;

function refreshPage() {
    window.location.reload(false);
  }

const pricePerTopping = 0.5;

export function getPrice(order){
    return order.quantity * (order.price + order.toppings.filter(t => t.checked).length * pricePerTopping);
}
//overflow auto adds the scroll bar to the dialog content area if needed
export const DialogContent = styled.div`
overflow: auto; 
min-height: 100px;
padding: 0px 40px;
padding-bottom: 80px;
`;

export const DialogFooter = styled.div`
box-shadow: 0px -2px 10px 0px grey;
height: 60px;
display: flex;
justify-content: center;
`;

export const ConfirmButton = styled(Title)`
margin: 10px;
color: white;
height: 20px;
border-radius: 5px;
padding: 10px;
text-align: center;
width: 200px;
cursor: pointer;
background-color: ${seaBlue};
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

function hasToppings(food){
    return food.category.name === 'Pizza';
}

function FoodDialogContainer({openFood, setOpenFood, setOrders, orders}){
    const dispatch = useDispatch();
    const cart = useSelector((state)=>state.cart);
    const quantity = useQuantity (openFood && openFood.quantity);
    const toppings = useToppings(openFood.toppings);
    const choiceRadio = useChoice(openFood.choice);
    const isEditing = openFood.index > -1;

    useEffect(()=>{console.log(cart)},[cart])

    function close() {
        setOpenFood();
    }

    const order ={
        ...openFood,
        quantity: quantity.value,
        toppings: toppings.toppings,
        choice: choiceRadio.value,
    };

    function editOrder(){
        const newOrders = [...orders];
        newOrders[order.index] = order;
        setOrders(newOrders);
        close();
        refreshPage();
    };

    function addToOrder(){
        setOrders([...orders, order]);
        dispatch({type: actions.ADD_PRODUCT_TO_CART, payload: order})
        // console.log(order);
        close();
    }
    return (
    <>
    <DialogShadow onClick={close}/>
    <Dialog> 
    <DialogBanner img={`${API}/product/photo/${openFood._id}`}>
        <DialogBannerName>{openFood.name}</DialogBannerName>
    </DialogBanner>
    <DialogContent>
        <QuantityInput quantity={quantity}/>
        {hasToppings(openFood) && (
        <>
            <h3>Add Toppings:</h3>
            <Toppings {...toppings}/>
        </>)}
        {openFood.choices && <Choices openFood={openFood} choiceRadio={choiceRadio}/>}
        
    </DialogContent>
    <DialogFooter>
    <ConfirmButton 
    onClick={isEditing ? editOrder : addToOrder}
    disabled={openFood.choices && !choiceRadio.value}>
        {isEditing ? `Update order` : `Add to order: `}{formatPrice(getPrice(order))}</ConfirmButton>
    </DialogFooter>
    </Dialog>
    </>
    );
}

export function FoodDialog(props){
    if(!props.openFood) return null;
    return <FoodDialogContainer {...props}/>
}