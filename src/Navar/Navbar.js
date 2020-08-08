import React, {Fragment} from 'react';
import {useHistory} from 'react-router-dom'
import styled from 'styled-components';
import {seaBlue} from "../Styles/colors";
import {Title} from "../Styles/title";
import {Link, withRouter} from 'react-router-dom';
import {signout, isAuthenticated} from "../auth";

const NavbarStyled = styled.div`
    background-color: ${seaBlue};
    padding: 10px;
    position: fixed;
    width: 100%;
    z-index: 999;
`

const Logo = styled(Title)`
font-size: 20px;
color: white;
text-shadow: 1px 1px 4px #380503;
`
const LogoSignin = styled(Title)`
font-size: 20px;
color: white;
text-shadow: 1px 1px 4px #380503;
text-align: right; 
padding-right: 30px;
`
const {user} = isAuthenticated();

export function Navbar() {
    const history = useHistory();
    return <NavbarStyled>
        <>
        <Logo>
            Koastal-Technologies <span role="img" aria-label="KT">🍻</span>

           {/* {isAuthenticated() && isAuthenticated().user.role === 0 && (
           <Link
           className="nav-link"
           to="/dashboard"
           >
           Dashboard
           </Link>
           )} */}
           {'   '}
           

           {isAuthenticated() && isAuthenticated().user.role === 1 && (
        <Link
            className="nav-link"
            style={{cursor: "pointer", color: "#ffffff"}}
            to="/admindash"
            >
           Dashboard
        </Link>
         )}
          
          {'        '}
          
            <LogoSignin>
               {!isAuthenticated() &&(
                   <Link
                   to="/signin">Sign-in</Link>
                   
               )}
                

            {isAuthenticated() && (
                <Fragment>
            <li className="nav-item">
            {"Hello "}{user && user.name}{"!    "}
                <span
                className="nav-link"
                style={{cursor: "pointer", color: "#ffffff"}}
                onClick={() =>
                    signout(() => {
                        history.push("/"); localStorage.clear();
                    })
                }
                >
                    Signout 
                </span>
                
            </li>
            </Fragment>
            )}
            </LogoSignin>
               </Logo>
               </>
    </NavbarStyled>;
}