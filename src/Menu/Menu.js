import React, {useState, useEffect} from 'react';
import styled from 'styled-components';
import {getProducts} from "../admin/adminApi";
import {Food, FoodGrid, FoodLabel} from "./FoodGrid";
import {formatPrice} from "../Data/FoodData";
import {API} from "../config";

const MenuStyled = styled.div`
    height: 1000px;
    margin: 0px 400px 50px 20px;
`

export function Menu({setOpenFood}){
    const [loadProducts, setLoadProducts] = useState([]);
    const [error, setError] = useState(false);

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
        {foods.map(food => (
            <Food img={`${API}/product/photo/${food._id}`} onClick={()=>{
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