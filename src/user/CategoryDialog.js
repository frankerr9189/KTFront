import React from 'react';
import styled from 'styled-components';
import { DashLabel } from './dashlinkhelper';

const CDialog = styled.div`
width: 500px;
height: 1000px;
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
    </CDialog>
    </>
    );
}