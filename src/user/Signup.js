import React, {useState} from 'react';
import {Link} from 'react-router-dom';
import {Navbar} from '../Navar/Navbar';
import {Banner} from "../Banner/Banner";
import {GlobalStyle} from "../Styles/GlobalStyle";
import {FoodDialog} from "../FoodDialog/FoodDialog";
import styled from "styled-components";
import {Title} from "../Styles/title";
import {signup} from '../auth';

export const SigninGrid = styled.div`
display: grid;
grid-template-columns: 1fr;
gap: 20px;
padding-bottom: 40px;
`;
export const SigninLabel = styled(Title)`
position: absolute;
background-color: rgba(255, 255, 255, .75);
padding: 5px;
`;

function Signup() {
    const [values, setValues] = useState({
        name: "",
        email: "",
        password: "",
        error: "",
        success: false,
    });

    const {name, email, password, success, error} = values;
 //   const {user} = isAuthenticated();
 

    const handleChange = name => event => {
        setValues({...values, error: false, [name]:event.target.value});
    };

    const clickSubmit = event => {
        event.preventDefault();
         setValues({...values, error: false, loading: true});
         signup({name, email, password})
          .then(data => {
              if(data.error) {
              setValues({...values, error: data.error, success: false});
              } else {
        //          authenticate(data, () => {
                      setValues({
                          ...values,
                          name: '',
                          email: '',
                          password: '',
                          error: '',
                          success: true
        //                  redirectToReferrer: true
                      });
        //          });
             }
          });
     };

    const signUpForm = () =>(
        <form>
         <div className="form-group">
             <label className="text-muted">Name</label>
              <input onChange={handleChange('name')} type="name" 
              className="form-control" value={name}/>
        </div>
        <div className="form-group">
             <label className="text-muted">Email</label>
              <input onChange={handleChange('email')} type="email" 
              className="form-control" value={email}/>
        </div>
         <div className="form-group">
             <label className="text-muted">Password</label>
              <input onChange={handleChange('password')} type="password" 
              className="form-control" value={password}/>
        </div>
        <button onClick={clickSubmit} className="btn btn-primary">Submit</button>
        </form>
    );

     const showError = () => 
         (
         <div className="alert alert-danger" style={{display: error ? '' : 'none'}}>
             {error}
         </div>);
     const showSuccess = () => (
        <div className="alert alert-danger" style={{display: success ? '' : 'none'}}>
            New Account Created. Please <Link to="/signin">Signin...</Link>
        </div>
    );

    
  return (
    <>
    <GlobalStyle/>
    <FoodDialog/>
    <Navbar/>
    <Banner/>
    <SigninGrid>
        <SigninLabel>
        Please Register!

        {showSuccess()}
        {showError()}
    {signUpForm()}
    </SigninLabel>
    </SigninGrid>

   </>
  );
}

export default Signup;
