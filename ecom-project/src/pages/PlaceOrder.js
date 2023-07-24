import Checkout from "../components/Checkout";
import {useState} from "react";
import {LinearProgress} from "@mui/material";

export default function PlaceOrder(){
    // loading simulation

    const [loading,setLoading] = useState(true)
    setTimeout(()=>{
        setLoading(false)
    },1000)

    if(loading){
        return <LinearProgress color="inherit" />
    }

    return <Checkout/>
}

