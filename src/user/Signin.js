import React, {useState} from 'react';
import {Redirect, Link} from 'react-router-dom';
import {Navbar} from '../Navar/Navbar';
import {Banner} from "../Banner/Banner";
import {GlobalStyle} from "../Styles/GlobalStyle";
import {FoodDialog} from "../FoodDialog/FoodDialog";
import styled from "styled-components";
import {Title} from "../Styles/title";
import {signin, authenticate, isAuthenticated} from '../auth';


export const SigninGrid = styled.div`
display: grid;
grid-template-columns: 1fr;
gap: 20px;
padding-bottom: 40px;
`;
export const SigninLabel = styled(Title)`
position: absolute;
background-color: rgba(255, 255, 255, .75);
padding-right: 15px;
`;

function Signin() {
    const [values, setValues] = useState({
        email: "",
        password: "",
        error: "",
        loading: false,
        redirectToReferrer: false,
    });

    const {email, password, loading, error, redirectToReferrer} = values;
    const {user} = isAuthenticated();

    const handleChange = name => event => {
        setValues({...values, error: false, [name]:event.target.value});
    };

    const clickSubmit = event => {
        event.preventDefault();
        setValues({...values, error: false, loading: true});
        signin({email, password})
        .then(data => {
            if(data.error) {
                setValues({...values, error: data.error, loading: false});
            } else {
                authenticate(data, () => {
                    setValues({
                        ...values,
                        redirectToReferrer: true
                    });
                });
            }
        });
    };

    const signUpForm = () =>(
        <form>
        <div className="form-group">
             <label className="text-muted">Email: </label>
              <input onChange={handleChange('email')} type="email" 
              className="form-control" value={email}/>
        </div>
         <div className="form-group">
             <label className="text-muted">Password: </label>
              <input onChange={handleChange('password')} type="password" 
              className="form-control" value={password}/>
        </div>
        <button onClick={clickSubmit} className="btn btn-primary">Submit</button>
       <div> <Link to="/signup">Click here to register...</Link></div>
        </form>
    );

    const showError = () => (
        <div className="alert alert-danger" style={{display: error ? '' : 'none'}}>
            {error}
        </div>
    );

    const showLoading = () => 
       loading && (
       <div className="alert alert-info">
           <h2>Loading...</h2>
       </div>
    );

    const redirectUser = () => {
        if(redirectToReferrer){
            if(user && user.role ===1){
                return <Redirect to="/admindash"/>;
            } else{
                return <Redirect to="/"/>;
            }
        }
        // if(isAuthenticated()){
        //  return <Redirect to="/" />;
        // }
    };


  return (
    <>
    <GlobalStyle/>
    <FoodDialog/>
    <Navbar/>
    <Banner/>
    <SigninGrid>
        <SigninLabel>
            Please Sign-in!
    {showLoading()}
    {showError()}
    {signUpForm()}
    {redirectUser()}
    </SigninLabel>
    </SigninGrid>

   </>
  );
}

export default Signin;
