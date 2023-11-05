import React, { useEffect, useState } from 'react'
import "./Profile.css"
import { Avatar, Badge, Box, Button, Chip, Menu, MenuItem, Stack, Typography } from '@mui/material'
import axios from 'axios'
import { currentUser } from '../../utils/CurrentUser'
import { Icon } from '@iconify/react'
import EditModal from '../Modals/EditModal/EditModal'
import EditContentModal from '../Modals/EditContentModal/EditContentModal'
import { motion } from 'framer-motion'
import { addedToCart } from '../../utils/AddedToCart'
import { useNavigate } from 'react-router-dom'
import Authentication from '../../utils/Authentication'

const Profile = () => {

    const nav = useNavigate()

    const [userData, setuserData] = useState([])
    const [userAddresData, setuserAddresData] = useState([])


    const fetchUserDetails = async()=>{
        const res = await axios.get(`http://localhost:5000/user/${currentUser._id}`)
        setuserData(res.data)
        setuserAddresData(res.data.all_address)
    }


    const checkProfile = ()=>{

        if(userData.profileImg){
            return <Avatar alt="Remy Sharp" src={userData.profileImg} sx={{width:"55px", height:"55px"}} />
        }if(currentUser && currentUser.name){
            return <Avatar  sx={{ width: 55, height:55, cursor:"pointer", bgcolor:"#ef5350" }} >{currentUser.name.split("",1)}</Avatar>
        }
    }

    console.log(userData.profileImg);


    const rightSideCheckProfile = ()=>{

        if(userData.profileImg){
            return <Avatar alt="Remy Sharp" src={userData.profileImg} onClick={handleClick} sx={{width:"35px", height:"35px"}} />
        }if(currentUser && currentUser.name){
            return <Avatar  sx={{ width: 35, height:35, cursor:"pointer", bgcolor:"#ef5350" }} onClick={handleClick} >{currentUser.name.split("",1)}</Avatar>
        }
    }


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
        window.location.href="/"
    }
    



    useEffect(()=>{
        fetchUserDetails()
        Authentication()
    },[])

  return (
    <div>
        <Box className="profile-container" >
            <Box className="profile-header">
                <Typography variant='h4' fontWeight='bold' fontFamily='poppins'>Profile</Typography>
                <Box sx={{display:"flex", flexDirection:"row", gap:"15px", mt:"5px", alignItems:"center", ml:"-15px"}}>
                <Badge badgeContent={addedToCart && currentUser ?addedToCart.length:null} color="info" sx={{cursor:"pointer"}} component={motion.div} whileHover={{scale:1.2}}>
                <Menu id="basic-menu" anchorEl={anchorEl} open={open} onClose={handleClose} MenuListProps={{'aria-labelledby': 'basic-button',}} >
                <MenuItem onClick={()=>nav("/profile")}>Profile</MenuItem>
                <MenuItem onClick={handleLogout}>Logout</MenuItem>
                </Menu>
                <Icon icon="akar-icons:cart" width='25px' onClick={()=>nav("/cart")}  />
                </Badge>
                {rightSideCheckProfile()}
                </Box>
            </Box>

            <Stack className='profile-stack' spacing={2}>
                <Box className="profile-img">
                    {checkProfile()}
                    <EditModal profileImg={userData && userData.length>0? userData.profileImg:""}/>
                </Box>

                <Box className="profile-details" boxShadow={12}>
                    <Stack direction='row' spacing={4}>
                   
                    <Typography variant='subtitle2' fontFamily='poppins'>
                    <strong>Name - </strong> {currentUser?.name}
                    </Typography>

                    <Typography variant='subtitle2' fontFamily='poppins'>
                    <strong>Contact No.</strong> {currentUser?.contact}
                    </Typography>

                    <Typography variant='subtitle2' fontFamily='poppins'><strong>Email Address</strong> {currentUser?.email}</Typography>
                 
                    </Stack>

                    {/* <Stack direction="row" spacing={4}>
                    <Typography variant='body2' fontFamily='poppins'><strong>Address - </strong> 
                    {userData && userData.length>0? userData.all_address.city:"Not available"}
                    </Typography>
                    <Typography variant='body2' fontFamily='poppins'><strong>City </strong>
                    {userAddresData && userAddresData.length>0? userAddresData[0].city:"Not available"}
                    </Typography>
                    <Typography variant='body2' fontFamily='poppins'><strong>State </strong>
                    {userAddresData && userAddresData.length>0? userAddresData[0].state:"Not available"}
                    </Typography>
                    </Stack> */}

                        {userAddresData && userAddresData.length>0?
                         userAddresData.map((x,i)=>(
                    <Stack direction='row' spacing={4}>
                             <Typography variant='subtitle2' fontFamily='poppins'><strong>City - </strong>  {x.city}</Typography>
                             <Typography variant='subtitle2' fontFamily='poppins'><strong>Address - </strong>  {x.address}</Typography>
                             <Typography variant='subtitle2' fontFamily='poppins'><strong>State - </strong>  {x.state}</Typography>
                             <Typography variant='subtitle2' fontFamily='poppins'><strong>Pincode - </strong>  {x.pincode}</Typography> 
                    </Stack>
                        )): "Not data available"}


                    <Box className="proifle-button">
                        <EditContentModal />
                    </Box>
                  
                </Box>
            </Stack>
        </Box>
    </div>
  )
}

export default Profile