import {createContext} from "react";
import * as React from "react";

const Context = createContext('')

function ContextProvider(props) {

    const access_token = localStorage.getItem('access_token') || null
    const userDetails = JSON.parse(localStorage.getItem('userDetails'))
    const [isLoggedIn, setIsLoggedIn] = React.useState(access_token !== null)
    const context = {
        isLoggedIn,
        access_token,
        setIsLoggedIn,
        userDetails
    }
    return (
        <Context.Provider value={context}>
            {props.children}
        </Context.Provider>
    )
}

export {ContextProvider, Context}