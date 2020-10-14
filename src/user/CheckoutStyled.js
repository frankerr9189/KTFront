import React, {useState, useEffect} from 'react';
import styled from 'styled-components';
import {formatPrice} from "../Data/FoodData";
import {API} from "../config";
import {isAuthenticated} from '../auth';
import {useOpenFood} from "../Hooks/useOpenFood";
import {useOrders} from "../Hooks/useOrders";
import {useTitle} from "../Hooks/useTitle";
import {DialogContent} from "../FoodDialog/FoodDialog";
import {FoodLabel} from "../Menu/FoodGrid";
import {getPrice} from "../FoodDialog/FoodDialog";
import {useDispatch, useSelector} from 'react-redux';
import { loadStripe } from '@stripe/stripe-js';
const stripePromise = loadStripe('pk_test_51HJqHJGl9xwp0fdrtqsR98zycaHBM0a6V6ZzsUL5uC3utm8Y2yHigTStkr2lH8F4nW2R3BCb2CEj9S4yMTLyFEv900l6GU6XRb', {
    stripeAccount: "acct_1HRNLcDQrRsPJFuN"
  });

export const FoodGrid = styled.div`
display: grid;
width: 1000px;
grid-template-columns: 1fr 1fr 1fr;
gap: 20px;
padding-bottom: 40px;
`;


const CartStyled = styled.div`
top: 300px;
width: 600px;
background-color: white;
height: 600px;
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
export const CartBanner = styled.div`
min-height: 50px;
margin-bottom: 20px;
background-image: url("img/shark.jpeg");
background-position: center;
background-size: cover;
`;
export const CartBannerName = styled(FoodLabel)`
    font-size: 25px;
    padding: 5px 20px;
    
`;

const DetailItem = styled.div`
    color: gray;
    font-size: 10px;
`

const PaymentStyled = styled.div`
    height: 600px;
    width: 600px;
    z-index: 10;
box-shadow: 4px 0px 5px 4px grey;
display: flex;
flex-direction: column;
@media (max-width: 700px){
    width: 350px;}
