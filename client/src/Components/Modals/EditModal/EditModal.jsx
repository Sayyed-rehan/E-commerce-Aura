import { Icon } from '@iconify/react';
import { Box, Button, CircularProgress, Fade, IconButton, LinearProgress, Modal, Stack, TextField, Typography } from '@mui/material'
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { currentUser } from '../../../utils/CurrentUser';
import "./EditModal.css"
import swal from 'sweetalert';
import { motion } from 'framer-motion';

const EditModal = ({profileImg}) => {

    const [isModalOpen, setisModalOpen] = useState(false);
    const [editImg, seteditImg] = useState("")
    const [selectedImage, setselectedImage] = useState()
    const [loading, setloading] = useState(false)

    const getProfile=async()=>{
        const res = await axios.get(`http://localhost:5000/user/${currentUser._id}`)
        seteditImg(res.data.profileImg)
    }

    console.log(editImg);

    const styles = { position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", width: "auto", bgcolor: "background.paper", 
    boxShadow: 24, p: 4, borderRadius: 4,};

    const handleInput = (e)=>{
        seteditImg(e.target.value)
    }

    const handleEdit= async()=>{
        const res = await axios.patch(`http://localhost:5000/user/${currentUser._id}`,{
            profileImg:editImg
        })
        await swal("Profile Image Updated", "", "success");
        window.location.reload()
    }


    const handleDelImg = async()=>{
        const res = await axios.patch(`http://localhost:5000/user/deleteImg/${currentUser._id}`)
        console.log(res);
        await swal("Profile Image Removed ", "", "success");
        window.location.reload()
    }


  

    const handleSubmit =async()=>{
        
        setloading(true)
        const formdata = new FormData()
        formdata.append("file", selectedImage)
        formdata.append("upload_preset", "fyoxgo1g")

        const res = await axios.post("https://api.cloudinary.com/v1_1/djcmzcqdc/image/upload", formdata)
        console.log(res.data.url);
        seteditImg(res.data.url)

        const resImg = await axios.patch(`http://localhost:5000/user/${currentUser._id}`,{
            profileImg:res.data.url
        })
        
        
        setloading(false)
        await swal("Profile Image Updated", "", "success")
      
     
        console.log(resImg.data);

        window.location.reload()
    }

    const handeClose = ()=>{
        setisModalOpen(false)
        setloading(false)
    }


    useEffect(()=>{
        getProfile()
    },[])

  return (
    <div>
        <Box component={motion.div} whileHover={{scale:1.3}} sx={{cursor:"pointer"}}>
        <Icon icon="akar-icons:edit" fontSize='20px' color='black' onClick={()=>setisModalOpen(true)}  />
        </Box>

        
        <Modal open={isModalOpen} onClose={handeClose} className='order-modal'>
            <Box sx={styles}>
                <Box className="edit-header">
                    <Typography fontWeight='bold' variant='h6' fontFamily='poppins'>Edit Profile Image</Typography>
                </Box>
                <Box className="b1">
                    <Typography fontFamily='poppins' fontWeight='bold' variant='body1' >Profile Image Url</Typography>
                    <Stack direction='row' spacing={3} sx={{display:"flex", alignItems:"center"}}>
                    <Box sx={{display:"flex", flexDirection:"column", gap:"10px"}}>
                    <TextField value={editImg} disabled size='small'   multiline maxRows={4} fullWidth/>
                    <TextField type='file' onChange={(e)=>setselectedImage(e.target.files[0])} helperText="Please upload Image here"/>
                    </Box>
                    { editImg && editImg!==""?
                    <Box  component={motion.div} whileHover={{scale:1.3}} sx={{cursor:"pointer"}}>
                    <Icon icon="fluent-delete-24-regular" fontSize='25px' color='#F24E1E' onClick={handleDelImg}/>
                    </Box>
                    :<Icon icon="fluent-delete-24-regular" fontSize='25px' color='grey' />}
                    </Stack>
                </Box>
                <Box className="edit-img-button">
                {/* <Button onClick={handleEdit} variant='contained'>Save Changes</Button> */}

                {loading==true? <CircularProgress/>
                :<Button onClick={handleSubmit} variant='contained' disabled={!selectedImage }>Submit</Button>
                }
                    
                </Box>

                <Box className="upload">
                    {/* <input type='file' onChange={(e)=>setselectedImage(e.target.files[0])}/>   */}
                </Box>
            </Box>

        </Modal>
    </div>
  )
}

export default EditModal