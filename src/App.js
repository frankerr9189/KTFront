import React from 'react';
import {Provider} from 'react-redux'
import {store} from './store'
import {Navbar} from './Navar/Navbar';
import {Banner} from "./Banner/Banner";
import {Menu} from "./Menu/Menu";
import {GlobalStyle} from "./Styles/GlobalStyle";
import {FoodDialog} from "./FoodDialog/FoodDialog";
import {Order} from "./Order/Order";
import {useOpenFood} from "./Hooks/useOpenFood";
import {useOrders} from "./Hooks/useOrders";
import {useTitle} from "./Hooks/useTitle";
//import { ThemeProvider } from '@material-ui/styles';
//import theme from './constants/theme';

function App() {
  const openFood = useOpenFood();
  const orders = useOrders();
  useTitle({...openFood, ...orders});
  
  return (
    <>
    <Provider store={store}>
    {/* <ThemeProvider theme={theme}> */}
    <GlobalStyle/>
    <FoodDialog {...openFood}{...orders}/>
    <Navbar/>
    <Order {...orders} {...openFood}/>
    <Banner/>
    <Menu {...openFood}/>   
    {/* </ThemeProvider> */}
   </Provider>
   </>
  );
}

export default App;
