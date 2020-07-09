import React from 'react';
import styled from 'styled-components';
import {seaBlue} from "../Styles/colors";
import {Title} from "../Styles/title";
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
export function Navbar() {
    return <NavbarStyled>
        <Logo>
            Koastal-Technologies <span role="img" aria-label="KT">🍻</span>
        </Logo>
    </NavbarStyled>;
}