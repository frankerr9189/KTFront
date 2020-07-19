import React, {useState} from 'react';
import styled from 'styled-components';
import { DashLabel } from './dashlinkhelper';
import {seaBlue} from '../Styles/colors';
import {Title} from '../Styles/title';
import {createCategory} from '../admin/adminApi';
import {isAuthenticated} from '../auth';

const CDialog = styled.div`
width: 500px;
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

export const ConfirmButton = styled(Title)`
margin: 10px;
color: white;
height: 20px;
border-radius: 5px;
padding: 10px;
text-align: center;
width: 200px;
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

export function CatDialog({categoryWin , setCategoryWin}){
    const [name, setName] = useState('');
    const [error, setError] = useState(false);
    const [success, setSuccess] = useState(false);

    // destructure user and token from localstorage
    const {user, token} = isAuthenticated();

    const handleChange = e => {
        setError('')
        setName(e.target.value)
    };

    const clickSubmit = e => {
        e.preventDefault();
        setError("");
        setSuccess(false);
        //make request to api to create category
        createCategory(user._id, token, {name})
        .then(data => {
            if(data.error){
                setError(data.error);
            }else {
                setError("");
                setSuccess(true);
            }
        });
    };

    const newCategoryForm = () => (
        <form onSubmit={clickSubmit}>
            <div className="form-group">
                <label className="text-muted">Category name to add: </label>
                <input 
                type="text" 
                className="form-control" 
                onChange={handleChange} 
                value={name}
                autoFocus
                required/>
                </div>
                <button className="btn btn-outline-primary">Create Category</button>
        </form>
    );

    const showSuccess = () => {
        if(success){
            return <h3 className="text-success">{name} has been created!</h3>
        }
    };

    const showError = () => {
        if(error){
            return <h3 className="text-danger">Category needs to be unique.</h3>
        }
    };

    function close() {
        setCategoryWin();
    }


    if(!categoryWin) return null;
    return (
     <>
    <CDialogShadow onClick={close}/>
    <CDialog>
        <CDashBanner>
            <CDashBannerLabel>
                {categoryWin}
            </CDashBannerLabel>
        </CDashBanner>
        <CDialogContent>
                     {showSuccess()}
                    {showError()}
                    {newCategoryForm()}
        </CDialogContent>
        <CDialogFooter>
        </CDialogFooter>
    </CDialog>
    </>
    );
}