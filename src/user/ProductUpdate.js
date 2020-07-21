import React, {useState, useEffect} from 'react';
import styled from 'styled-components';
import { DashLabel } from './dashlinkhelper';
import {Link} from 'react-router-dom';
import {seaBlue} from '../Styles/colors';
import {Title} from '../Styles/title';
import {getProducts, deleteProduct} from '../admin/adminApi';
import {isAuthenticated} from '../auth';

const CDialog = styled.div`
width: 550px;
background-color: white;
position: fixed;
top: 80px;
z-index: 5;
max-height: calc(100% - 100px);
left: calc(50% - 250px);
display: flex;
flex-direction: column;
`;

const CDialogShadow = styled.div`
    position: fixed;
    height: 100%;
    width: 100%;
    top: 0px;
    background-color: black;
    opacity: 0.7;
    z-index: 4;
`

const CDialogContent = styled.div`
overflow: auto; 
min-height: 200px;
padding: 0px 40px;
padding-bottom: 80px;
`;

export const DeleteConfirmButton = styled(Title)`
margin: 10px;
color: white;
height: 20px;
border-radius: 5px;
padding: 10px;
text-align: center;
width: 100px;
cursor: pointer;
background-color: #ff0000;
${({disabled}) => disabled &&
`
opacity: .5;
background-color: grey;
pointer-events: none;
`}
`;

export const UpdateButton = styled(Title)`
margin: 10px;
color: white;
height: 20px;
border-radius: 5px;
padding: 10px;
text-align: center;
width: 100px;
cursor: pointer;
background-color: ${seaBlue};
${({disabled}) => disabled &&
`
opacity: .5;
background-color: grey;
pointer-events: none;
`}
`;

const CDialogFooter = styled.div`
box-shadow: 0px -2px 20px 0px grey;
height: 60px;
display: flex;
justify-content: center;
`;



const CDashBanner = styled.div`
min-height: 200px;
margin-bottom: 20px;
background-image: url("img/shark.jpeg");
background-position: center;
background-size: cover;
`;

const CDashBannerLabel= styled(DashLabel)`
    top: 90px;
    font-size: 30px;
    padding: 5px 40px;
`

export function ProdUpdateDialog({productUpdate , setProductUpdate}){
    const [products, setProducts] = useState ([]);
    const {user, token} = isAuthenticated();

    const loadProducts = () => {
        getProducts().then(data => {
            if(data.error){
                console.log(data.error)
            } else {
                setProducts(data)
            }
        });
    };
        const destroy = productId => {
            deleteProduct(productId, user._id, token).then(data => {
                if(data.error) {
                    console.log(data.error)
                } else {
                    loadProducts()
                }
            });
        };

    useEffect(()=> {
        loadProducts();
    }, [])

    function close() {
        setProductUpdate();
    }

    if(!productUpdate) return null;
    return (
     <>
    <CDialogShadow onClick={close}/>
    <CDialog>
        <CDashBanner>
            <CDashBannerLabel>
                {productUpdate}
            </CDashBannerLabel>
        </CDashBanner>
        <CDialogContent>
        <div className="profile-orders" className="content-margined">
            {
                <table className="table">
                    <thead>
                        <tr>
                        <th>Product Name</th>
                        <th>Update</th>
                        <th>Delete</th>
                        </tr>
                        </thead>
                        <tbody>
                            {products.map((p, i) => <tr key={i}>
                                <td>{p.name}</td>
                                <td>
                                    <UpdateButton>Update</UpdateButton>
                                </td>
                                <td>
                                <span onClick={()=> destroy(p._id)} className="badge badge-danger badge-pill">
                                   <DeleteConfirmButton> Delete</DeleteConfirmButton>
                                </span>
                                </td>
                            </tr>)}
                        </tbody>
                </table>            }
        </div>
        </CDialogContent>
        <CDialogFooter>
        </CDialogFooter>
    </CDialog>
    </>
    );
}