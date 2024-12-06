
import { useEffect, useState } from "react";

export const useDebounce = (value, delay)=>{
    const [valueDbounce, setValueDebounce] = useState('') 
    useEffect(()=>{
        const handle = setTimeout(()=>{
            setValueDebounce(value)
        },[delay])
        return ()=>{
            clearTimeout(handle)
        }
    },[setValueDebounce])

    return valueDbounce
}