`



export function CheckoutStyled(){ 
    const openFood = useOpenFood();
    const orders = useOrders();
    useTitle({...openFood, ...orders});
    const [items, setItems] = useState([]);
    const cart = useSelector((state)=>state.cart);
    const [run, setRun] = useState(false);
    const subtotal = cart.reduce((total, items) => {
        return total + getPrice(items);
    }, 0);
    const displaySubtotal = subtotal.toFixed(2);
    const tax = subtotal * 0.07;
    const displayTax = tax.toFixed(2);
    const processingFeeN = (tax + subtotal) * 0.05;
    const displayProcessingFee = processingFeeN.toFixed(2);
    const total = subtotal + tax + processingFeeN;
    const displayTotal = total.toFixed(2);
    const [values, setValues] = useState(
        {
    success: false,
    clientToken: null,
    error: '',
    instance: {},
    user: "",
    orderItems: "",
    ShipName: "",
    ShipEmail: "",
    ShipAddress: "",
    ShipCity: "",
    ShipState: "",
    ShipZip: "",
    method: "",
    subTotal: "",
    taxPrice: "",
    processingFee:"",
    totalPrice: "",
    sessionData: "",
        }
    );

    const {success, ShipName, ShipEmail, ShipAddress, ShipCity, ShipState, ShipZip, sessionData} = values;

    // useEffect(()=> {
    //     setItems(getCart());
    // }, [run]);
    
    const handleClick = async (event) => {

        const createOrderData = {
            orderItems: cart,
            ShipName: ShipName,
            ShipEmail: ShipEmail,
            ShipAddress: ShipAddress,
            ShipCity: ShipCity,
            ShipState: ShipState,
            ShipZip: ShipZip,
            method: deliveryMethod,
            subTotal: null,
            taxPrice: null,
            processingFee: null,
            totalPrice: null,
            sessionData: null,
        };
        console.log(createOrderData);
        // Get Stripe.js instance
        const stripe = await stripePromise;
    
        // Call your backend to create the Checkout Session
        const response = await fetch(`${API}/create-checkout-session/`, 
        { method: 'POST', 
          headers:{
            Accept: 'application/json',
            'Content-Type': 'application/json',        },
          body: JSON.stringify({order: createOrderData})
    });
    
        const session = await response.json();
        
        // When the customer clicks on the button, redirect them to Checkout.
        const result = await stripe.redirectToCheckout({
          sessionId: session.id,
        });
    
        if (result.error) {
          // If `redirectToCheckout` fails due to a browser or network
          // error, display the localized error message to your customer
          // using `result.error.message`.
        } 
      };

    const showItems = () => {
        console.log('Cart'+ cart)
        return(
            <div onBlur={()=> setValues({...values, error:""})}>
                <hr/>
                {cart.map((product, i)=> (
                <DetailItem 
                key ={i} 
                items={product}
                setRun={setRun}
                run={run}
                >{product.name} {" Qty: "} {product.quantity} {" "} {product.toppings
                    .filter(t => t.checked)
                    .map(topping => topping.name)
                    .join(", ")
                    }{" $"}{getPrice(product).toFixed(2)}</DetailItem>
                ))
                }
            </div>
        );
    };

    const userId = isAuthenticated() && isAuthenticated().user._id;

    let deliveryMethod = values.method;


    const showError = error => (
        <div style={{ display: values.error ? '' : 'none' }}>
            {error}
        </div>
    );

    const showSuccess = success => (
        <div style={{ display: success ? '' : 'none' }}>
            <h2>Thanks! Your payment was successful!</h2>
        </div>
    );

    const handleChange = name => event => {
        const value = name === 'name' ? event.target.files[0]: event.target.value;
        setValues({...values, [name]: value});
    };

     const handleMethod = event => {
        setValues({...values, method: event.target.value });
    };


    const shippingMethod = () => (
        <div>
                        <label>Method Type:</label>
                        <select 
            className="form-control" onChange={handleMethod}
           >
                <option>Select Method</option>
                <option>Pick Up</option>
                <option>Delivery</option>
            </select>
       </div>
    )

    const shippingForm = () => (
        <form className="mb-3">
            <div className="form-group">
                <label className="text-muted">Name: </label>
                <input onChange={handleChange('ShipName')} type="text" className="form-control" value={ShipName || ""}/>
            </div>
            <div className="form-group">
                <label className="text-muted">Email: </label>
                <input onChange={handleChange('ShipEmail')} type="text" className="form-control" value={ShipEmail|| ""}/>
            </div>
            <div className="form-group">
                <label className="text-muted">Address: </label>
                <input onChange={handleChange('ShipAddress')} type="text" className="form-control" value={ShipAddress||""}/>
            </div>
            <div className="form-group">
                <label className="text-muted">City: </label>
                <input onChange={handleChange('ShipCity')} type="text" className="form-control" value={ShipCity||""}/>
            </div>
            <div className="form-group">
                <label className="text-muted">State: </label>
                <input onChange={handleChange('ShipState')} type="text" className="form-control" value={ShipState||""}/>
            </div>
            <div className="form-group">
                <label className="text-muted">Zip: </label>
                <input onChange={handleChange('ShipZip')} type="text" className="form-control" value={ShipZip||""}/>
            </div>
            {/* <button className="btn btn-outline-primary">Shipping</button> */}
        </form>
    );

    return (
        <>
        <FoodGrid> 
        <CartStyled>
    <CartContainer>
    <CartBanner img={`${API}/product/photo/shark.jpeg`}>
        <CartBannerName>Summary, your cart has {`${cart.length}`} items.</CartBannerName>
    </CartBanner>
        <CartContent>
            {showSuccess(success)}
            {showItems()}
            <DetailItem>Sub-Total: {formatPrice(subtotal)} </DetailItem>
            <DetailItem>Tax: {formatPrice(tax)} </DetailItem>           
            <DetailItem>Processing Fee: {formatPrice(processingFeeN)} </DetailItem>
            <DetailItem>Total: {formatPrice(total)} </DetailItem>
        </CartContent>
    </CartContainer>
    </CartStyled>

    <PaymentStyled>
        {shippingMethod()}
        {shippingForm()}
            <button role="link" onClick={handleClick}>
      Checkout
    </button>
    </PaymentStyled>
    </FoodGrid>
    </>
    );
}