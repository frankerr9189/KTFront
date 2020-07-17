import {useState} from 'react';

export function useCategory(){
    const [categoryWin, setCategoryWin] = useState();
    return { categoryWin, setCategoryWin}
}