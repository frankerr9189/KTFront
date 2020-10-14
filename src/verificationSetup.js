import React, {useState, useEffect} from 'react';
import styled from 'styled-components';
import { DashLabel } from './user/dashlinkhelper';
import {seaBlue} from './Styles/colors';
import {Title} from './Styles/title';
import {API} from "./config";


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

export function VerificationForm(){
    const [values, setValues] = useState({
        businessType:'',
        merchantCategoryCode:'',
        URL: '',
        externalAccount: '',
        companyName: '',
        companyAddress1:'',
        companyAddress2:'',
        companyPostalCode:'',
        companyCity:'',
        companyState:'',
        companyCountry:'US',
        companyPhone: '',
        companyTaxID: '',
        repFName: '',
        repLName: '',
        repDOBDay: '',
        repDOBMonth: '',
        repDOBYear: '',
        repAddress1: '',
        repAddress2: '',
        repPostal_Code: '',
        repCity: '',
        repState: '',
        repCountry: 'US',
        repTaxInformation: '',
        repTitleCompany: '',
        repEmail: '',
        repPhone: '',
        ownerFName: '',
        ownerLName: '',
        ownerEmail: '',
        error:'',
    })

    const {
    businessType,
    merchantCategoryCode,
    URL,
    externalAccount,
    companyName,
    companyAddress1,
    companyAddress2,
    companyPostalCode,
    companyCity,
    companyState,
    companyCountry,
    companyPhone,
    companyTaxID,
    repFName,
    repLName,
    repDOBDay,
    repDOBMonth,
    repDOBYear,
    repAddress1,
    repAddress2,
    repPostal_Code,
    repCity,
    repState,
    repTaxInformation,
    repTitleCompany,
    repEmail,
    repPhone,
    ownerFName,
    ownerLName,
    ownerEmail,
    error
    } = values;

    const handleChange= name=> event => {
        setValues({...values, [name]: event.target.value});
        console.log(values)
    };

    const clickSubmit = event => {
        event.preventDefault();
        setValues({...values});
        console.log("Submit Clicked: ");

        fetch(`${API}/stripe/account/save`, 
    { 
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
    },
    body: JSON.stringify({values}),
    })
        // createProduct(user._id, token, formData)
        // .then(data => {
        //     if(data.error){
        //         setValues({...values, error: data.error});
        //     } else {
        //         setValues({
        //             ...values,
        //             name: '', 
        //             description:'',
        //             photo:'',
        //             price:'',
        //             //quantity:'',
        //             loading: false,
        //             createdProduct: data.name
        //         });
        //     }
        // });
    };

    const newPostForm = () => (
        <form className="mb-3" >
            <h4>Account Verification Steps</h4>
            <div className="form-group">
            <label className="text-muted">Business Type</label>
                <input onChange={handleChange('businessType')}  type="text" className="form-control" value={businessType}/>
            </div>
            <div className="form-group">
                <label className="text-muted">Merchant Category Code</label>
                <input onChange={handleChange('merchantCategoryCode')} type="text" className="form-control" value={merchantCategoryCode}/>
            </div>
            <div className="form-group">
                <label className="text-muted">URL</label>
                <input onChange={handleChange('URL')} type="text" className="form-control" value={URL}/>
            </div>
            <div className="form-group">
                <label className="text-muted">External Account</label>
                <input onChange={handleChange('externalAccount')} type="number" className="form-control" value={externalAccount}/>
            </div>
            <div className="form-group">
                <label className="text-muted">Company Name</label>
                <input onChange={handleChange('companyName')} type="text" className="form-control" value={companyName}/>
            </div>
            <div className="form-group">
                <label className="text-muted">Company Address1</label>
                <input onChange={handleChange('companyAddress1')} type="text" className="form-control" value={companyAddress1}/>
            </div>
            <div className="form-group">
                <label className="text-muted">Company Address2</label>
                <input onChange={handleChange('companyAddress2')} type="text" className="form-control" value={companyAddress2}/>
            </div>
            <div className="form-group">
                <label className="text-muted">Company Postal Code</label>
                <input onChange={handleChange('companyPostalCode')} type="text" className="form-control" value={companyPostalCode}/>
            </div>
            <div className="form-group">
                <label className="text-muted">Company City</label>
                <input onChange={handleChange('companyCity')} type="text" className="form-control" value={companyCity}/>
            </div>
            <div className="form-group">
                <label className="text-muted">Company State</label>
                <input onChange={handleChange('companyState')} type="text" className="form-control" value={companyState}/>
            </div>
            <div className="form-group">
                <label className="text-muted">Company Phone</label>
                <input onChange={handleChange('companyPhone')} type="text" className="form-control" value={companyPhone}/>
            </div>
            <div className="form-group">
                <label className="text-muted">Company TaxId</label>
                <input onChange={handleChange('companyTaxID')} type="text" className="form-control" value={companyTaxID}/>
            </div>
            <div className="form-group">
                <label className="text-muted">Representative First Name</label>
                <input onChange={handleChange('repFName')} type="text" className="form-control" value={repFName}/>
            </div>
            <div className="form-group">
                <label className="text-muted">Representative Last Name</label>
                <input onChange={handleChange('repLName')} type="text" className="form-control" value={repLName}/>
            </div>
            <div className="form-group">
                <label className="text-muted">Representative DOB Day</label>
                <input onChange={handleChange('repDOBDay')} type="text" className="form-control" value={repDOBDay}/>
            </div>
            <div className="form-group">
                <label className="text-muted">Representative DOB Month</label>
                <input onChange={handleChange('repDOBMonth')} type="text" className="form-control" value={repDOBMonth}/>
            </div>
            <div className="form-group">
                <label className="text-muted">Representative DOB Year</label>
                <input onChange={handleChange('repDOBYear')} type="text" className="form-control" value={repDOBYear}/>
            </div>
            <div className="form-group">
                <label className="text-muted">Representative Address1</label>
                <input onChange={handleChange('repAddress1')} type="text" className="form-control" value={repAddress1}/>
            </div>
            <div className="form-group">
                <label className="text-muted">Representative Address2</label>
                <input onChange={handleChange('repAddress2')} type="text" className="form-control" value={repAddress2}/>
            </div>
            <div className="form-group">
                <label className="text-muted">Representative City</label>
                <input onChange={handleChange('repCity')} type="text" className="form-control" value={repCity}/>
            </div>
            <div className="form-group">
                <label className="text-muted">Representative State</label>
                <input onChange={handleChange('repState')} type="text" className="form-control" value={repState}/>
            </div>
            <div className="form-group">
                <label className="text-muted">Representative Zip</label>
                <input onChange={handleChange('repPostal_Code')} type="text" className="form-control" value={repPostal_Code}/>
            </div>
            <div className="form-group">
                <label className="text-muted">Representative Tax Information (last 4 digits of SSN)</label>
                <input onChange={handleChange('repTaxInformation')} type="text" className="form-control" value={repTaxInformation}/>
            </div>
            <div className="form-group">
                <label className="text-muted">Representative Title at Company</label>
                <input onChange={handleChange('repTitleCompany')} type="text" className="form-control" value={repTitleCompany}/>
            </div>
            <div className="form-group">
                <label className="text-muted">Representative Email</label>
                <input onChange={handleChange('repEmail')} type="text" className="form-control" value={repEmail}/>
            </div>
            <div className="form-group">
                <label className="text-muted">Representative Phone</label>
                <input onChange={handleChange('repPhone')} type="text" className="form-control" value={repPhone}/>
            </div>
            <div className="form-group">
                <label className="text-muted">Owner's First Name</label>
                <input onChange={handleChange('ownerFName')} type="text" className="form-control" value={ownerFName}/>
            </div>
            <div className="form-group">
                <label className="text-muted">Owner's Last Name</label>
                <input onChange={handleChange('ownerLName')} type="text" className="form-control" value={ownerLName}/>
            </div>
            <div className="form-group">
                <label className="text-muted">Owner's Email</label>
                <input onChange={handleChange('ownerEmail')} type="text" className="form-control" value={ownerEmail}/>
            </div>
            <button className="btn btn-outline-primary" onClick={clickSubmit}>Verification Submit</button>
        </form>
    );

    const showError = () =>(
        <div className="alert alert-danger" style={{display: error ? '': 'none'}}>
            {error}
        </div>
    );

    // const showSuccess = () =>(
    //     <div className="alert alert-info" style={{display: createdProduct ? '': 'none'}}>
    //         <h2>Verification is complete!</h2>
    //     </div>
    // );

    // const showLoading = () =>(
    //     loading && (<div className="alert alert-success">
    //         <h2>Loading...</h2>
    //     </div>)
    // );

    return (
     <>
    <CDialog>
        <CDialogContent>
                    {/* {showSuccess()} */}
                    {showError()}
                    {/* {showLoading()} */}
                    {newPostForm()}
        </CDialogContent>
        <CDialogFooter>
        </CDialogFooter>
    </CDialog>
    </>
    );
}