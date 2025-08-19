// These are state variables that are used more than once at different places
import { createContext,useState } from "react";

import React from 'react'

export const AppContext = createContext()
 const AppContextProvider = (props) => {
    const [logged,SetLogged]=useState(null) //checks if user is logged in or not
    const [showLogin,setShowLogin]=useState(false)

    const value = {
        logged,SetLogged,showLogin,setShowLogin
    }

   return (
       <AppContext.Provider value={value}>
           {props.children}
       </AppContext.Provider>
   )

}
export default AppContextProvider;

