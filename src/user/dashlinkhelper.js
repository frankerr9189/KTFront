import styled from "styled-components";
import {Title} from "../Styles/title";

export const DashLinkGrid = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 20px
`;

export const DashLabel = styled(Title)`
position: absolute;
background-color: rgba(255, 255, 255, .75);
padding: 5px;
`;

export const DashLink = styled.div`
    height: 100px;
    padding: 10px;
    font-size: 20px;
    background-image: url("img/shark.jpeg");
    background-position: center;
    background-size: cover;
    filter: contrast(50%);
    border-radius: 10px;
    margin-top: 5px;
    transition-property: box-shadow margin-top filter;
    transition-duration: .2s;
    box-shadow: 0px 0px 4px 0px grey;
    &:hover {
        cursor: pointer;
        filter: contrast(100%);
        margin-top: 0px;
        margin-bottom: 5px;
        box-shadow: 0px 5px 15px 0px grey;
    }
`