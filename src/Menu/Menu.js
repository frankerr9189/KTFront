import React, {useState, useEffect} from 'react';
import styled from 'styled-components';
import {getProducts} from "../admin/adminApi";
import {Food, FoodGrid, FoodLabel} from "./FoodGrid";
import {formatPrice} from "../Data/FoodData";
import {API} from "../config";
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

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

const MenuStyled = styled.div`
    height: 1000px;
    width: 65%;
    margin: 0px 400px 50px 20px;
    @media (max-width: 700px){
width: 60%    }
`

export function Menu({setOpenFood}){
    const [loadProducts, setLoadProducts] = useState([]);
    const [error, setError] = useState(false);
    const classes = useStyles(); 

    const loadAllProducts = () => {
        getProducts().then(data=>{
            if(data.error){
                setError(data.error);
            }else{
                setLoadProducts(data);
            }
        });
    };

    useEffect(()=>{
        loadAllProducts()
        
    }, []);

    useEffect(()=>{console.log(loadProducts)}, [loadProducts])

    const foods = loadProducts.reduce((res, food) => {
        if(!res[food.category.name]){
            res[food.category.name]=[];
        }
        res[food.category.name].push(food);
        return res;
    }, {});

    return (
    <MenuStyled>
        {Object.entries(foods).map(([sectionName, foods]) => (
            <>
        <h1>{sectionName}</h1>
        
        <FoodGrid>
        {foods.map((food, findex) => (
            <Food key={findex} img={`${API}/product/photo/${food._id}`} onClick={()=>{
                setOpenFood(food);
            }}>
                <FoodLabel>
                    <div>
                        {food.name}
                    </div>
                    <div>
                        {formatPrice(food.price)}
                    </div>
                </FoodLabel>
            </Food>
        ))}
        </FoodGrid>
        </>
        ))}
    </MenuStyled>
    );
}