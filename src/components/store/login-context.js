import React, { useState } from "react";

const LoginContext=React.createContext({
    token: '',
    isLoggedIn: false,
    login:(token)=>{},
    logout:()=>{},
})

export const LoginContextProvider=(props)=>{
    const [token,setToken]=useState(null)

    const userIsLoggedIn=!!token;

    const loginHandler=(token)=>{
        setToken(token)
    }
    const logoutHandler=()=>{
        setToken(null)
    }

    const contextValue={
        token:token,
        isLoggedIn:userIsLoggedIn,
        login:loginHandler,
        logout:logoutHandler,
    }

    return <LoginContext.Provider value={contextValue}>{props.children}</LoginContext.Provider>
}

export default LoginContext;