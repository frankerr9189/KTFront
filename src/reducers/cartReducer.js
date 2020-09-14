import * as actions from '../actionTypes'

const initialState = {
    cart:[]
}

export default (state = initialState, action) => {
    switch (action.type) {
        case actions.ADD_PRODUCT_TO_CART: {
            console.log('dispatching')
            let cart = state.cart;
            cart.push(action.payload)
            return {...state, cart}
        }
        case actions.RMV_PRODUCT_FROM_CART: {
            console.log('remove')
            let cart = state.cart;
            cart.map((product, i) => {
                if(product._id === action.payload){
                    cart.splice(i, 1);
                }
            });
            console.log("Cart" + cart);
            return {...state, cart}
        }
        default:
            return state
    }
}