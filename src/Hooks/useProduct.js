import {useState} from 'react';

export function useProduct(){
    const [productWin, setProductWin] = useState();
    return { productWin, setProductWin}
}