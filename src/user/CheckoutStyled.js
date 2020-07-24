import React, {useState, useEffect} from 'react';
import styled from 'styled-components';
import {formatPrice} from "../Data/FoodData";
import {Cart} from "./cart";
import {API} from "../config";
import {Order} from "../Order/Order";
import {isAuthenticated} from '../auth';
import {useOpenFood} from "../Hooks/useOpenFood";
import {useOrders} from "../Hooks/useOrders";
import {useTitle} from "../Hooks/useTitle";

const PaymentStyled = styled.div`
    height: 300px;
    width: 600px;
    margin: 10px 500px 20px 20px;
    z-index: 10;
box-shadow: 4px 0px 5px 4px grey;
display: flex;
flex-direction: column;
`
const ShippingBox = styled.div`
    height: 300px;
    width: 600px;
    margin: 10px 500px 50px 20px;
    z-index: 10;
box-shadow: 4px 0px 5px 4px grey;
display: flex;
flex-direction: column;
`


export function CheckoutStyled(){ 
    const openFood = useOpenFood();
    const orders = useOrders();
    useTitle({...openFood, ...orders});
    const {user, token} = isAuthenticated();
    const [data, setData] = useState({
        method: ''
    });
    const [values, setValues] = useState({
        shipname: '',
        email: '',
        address:'',
        city:'',
        state: '',
        zip: '',
    })

    const {
    shipname,
    email,
    address,
    city,
    state,
    zip,
    } = values;

    const handleChange = name => event => {
        const value = name === 'name' ? event.target.files[0]: event.target.value;
        setValues({...values, [name]: value});
    };

    const clickSubmit = event => {
        event.preventDefault();
        setValues({...values});
        console.log((values));
    //     createProduct(user._id, token, formData)
    //     .then(data => {
    //         if(data.error){
    //             setValues({...values, error: data.error});
    //         } else {
    //             setValues({
    //                 ...values,
    //                 name: '', 
    //                 description:'',
    //                 photo:'',
    //                 price:'',
    //                 //quantity:'',
    //                 loading: false,
    //                 createdProduct: data.name
    //             });
    //         }
    //     });
     };

     const handleMethod = event => {
        setData({ ...data, method: event.target.value });
        console.log(data);
    };

    //let methodSelection = data.method;

    const shippingMethod = () => (
        <div>
                        <label>Method Type:</label>
                        <select 
            className="form-control" onChange={handleMethod}
           >
                <option>Select Method</option>
                <option value="pickup">Pick Up</option>
                <option value="delivery">Delivery</option>
            </select>
       </div>
    )

    const shippingForm = () => (
        <form className="mb-3" onSubmit={clickSubmit}>
            <h4>Delivery Address</h4>
            <div className="form-group">
                <label className="text-muted">Name: </label>
                <input onChange={handleChange('shipname')} type="text" className="form-control" value={shipname}/>
            </div>
            <div className="form-group">
                <label className="text-muted">Email: </label>
                <input onChange={handleChange('email')} type="text" className="form-control" value={email}/>
            </div>
            <div className="form-group">
                <label className="text-muted">Address: </label>
                <input onChange={handleChange('address')} type="text" className="form-control" value={address}/>
            </div>
            <div className="form-group">
                <label className="text-muted">City: </label>
                <input onChange={handleChange('city')} type="text" className="form-control" value={city}/>
            </div>
            <div className="form-group">
                <label className="text-muted">State: </label>
                <input onChange={handleChange('state')} type="text" className="form-control" value={state}/>
            </div>
            <div className="form-group">
                <label className="text-muted">Zip: </label>
                <input onChange={handleChange('zip')} type="text" className="form-control" value={zip}/>
            </div>
            <button className="btn btn-outline-primary">Shipping</button>
        </form>
    );

    return (
        <>
    <PaymentStyled>
        Payment
    </PaymentStyled>
        
    <ShippingBox>
        {shippingMethod()}
        {shippingForm()}
    </ShippingBox>
    <Order {...orders} {...openFood}/>
  
    </>
    );
}