import { createContext,useState } from "react";

import React from 'react'

export const AppContext = createContext()
 const AppContextProvider = (props) => {
    const [logged,SetLogged]=useState(null)
    const value = {
        logged,SetLogged
    }

   return (
       <AppContext.Provider value={value}>
           {props.children}
       </AppContext.Provider>
   )

}
export default AppContextProvider;

