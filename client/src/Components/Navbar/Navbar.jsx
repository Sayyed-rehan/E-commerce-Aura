import React from 'react'
import {Box, Stack, Typography}from '@mui/material'
import {useNavigate}from 'react-router-dom'
import logo from "../../Images/logo.png"
import { Icon } from '@iconify/react';
import { currentUser } from '../../utils/CurrentUser'
import addidas from "../../Images/addidas.png"
import nike from "../../Images/nike.png"
import puma from "../../Images/puma.png"
import rebook from "../../Images/rebook.png"
import fila from "../../Images/fila.png"
import "./Navbar.css"
import {motion}from 'framer-motion'
import { useDispatch, useSelector } from 'react-redux';
import { fetchProductDataByPagination } from '../../redux/ProductSlice';


const Navbar = () => {

    const dispatch = useDispatch()
    // const page = useSelector(state=>state.Product.value)
    

    const nav = useNavigate()
 
    const handle_Click_Nav = ()=>{
        nav("/")
        // dispatch(fetchProductDataByPagination(page))   
    }


  return (
    <div className='heelo'>
        <Box className="nav-container">
            <Stack sx={{display:"flex", justifyContent:"center", alignItems:"center"}}>
                <Box className="nav-logo">
                    <img src={logo} alt='logo'  />
                </Box>

                <Box className="tabs" >
                    <Stack spacing={4}> 
                    <Stack direction='row' spacing={1} className='tabs-text'>
                        <Icon icon="ri:home-line" color='black' width='16px' spacing={1}/>
                        <motion.h4 onClick={()=>handle_Click_Nav()} whileHover={{scale:1.2}}>Home</motion.h4>
                    </Stack>
                    {currentUser? 
                    <>
                    <Stack direction='row' className='tabs-text' spacing={1}>
                        <Icon icon="akar-icons:person" width='16px' />
                        <motion.h4 onClick={()=>nav("/profile")} whileHover={{scale:1.2}}>Profile</motion.h4>
                    </Stack>

                    <Stack direction='row'  className='tabs-text' spacing={1}>
                        <Icon icon="octicon:history-16" width='15px' color='black' />
                        <motion.h4 onClick={()=>nav("/orderhistory")} whileHover={{scale:1.2}}>Order History</motion.h4>
                    </Stack>
                    </>
                        :null}

                    <Stack direction='row'  className='tabs-text' spacing={1}>
                        <Icon icon="tabler-message" color='black' width='16px'/>
                        <motion.h4 onClick={()=>nav("/contactus")} whileHover={{scale:1.2}}>Contact Us</motion.h4>
                    </Stack>
                    
                    </Stack>
                    
                </Box>


                <Box className="top-brands" >
                    <Stack  >
                    <Typography sx={{fontWeight:"bold"}} variant='h5' component={motion.h5}  whileHover={{ scale: 1.1}}>
                        Top Brands
                        </Typography>
                    <Box className="brand-img" boxShadow={12} >
                        <img src={addidas} alt='addidasimg' width='50px'/>
                        <img src={nike} alt='addidasimg' width='50px'/>
                        <img src={puma} alt='addidasimg' width='50px'/>
                        <img src={rebook} alt='addidasimg' width='50px'/>
                        <img src={fila} alt='addidasimg' width='50px'/>     
                    </Box>
                    </Stack>
                </Box>
            </Stack>
        </Box>
    </div>
  )
}           

export default Navbar