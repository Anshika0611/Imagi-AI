import React ,{useContext} from 'react'
import Home from './pages/Home'
import Result from './pages/Result'
import BuyCredit from './pages/BuyCredit'
import {Routes,Route} from 'react-router-dom'
import Navbar from './Components/Navbar'
import Footer from './Components/Footer'
import Login from './Components/Login'
import { AppContext } from './context/AppContext'

const App = () => {
  const {showLogin}=useContext(AppContext)
  return (
    <div className='px-4 sm:px-10 md:px-14 lg:px-28 min-h-screen bg-gradient-to-b from-teal-50 to-orange-50'>
      <Navbar/>
      {showLogin && <Login/>}
      <Routes>
        <Route path='/' element={<Home />}>
        </Route>
        <Route path='/result' element={<Result/>}>
        </Route>
        <Route path='/buy' element={<BuyCredit/>}>
        </Route>
      </Routes>
     <Footer />
      
    </div>
  )
}

export default App
