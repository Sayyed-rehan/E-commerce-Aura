import React, { useEffect, useState } from 'react'
import "./EditContentModal.css"
import { Box, Button, Chip, CircularProgress, Fade, InputAdornment, Modal, Stack, TextField, Typography } from '@mui/material'
import { Icon } from '@iconify/react';
import axios from 'axios';
import { currentUser } from '../../../utils/CurrentUser';
import { motion } from 'framer-motion';
import validator from 'validator';
import swal from 'sweetalert';

const EditContentModal = (props) => { 

    
    const [isModalOpen, setisModalOpen] = useState(false);
    const [userData, setuserData] = useState([])
    const [userAddresData, setuserAddresData] = useState([])


    const [inputAddress, setinputAddress] = useState({
        address:"", city:"", state:"", pincode:""
    })


    const styles = { position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", width: "auto", bgcolor: "background.paper", 
    boxShadow: 24, p: 4, borderRadius: 4,};

    const fetchUserDetails = async()=>{
        const res = await axios.get(`http://localhost:5000/user/${currentUser._id}`)
        setuserData(res.data)
        setuserAddresData(res.data.all_address)
    }

    const handleDeleteAddress= async(i)=>{

        await swal({
            title: "Are you sure to Delete Address?",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
        .then(async(willDelete)=>{
            if(willDelete){
                const res = await axios.patch(`http://localhost:5000/user/deleteAddress/${currentUser._id}/${i}`)
                swal("Address deleted Successfully","","success")
                window.location.reload()
                setisModalOpen(true)
            }else{
                swal("Address is safe")
            }
        })

    }

   
    const handleInput = (e)=>{
        setinputAddress({...inputAddress,[e.target.name]:e.target.value})

    }

    

    const check_Address = inputAddress.address? validator.isAlphanumeric(inputAddress.address, "en-IN", {ignore: '\s'}):true
    // console.log(check_Address);

    const check_City = inputAddress.city? validator.isAlpha(inputAddress.city, "en-IN", {ignore: '\s'}):true
    console.log(check_City);

    const check_State = inputAddress.state? validator.isAlpha(inputAddress.state, "en-IN", {ignore: '\s'}):true
    console.log(check_State);

    const check_Pin_Code = inputAddress.pincode? validator.isPostalCode(inputAddress.pincode, "IN"):true
    // console.log('ass',check_Pin_Code);

    const handleSaveChanges = async()=>{
        const res = await axios.patch(`http://localhost:5000/user/${currentUser._id}`,{
            all_address:{
                address:inputAddress.address,
                city:inputAddress.city,
                state:inputAddress.state,
                pincode:inputAddress.pincode
              }
        })
        await swal("Address Added Successfully", "", "success")
        window.location.reload()
        console.log(res.data);
    }

    const handleModalClose = ()=>{
        setisModalOpen(false)
        setisEditActive({edit:false})
        setinputAddress({address:"", city:"",state:"", pincode:""})
    }


    const [isEditActive, setisEditActive] = useState({
        edit:false, index:""})
        const handleUpdateAddress =(i,city, address, state, pincode)=>{
        setisEditActive({edit:true, index:i})
        setinputAddress({city:city, address:address, state:state, pincode:pincode})
    }

  

   
    // update user address
    const handleEditButton = async()=>{

        const res = await axios.patch(`http://localhost:5000/user/updateOneAddress/${currentUser._id}/${isEditActive.index}`,{
            address: inputAddress.address,
            city: inputAddress.city,
            state: inputAddress.state,
            pincode: inputAddress.pincode
        })
        console.log(res.data);
        
        await swal("Address Updated Successfully", "", "success")
      
        window.location.reload()
    }

   



    useEffect(()=>{
        fetchUserDetails()
    },[])

  return (
    <div >
        <Box className="edit-profile-button" component={motion.div} whileHover={{scale:1.2}}>
        <Chip label="Edit Profile" size='medium' sx={{bgcolor:"#8A8AF4", color:"white", pl:"15px", pr:"15px", fontWeight:"bold"}} onClick={()=>setisModalOpen(true)}/>
        </Box>

        <Modal open={isModalOpen} onClose={handleModalClose} className='order-modal' >
            <Box sx={styles} >
                <Box className="edits-header">
                    <Typography fontWeight='bold' variant='h5' fontFamily='poppins'>Edit Profile</Typography>
                </Box>

                <Box className="edit-content">
                    <Stack className="r1" direction='row' spacing={4}>

                        <Box className="r1b1" >
                            <Typography fontWeight='bold' variant='subtitle2' fontFamily='poppins' sx={{display:"flex", alignItems:"center", gap:"2px"}}>
                            <Icon icon="octicon:person-16" fontSize='17px' color='#F24E1E' />
                                Name</Typography>
                            <Typography variant='subtitle2' fontFamily='poppins' sx={{ml:"20px"}}>{userData.name}</Typography>
                        </Box>
                        <Box className="r1b1">
                            <Typography fontWeight='bold' variant='subtitle2' fontFamily='poppins' sx={{display:"flex", alignItems:"center", gap:"2px"}}>
                            <Icon icon="fluent:call-24-regular" fontSize='20px' color='#699BF7' />
                                Contact</Typography>
                            <Typography variant='subtitle2' fontFamily='poppins' sx={{ml:"20px"}}>{userData.contact}</Typography>
                        </Box>
                        <Box className="r1b1">
                            <Typography fontWeight='bold' variant='subtitle2' fontFamily='poppins' sx={{display:"flex", alignItems:"center", gap:"2px"}}>
                            <Icon icon="eva:email-outline" fontSize='20px' color='#0FA958' />
                                Email Address</Typography>
                            <Typography variant='subtitle2' fontFamily='poppins' sx={{ml:"20px"}}>{userData.email}</Typography>
                        </Box>
                    </Stack>
                    
                    <Stack className="r2" spacing={3}>
                    {userAddresData && userAddresData.length>0?
                         userAddresData.map((x,i)=>(
                        <Stack direction='row' spacing={4}>
                            {/* <Typography variant='subtitle2' fontFamily='poppins'>{i+1}</Typography> */}
                             <Typography variant='subtitle2' fontFamily='poppins' ><strong>City - </strong>{x.city}</Typography>
                             <Typography variant='subtitle2' fontFamily='poppins'><strong>Address - </strong>{x.address}</Typography>
                             <Typography variant='subtitle2' fontFamily='poppins'><strong>State - </strong>{x.state}</Typography>
                             <Typography variant='subtitle2' fontFamily='poppins'><strong>Pincode - </strong>{x.pincode}</Typography>
                             <Box >
                            <Stack direction='row' spacing={2}>
                            <Box component={motion.div} whileHover={{scale:1.3}} sx={{cursor:"pointer"}}>
                             <Icon icon="akar-icons:edit" fontSize='25px' color='#699BF7' 
                             onClick={()=>handleUpdateAddress(i,x.city, x.address,x.state,x.pincode)}/> 
                             </Box>
                             <Box component={motion.div} whileHover={{scale:1.3}} sx={{cursor:"pointer"}}>
                             <Icon icon="fluent:delete-24-regular" fontSize='25px' color='#F24E1E' onClick={()=>handleDeleteAddress(i)}/> 
                             </Box>
                             </Stack>
                             </Box>
                            
                        </Stack>
                        )): "Not data available"}
                    </Stack>

                    <Stack className="r3" spacing={2} sx={{mt:"15px"}}>
                        <Typography fontFamily='poppins' fontWeight='bold' variant='subtitle1' >
                           {isEditActive.edit===false ? "Add Address":"Edit Address"}
                        </Typography>
                        <TextField label='Address' placeholder='Please enter address here...' size='small' value={inputAddress.address} name='address'  helperText="Maximum 3 Address are allowed"
                            onChange={handleInput} error={check_Address === false || inputAddress.address.length>60} multiline
                        />
                        <Stack direction='row' spacing={2}>
                        <TextField label='City' placeholder='Please enter city here...' size='small' value={inputAddress.city} name='city' 
                        onChange={handleInput} sx={{width:"180px"}} error={check_City===false ||inputAddress.city.length>30}/>
                        <TextField label='State' placeholder='Please enter state here...' size='small' value={inputAddress.state} name='state' 
                        onChange={handleInput} sx={{width:"180px"}} error={check_State==false || inputAddress.state.length>20}/>
                        <TextField label='Pincode' placeholder='Please enter pincode here...' size='small' value={inputAddress.pincode} name='pincode' error={check_Pin_Code==false}
                       onChange={handleInput} sx={{width:"180px"}}/>
                        </Stack>
                    </Stack>

                    <Box className="save-button">
                        {isEditActive.edit===false? 
                        <Button variant='contained' size='small' onClick={handleSaveChanges} 
                        disabled={!inputAddress.address || !inputAddress.city || check_City===false || inputAddress.city.length>30 || check_Address==false 
                        || !inputAddress.state ||check_Address==false ||check_State==false
                        || !inputAddress.pincode || check_Pin_Code === false ||userAddresData && userAddresData.length>=4} >
                            Save Changes
                        </Button>
                        
                        :<Button onClick={handleEditButton} variant='contained'  
                        disabled={!inputAddress.address || !inputAddress.city ||check_City===false || inputAddress.city.length>30 || check_Address==false ||check_State==false
                            ||inputAddress.state.length>20 ||!inputAddress.state || !inputAddress.pincode || check_Pin_Code ===false}>
                            Edit Address
                        </Button>}
                      
                    </Box>
                </Box>
            </Box>
        </Modal>
    </div>
  )
}

export default EditContentModal