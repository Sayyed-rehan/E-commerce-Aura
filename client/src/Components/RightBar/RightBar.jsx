import React, { useEffect, useState } from 'react'
import "./RightBar.css"
import {Box, Stack, Typography, Avatar, Link, Badge, Menu, MenuItem, Card, CardMedia}from '@mui/material'
import stud from "../../Images/stud.png"
import { Icon } from '@iconify/react';
import { currentUser } from '../../utils/CurrentUser';
import {useSelector}from "react-redux"
import axios from 'axios';
import {useLocation, useNavigate, useParams}from "react-router-dom"
import { motion } from 'framer-motion';
import { addedToCart } from '../../utils/AddedToCart';
import swal from 'sweetalert';
import { Scale } from '@mui/icons-material';
import { green } from '@mui/material/colors';

const RightBar = () => {

    const nav = useNavigate()

    let {pid} = useParams()
    const ass = pid?.split(":")
    const location = useLocation();

  


    const [user, setuser] = useState({
        img:""
    })



    const checkProfile = ()=>{

        if(user.img){
            return <Avatar alt="Remy Sharp" src={user.img}  onClick={handleClick} sx={{cursor:"pointer"}}/>
        }if(currentUser && currentUser.name){
            return <Avatar  sx={{ width: 35, height: 35, cursor:"pointer", bgcolor:"#ef5350" }}  onClick={handleClick}>{currentUser.name.split("",1)}</Avatar>
        }if(!currentUser){
            return (
                <>
                <Stack direction='row' spacing={1}>
                <Typography>Hello there</Typography>
                <Link onClick={()=>nav("/login")} sx={{cursor:"pointer", display:"flex", alignItems:"center"}} underline='false' component={motion.div} whileHover={{scale:1.1}}>
                <Icon icon="majesticons:login-line" width='20px' onClick={()=>nav("/cart")}  />
                    Login</Link> 
                </Stack>
                </>
            )
        }
    }
    

    const user_data=async()=>{

        const res = await axios.get(`/user/${currentUser._id}`)
        // console.log(res.data.profileImg)
        setuser({img:res.data.profileImg})
    }

    // console.log(user.img);

    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
      setAnchorEl(null);
    };

    const handleLogout=async()=>{
        await swal("Logout Successful", "thanks for comming", "success");
        localStorage.removeItem("currentUser");
        window.location.reload()
        window.location.href="/"
    }

    const [studData, setstudData] = useState([])

    const data = useSelector(state=>state.Product.data)

    const fetchStudShoes=async()=>{
        const res = await axios.get("/product/findByQuery?category=stud")
        // const brandres = await axios.get(`/product/findByBrand?brand=${data?.brand}`)
        const brandres = await axios.get(`/product/findByBrand?brand=${data?.brand}&page=${1}&limit=6`)
      
        location.pathname==="/"?    setstudData(res.data):  setstudData(brandres.data.data)

    }

    


    const handleAddToCart = async(x)=>{

        const data = await axios.get(`/product/findById/${x}`)
        console.log(data.data.product_img);
    
        const listObkect ={
            product_id:x,
            product_name:data.data.product_name,
            product_img: data.data.product_img,
            price: data.data.price,
            sub_category: data.data.sub_category,
            qty:  1,
          }
        
    
          const exitingList = JSON.parse(localStorage.getItem('Cart')) || []
          exitingList.push(listObkect)
          
          localStorage.setItem("Cart", JSON.stringify(exitingList))
          await swal("Added to Cart!", "", "success");
          window.location.href="/"
          window.location.reload()
    }

    // console.log('qqq',user.all_address);
    
    

    useEffect(()=>{
        user_data()
        fetchStudShoes()
    },[data])

  return (
    <div>
        <Box className="rightbar-container">
            <Stack>
                <Box className="cart-avatar" >
                <Badge badgeContent={addedToCart && currentUser ?addedToCart.length:null} color="info" sx={{cursor:"pointer"}} component={motion.div} whileHover={{scale:1.2}}>
                <Menu id="basic-menu" anchorEl={anchorEl} open={open} onClose={handleClose} MenuListProps={{'aria-labelledby': 'basic-button',}} >
                <MenuItem onClick={()=>nav("/profile")}>Profile</MenuItem>
                <MenuItem onClick={handleLogout}>Logout</MenuItem>
                </Menu>
                {currentUser ?
                <Box component={motion.div} whileHover={{scale:1.2}}>
                 <Icon icon="akar-icons:cart" width='25px' onClick={()=>nav("/cart")}  />
                </Box>
                 : null}
                </Badge>
                {checkProfile()}
                </Box>
                <Box className="try-out" component={motion.div} whileHover={{scale:1.1}}>
                    <Stack direction='row'>
                        <Typography fontWeight='bolder' variant='h6'>Try out New Stud shoes here</Typography>
                        <img src={stud}/> 
                    </Stack>
                </Box>
                <Box className="studs" >
                    <Stack >
                        <Typography fontWeight='bold' variant='h6' sx={{mt:"20px", mb:"-20px"}}>
                            {location.pathname==="/"?"Ultimate choices here...":`Recomended ${data?.brand} shoes`}
                        </Typography>
                        <Box className="stud-shoes" >
                        {studData.map((x,i)=>{
                           if(i<5){
                            return(
                                <Stack direction='row' key={x._id} sx={{display:"flex", justifyContent:"space-between", mt:"30px"}} component={motion.div} whileHover={{scale:1.1}}>
                                    <Box >
                                    <Stack direction='row' spacing={1}>
                                    <img src={x.product_img} width='55px'/>
                                    <Box>
                                    <Typography fontWeight='bold' fontFamily='Poppins' >{x.brand}</Typography>
                                    <Typography>Price - {x.price}</Typography>
                                    </Box>
                                    </Stack>
                                    </Box>
                                    <Box sx={{display:"flex", alignItems:"center", cursor:"pointer"}} component={motion.div} whileHover={{scale:1.1}}>
                                        {currentUser?
                                    <Icon icon="zondicons:add-outline" color='#699BF7' width='25px'   onClick={()=>handleAddToCart(x._id)}   />
                                    :
                                    <Icon icon="zondicons:add-outline" color='grey' width='25px'/>}
                                    </Box>
                                    </Stack>
                                )
                                    
                            }
                                       
                        })} 
                        </Box>
                    </Stack>
                </Box>
            </Stack>
        </Box>
    </div>
  )
}

export default RightBar
