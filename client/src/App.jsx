import React from 'react'
import { BrowserRouter, Outlet, Route, Router, Routes}from 'react-router-dom'
import Sign from './Pages/Sign/Sign'
import Login from './Pages/Login/Login'
import Home from './Pages/Home/Home'
// import ComA from './ComA'
// import ComB from './ComB'

import Feed from './Components/Feed/Feed'
import {useSelector}from 'react-redux'
import Cart from './Components/Cart/Cart'
import Navbar from './Components/Navbar/Navbar'
import Profile from './Components/Profile/Profile'
// import Pagiantion from './Components/Pagiantion/Pagiantion'
// import OrderHistory from './Components/Modals/OrderModal/OrderHistory/OrderHistory'
import OrderHistory from "./Components/Modals/OrderHistory/OrderHistory"
import RecomendedM from './Components/RecomendedM/RecomendedM'
import ContactUs from './Components/ContactUs/ContactUs'
// import CollapsibleTable from './Components/Modals/OrderModal/OrderHistory/tets'

const App = () => {

  // const data = useSelector(state=>state.Product.value)|| null
  // console.log('test',data);


  
  return (
    <div>
      <BrowserRouter>
      <Routes>

        <Route path='/' element={<Home/>}>
          <Route index element={<Feed/>}/>
          <Route path='/cart' element={<Cart/>}/>
          <Route path='/profile' element={<Profile/>}/>
          <Route path='/orderhistory' element={<OrderHistory/>}/>
          <Route path='/reomended/:pid' element={<RecomendedM/>}/>
          <Route path='/contactus' element={<ContactUs/>}/>
          {/* <Route path='/b' element={<ComB/>}/> */}
        </Route>

        {/* <Route path='/pagiantion' element={<Pagiantion/>}/> */}

        <Route path='/sign' element={<Sign/>}/>
       
        <Route path='/login' element={<Login/>}/>
        
      </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App