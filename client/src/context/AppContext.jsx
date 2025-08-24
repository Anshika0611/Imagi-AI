// These are state variables that are used more than once at different places
import { createContext,useEffect,useState } from "react";
import React from 'react'
import {toast} from 'react-toastify'
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const AppContext = createContext()
 const AppContextProvider = (props) => {
    const [logged,setLogged]=useState(false) //checks if user is logged in or not
    const [showLogin,setShowLogin]=useState(false)
    // we will access token from browser local storage to enable login and registration
    const [token,setToken]= useState(localStorage.getItem('token'))

    const [credit,setCredit]=useState(false)
    const navigate=useNavigate()

    // we will add the backend url here so that it can be used throughout the app
    const backendUrl = import.meta.env.VITE_BACKEND_URL;

    // this will load the data from the api
    const loadCredisData=async()=>{
        try {
            const {data} =await axios.get(backendUrl+'/api/user/credits',{headers:{token}})
            
            if(data.sucess){
                setCredit(data.credits)
                setLogged(data.user)
        }
     } catch (error) {
            console.log(error);
            toast.error(error.message)
            
        }
    }
    const generateImage=async(prompt)=>{
        try {
            const {data}=await axios.post(backendUrl+'/api/image/generate-image',{prompt},{headers:{token}})

            if(data.sucess){
                loadCredisData()
                return data.resultImage
            }else{
                toast.error(data.message)
                loadCredisData()
                if(data.creditBalance===0){
                    navigate('/buy')
                }
            }
        } catch (error) {
            console.log(error);
            toast.error(error.message)
            
        }
    }
    

    const logout=()=>{
        localStorage.removeItem('token')
        setToken(' ')
        setLogged(null)
    }
    useEffect(()=>{
        if(token){
            loadCredisData()
        }
    },[token])

    const value = {
        logged,setLogged,showLogin,setShowLogin,backendUrl,token,setToken,credit,setCredit,loadCredisData, logout,generateImage
    }

   return (
       <AppContext.Provider value={value}>
           {props.children}
       </AppContext.Provider>
   )

}
export default AppContextProvider;

