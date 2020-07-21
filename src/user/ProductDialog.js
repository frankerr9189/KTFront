import React, {useState, useEffect} from 'react';
import styled from 'styled-components';
import { DashLabel } from './dashlinkhelper';
import {seaBlue} from '../Styles/colors';
import {Title} from '../Styles/title';
import {createProduct, getCategories} from '../admin/adminApi';
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

export function ProdDialog({productWin , setProductWin}){
    const {user, token} = isAuthenticated();
    const [values, setValues] = useState({
        name:'',
        description:'',
        price: '',
        categories: [],
        category: '',
        shipping:'',
        //quantity: '',
        photo: '',
        loading: false,
        error: '',
        createdProduct: '',
        redirectedToProfile: false,
        formData: ''
    })

    const {
    name,
    description,
    price,
    categories,
    category,
    shipping,
    //quantity,
    loading,
    error,
    createdProduct,
    redirectedToProfile,
    formData
    } = values;

    //load categories and set form data
    const init = () => {
        getCategories().then(data => {
            if(data.error){
                setValues({...values, error: data.error})
            }else {
                setValues({...values, 
                    categories: data, 
                    formData: new FormData()
                });
            }
        });
    };

    useEffect(() => {
        init();
   }, []);

    const handleChange = name => event => {
        const value = name === 'photo' ? event.target.files[0]: event.target.value;
        formData.set(name,value);
        setValues({...values, [name]: value});
    };

    const clickSubmit = event => {
        event.preventDefault();
        setValues({...values, error: "", loading: true});

        createProduct(user._id, token, formData)
        .then(data => {
            if(data.error){
                setValues({...values, error: data.error});
            } else {
                setValues({
                    ...values,
                    name: '', 
                    description:'',
                    photo:'',
                    price:'',
                    //quantity:'',
                    loading: false,
                    createdProduct: data.name
                });
            }
        });
    };

    const newPostForm = () => (
        <form className="mb-3" onSubmit={clickSubmit}>
            <h4>Post Photo</h4>
            <div className="form-group">
                <label className="btn btn-secondary">
                <input onChange={handleChange('photo')}  type="file" name="photo" accept="image/*"/>
                </label>
            </div>
            <div className="form-group">
                <label className="text-muted">Name</label>
                <input onChange={handleChange('name')} type="text" className="form-control" value={name}/>
            </div>
            <div className="form-group">
                <label className="text-muted">Description</label>
                <input onChange={handleChange('description')} type="text" className="form-control" value={description}/>
            </div>
            <div className="form-group">
                <label className="text-muted">Price</label>
                <input onChange={handleChange('price')} type="number" className="form-control" value={price}/>
            </div>
            <div className="form-group">
                <label className="text-muted">Category</label>
                <select 
                onChange={handleChange('category')} 
                className="form-control" 
                >
                    <option>--select--</option>
                    {categories && categories.map((c, i) => (
                    <option key={i} value={c._id}>{c.name}
                    </option>
                    ))}
                </select>
            </div>
            <div className="form-group">
            {/* <label className="text-muted">Quantity</label>
                <input 
                onChange={handleChange('quantity')} 
                type="number" 
                className="form-control" 
                value={quantity}/> */}
            </div>
            <div className="form-group">
                <label className="text-muted">Shipping</label>
                <select 
                onChange={handleChange('shipping')} 
                className="form-control" 
                >
                    <option>--select--</option>
                    <option value="0">No</option>
                    <option value="1">Yes</option>

                </select>
            </div>
            <button className="btn btn-outline-primary">Create Product</button>
        </form>
    );

    const showError = () =>(
        <div className="alert alert-danger" style={{display: error ? '': 'none'}}>
            {error}
        </div>
    );

    const showSuccess = () =>(
        <div className="alert alert-info" style={{display: createdProduct ? '': 'none'}}>
            <h2>{`${createdProduct}`} is created`</h2>
        </div>
    );

    const showLoading = () =>(
        loading && (<div className="alert alert-success">
            <h2>Loading...</h2>
        </div>)
    );

    function close() {
        setProductWin();
    }

    if(!productWin) return null;
    return (
     <>
    <CDialogShadow onClick={close}/>
    <CDialog>
        <CDashBanner>
            <CDashBannerLabel>
                {productWin}
            </CDashBannerLabel>
        </CDashBanner>
        <CDialogContent>
                     {showSuccess()}
                    {showError()}
                    {showLoading()}
                    {newPostForm()}
        </CDialogContent>
        <CDialogFooter>
        </CDialogFooter>
    </CDialog>
    </>
    );
}