import styled from "styled-components";
import {Title} from "../Styles/title";

export const DashLinkGrid = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 20px
`
export const DashLabel = styled(Title)`
position: absolute;
background-color: rgba(255, 255, 255, .75);
padding: 5px;
`;

export const DashLink = styled(Title)`
    height: 100px;
    padding: 10px;
    font-size: 20px;
    background-image: url("img/shark.jpeg");
    background-position: center;
    background-size: cover;
    filter: contrast(70%);
    border-radius: 10px;
    box-shadow; 0px 0px 10px 0px grey;
`