import React, { useState } from "react";

const LoginContext=React.createContext({
    token: '',
    isLoggedIn: false,
    login:(token)=>{},
    logout:()=>{},
})

export const LoginContextProvider=(props)=>{
    const initailToken=localStorage.getItem('token')
    const [token,setToken]=useState(initailToken)

    const userIsLoggedIn=!!token;

    const loginHandler=(token)=>{
        setToken(token)
        localStorage.setItem('token',token);
    }   
    const logoutHandler=()=>{
        setToken(null)
        localStorage.removeItem('token')
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