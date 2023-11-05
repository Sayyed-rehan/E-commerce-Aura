import React, { useEffect, useState } from 'react'
import "./ReviewModal.css"
import { Box, Button, Chip, Link, Modal, Rating, Stack, TextField, Typography } from '@mui/material'
import { ChildCare } from '@mui/icons-material';
import axios from 'axios';
import { currentUser } from '../../../utils/CurrentUser';
import swal from 'sweetalert';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const ReviewModal = (prop) => {

    const nav = useNavigate()

    const [isModalOpen, setisModalOpen] = useState(false);
    const [reviews, setreviews] = useState({
        review:"", 
    })
    const [value, setValue] = useState(0);

    console.log(currentUser._id);
    console.log('sta',prop.product_id);


   
    console.log(reviews);
 

    const styles = { position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", width: "auto", bgcolor: "background.paper", 
    boxShadow: 24, p: 4, borderRadius: 4,};

    const handleInput=(e)=>{
        setreviews({...reviews,[e.target.name]:e.target.value})
    }

    const handleSubmitReview = async()=>{
        const res = await axios.patch(`http://localhost:5000/product/updateReviews/${prop.product_id}`,{
            reviews:{
                user_id: currentUser._id,
                review: reviews.review,
                rating: value
               }
               
        })
        await swal("Review Submitted Successfully","","success")
        window.location.reload()
        console.log(res.data);
    }

    const [checkIfREviewed, setcheckIfREviewed] = useState(false)
    const check_already_reviewed = async()=>{
        const res = await axios.get(`http://localhost:5000/product/findById/${prop.product_id}`)
        const res_data = res.data.reviews
        res_data?.find(x=>x.user_id===currentUser._id) ? setcheckIfREviewed(true):setcheckIfREviewed(false)
        console.log(res_data.find(x=>x.user_id===currentUser._id))
    }

    useEffect(()=>{
        check_already_reviewed()
    },[])

  return (
    <div>
        <Box component={motion.div} whileHover={{scale:1.1}}>
            <Chip label={checkIfREviewed===true?"Already Reviewed":"Review"} onClick={()=>setisModalOpen(true)} disabled={prop.delivery_status!=='Delivered' || checkIfREviewed===true}
            sx={{bgcolor:"#BFE0B7", color:"#1B7006"}}/>
        </Box>
        <Box className="review-modal-continer">
            <Modal className="review-modal" open={isModalOpen} onClose={()=>setisModalOpen(false)}>
                <Box sx={styles}>
                    <Box className="review-header">
                        <Typography fontWeight='bold' fontFamily='poppins' variant='h5'>Reviews</Typography>
                    </Box>
                    <Box className="review input">
                        <Stack spacing={3}>
                            <Stack className="text" direction='row' spacing={5}>

                        <Typography fontFamily='poppins' variant='subtitle1'>
                        <strong>Product Id - </strong>
                        <Link onClick={()=>nav(`/reomended/:${prop.product_id}`)} underline="false">{prop.product_id}</Link>
                        </Typography>


                        <Typography fontFamily='poppins' variant='subtitle1'>
                            <strong>Product name - </strong> 
                            {prop.product_name}
                            </Typography>

                        <Typography fontFamily='poppins' variant='subtitle1'>
                        <strong>Product price - </strong> 
                            {prop.product_price}
                        </Typography>

                        <Typography fontFamily='poppins' variant='subtitle1'>
                        <strong>Qty - </strong>
                        {prop.product_qty}
                        </Typography>
                        </Stack>

                        <TextField label='Reviews' placeholder='Enter your Reviews here...' name='review' variant='outlined' 
                        value={reviews.review} onChange={handleInput}/>

                        <Box>
                        <Typography>Rate Product Here</Typography>
                        <Rating defaultValue={0} precision={0.5} value={value}  size="large" 
                        onChange={(event, newValue) => {setValue(newValue);}}/>
                        </Box>
                        
                        <Box className="review-button">
                        <Button variant='contained' onClick={handleSubmitReview} disabled={!reviews.review || value===0}>Sumit Review</Button>
                        </Box>
                        </Stack>
                    </Box>
                </Box>
            </Modal>
        </Box>
    </div>
  )
}

export default ReviewModal