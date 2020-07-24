import {useState} from 'react';

export function useOrders(){
    const [orders, setOrders] = useState([]);
    console.log(orders);
    return { orders, setOrders};
}