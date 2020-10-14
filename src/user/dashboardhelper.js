import React from 'react';
import styled from 'styled-components';
import {DashLinkGrid, DashLink, DashLabel} from './dashlinkhelper';
import {isAuthenticated} from '../auth';
import {Redirect, Router} from 'react-router-dom';

const DashStyled = styled.div`
    height: 500px;
    margin: 0px 200px 50px 100px;
`

export function DashHelper({setCategoryWin, setProductWin, setProductUpdate, setOrderReport}){

    const {user} = isAuthenticated();

    const orderRedirect = () => {
        console.log("redirect")
            if(user && user.role ===1){
                console.log("/adminorders")
                return <Redirect to="/adminorders" />;
            } else{
                console.log("/")
                return <Redirect to="/"/>;
            }
    };

    return <DashStyled>
        <h1>Admin Options</h1>
        <>
        <DashLinkGrid>
            <DashLink onClick={()=> {
                setCategoryWin("Add Category")
            }}>
                <DashLabel>
                    Add Category
                </DashLabel>
            </DashLink>
            <DashLink onClick={()=> {
                setProductWin("Add Product")
            }}>
                <DashLabel>Add Product
                    
                </DashLabel>
                </DashLink>
                <DashLink onClick={()=> {
                orderRedirect()
            }}>
                <DashLabel> View Orders</DashLabel></DashLink>
            <DashLink onClick={()=> {
                setProductUpdate("Manage Product")
            }}><DashLabel>Manage Products</DashLabel></DashLink>
            <DashLink>
                <DashLabel>User Information</DashLabel></DashLink>
            </DashLinkGrid>
</>
    </DashStyled>
}