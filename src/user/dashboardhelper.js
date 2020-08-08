import React from 'react';
import styled from 'styled-components';
import {DashLinkGrid, DashLink, DashLabel} from './dashlinkhelper';
import {signin, authenticate, isAuthenticated} from '../auth';
import {Redirect, Link} from 'react-router-dom';

const DashStyled = styled.div`
    height: 500px;
    margin: 0px 200px 50px 100px;
`

export function DashHelper({setCategoryWin, setProductWin, setProductUpdate, setOrderReport}){

    const {user} = isAuthenticated();

    const redirectUserOrder = () => {
            if(user && user.role ===1){
                return <Redirect to="/adminorders"/>;
            } else{
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
                setOrderReport("View Orders")
            }}>
                <DashLabel> View Orders</DashLabel></DashLink>
            <DashLink onClick={()=> {
                setProductUpdate("Manage Product")
            }}><DashLabel>Manage Products</DashLabel></DashLink>
            <DashLink><DashLabel>User Information</DashLabel></DashLink>
            </DashLinkGrid>
</>
    </DashStyled>
}