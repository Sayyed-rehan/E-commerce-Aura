import React, { useEffect, useState } from 'react'
import {BrowserRouter, Routes, Route, Outlet, useLocation, useParams}from 'react-router-dom'
import { Grid }from '@mui/material'
import Navbar from '../../Components/Navbar/Navbar'
// import ComA from '../../ComA'
// import ComB from '../../ComB'
import { currentUser } from '../../utils/CurrentUser'
import RightBar from '../../Components/RightBar/RightBar'
import RightOrder from '../../Components/RightOrder/RightOrder'
import { useSelector, useDispatch } from 'react-redux'
// import RecomededR from '../../Components/RecomededR/RecomededR'

const Home = () => {
  const location = useLocation();

  let {pid} = useParams()
  // console.log('asss',pid);


  // const [gridSize, setgridSize] = useState(2.5)
  

  const condination=()=>{
    if(location.pathname==="/"){
      return <RightBar/>
    }
    if(location.pathname==='/cart'){
      return <RightOrder/>
    }
    if(location.pathname==='/a'){
      return <ComB/>
    }if(location.pathname===`/reomended/${pid}`){
      return <RightBar/>
    }
  }

 

  const middleGrid = ()=>{
    if(location.pathname==="/"){
      return 7
    }if(location.pathname==="/cart"){
      return 6
    }if(location.pathname==="/profile"){
      return 5
    }if(location.pathname==="/orderhistory"){
      return 9.5
    }if(location.pathname===`/reomended/${pid}`){
      return 7
    }if(location.pathname==='/contactus'){
      return 9.5
    }
  }


  const rightGrid = ()=>{
    if(location.pathname==="/"){
      return 2.5
    }if(location.pathname==="/cart"){
      return 3.5
    }if(location.pathname==="/profile"){
      return 4.5
    }if(location.pathname==="/orderhistory"){
      return 0
    }if(location.pathname===`/reomended/${pid}`){
      return 2.5
    }if(location.pathname==='/contactus'){
      return 0
    }
  }

 

  


// console.log(location.pathname);

  return (
    <div>
    

      <Grid container>
        <Grid item sx={{bgcolor:"white", display:{md:"flex",sm:"none", xs:"none"} }}  xs={2.5} >
          <Navbar/>
        </Grid>

        <Grid item sx={{bgcolor:""}} xs={middleGrid()}>
          <Outlet/>
        </Grid>

        
        <Grid item sx={{bgcolor:"",display:{lg:"flex", md:"flex", sm:"none", xs:"hidden"} }} xs={rightGrid()}>
         {condination()}
        </Grid>
       
        
      </Grid>



    </div>
  )
}

export default Home