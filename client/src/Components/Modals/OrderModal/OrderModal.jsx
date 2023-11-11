import React, { useEffect, useState } from 'react'
import { Box, Button, FormControl, InputLabel, MenuItem, Modal, Select, Stack, Typography } from '@mui/material'
import { currentUser } from '../../../utils/CurrentUser'
import { addedToCart } from '../../../utils/AddedToCart'
import { motion } from 'framer-motion'
import axios from 'axios'
import "./OrderModal.css"
import { Icon } from '@iconify/react'
import { useNavigate } from 'react-router-dom'
import swal from 'sweetalert'




const OrderModal = (props) => {

    const nav = useNavigate()

    const [isModalOpen, setisModalOpen] = useState(false);
    const [userDetails, setuserDetails] = useState([])
    const [currDate, setcurrDate] = useState("")

    const [address_Details, setaddress_Details] = useState({
        address:currentUser?.all_address.length>0? currentUser?.all_address[0].address:"",
        city:currentUser?.all_address.length>0? currentUser?.all_address[0].city:"", 
        state:currentUser?.all_address.length>0? currentUser?.all_address[0].state:"",
        pincode:currentUser?.all_address.length>0? currentUser?.all_address[0].pincode:"",
        paymentMethod:""
    })

    const styles = { position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", width: "auto", bgcolor: "background.paper", 
    boxShadow: 24, p: 4, borderRadius: 4,};

    const user_Detials = async()=>{
        const res = await axios.get(`/user/${currentUser._id}`)
        console.log('from modal',res.data);
        setuserDetails(res.data.all_address)
    }



    
    


        
    
    const handleChange=(e)=>{
        setaddress_Details({...address_Details,[e.target.name]:e.target.value})
    }
    
    // console.log(address_Details);

    const currentfindDate =()=>{
        var date = new Date()
        date.setDate(date.getDate())
        console.log(date);
        setcurrDate(date) 
    }
    const createdAted = new Date(currDate).toLocaleString(
        'en-IN', {month: 'numeric', year: 'numeric', day: 'numeric'}
    )

    const handleOrder=async()=>{
        const res = await axios.post("/order/",{

        user_id:currentUser._id,
        total_price:props.total_bill,
        order_date:createdAted,
        expected_delivery:props.delivery_date,
        ship_address:{
            address:address_Details.address,
            city:address_Details.city,
            state:address_Details.state,
            pincode:address_Details.pincode
          },
        product_details:addedToCart,
        payment_method:address_Details.paymentMethod,
        delivery_status:"Pending"
        })

        localStorage.removeItem("Cart")
        await swal("Order Placed Successful", "You are ready to go", "success");
        window.location.href="/"

        console.log('order',res.data);
    }
    


    useEffect(()=>{
        user_Detials(), 
        currentfindDate()}
        ,[])

    // console.log('olla',userDetails);

  return (
    <div>

        <Button onClick={()=>setisModalOpen(true)}   variant='contained' disabled={addedToCart.length===0 || userDetails.length===0 }>Order Now</Button>


        <Modal open={isModalOpen} onClose={()=>setisModalOpen(false)} className='order-modal'>
            <Box sx={styles}>
                <Typography fontFamily='poppins' fontWeight="bold" variant='h5' sx={{mb:"30px", mt:"-15px"}}>Order Details</Typography>

                <Stack direction='row' spacing={10} >
                    <Box className="b1">
                        <Typography fontFamily='poppins' className='text-icon-aligns' variant='body1'>
                        <Icon icon="octicon:person-16" fontSize='17px' color='#F24E1E' />
                        <strong>Name</strong> - {currentUser?.name}
                        </Typography>

                        <Typography fontFamily='poppins' className='text-icon-aligns' variant='body1'>
                        <Icon icon="uiw:date" fontSize='17px' color='#699BF7' />
                        <strong>Order Date</strong> - {createdAted}
                        </Typography>

                        <Typography fontFamily='poppins' className='text-icon-aligns' variant='body1'>
                        <Icon icon="uiw:date" fontSize='17px' color='#699BF7' />
                        <strong>Expected Delivery</strong> - {props.delivery_date}
                        </Typography>
                        

                        <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
                        <InputLabel sx={{fontWeight:"bold"}} > 
                        <Icon icon="pajamas:location" fontSize='23px' color='#FF0000' />
                        City
                        </InputLabel>
                        <Select value={address_Details.city} name='city' onChange={handleChange} label="City">
                         {userDetails && userDetails.length>0 ? 
                         userDetails.map((x,i)=>(<MenuItem value={x.city} key={x._id}>{x.city}</MenuItem>))
                         :"not available"}
                        </Select>
                        </FormControl>

                        <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
                        <InputLabel>
                        <Icon icon="iconamoon:delivery-fast-light" fontSize='23px' color='#1B7006' />
                        Address</InputLabel>
                        <Select   label="Address" value={address_Details.address} name='address' onChange={handleChange}>
                         {userDetails && userDetails.length>0 ? 
                         userDetails.map((x,i)=>(<MenuItem  key={x._id} value={x.address}>{x.address}</MenuItem>))
                         :null}
                        </Select>
                        </FormControl>

                       
                        <Typography fontFamily='poppins' className='text-icon-aligns' variant='body1'>
                        <strong>Total Amount</strong> - {props.total_bill}
                        <Icon icon="mdi:currency-inr" fontSize='17px' color='black' />
                        </Typography>

                        <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
                        <InputLabel sx={{fontWeight:"bold"}}>Payment Method</InputLabel>
                        <Select value={address_Details.paymentMethod} name='paymentMethod' onChange={handleChange} label="Payment Method">
                            <MenuItem value={"cod"}>Cash on Delivery</MenuItem>
                            <MenuItem value={"online"}>Online</MenuItem>
                            <MenuItem value={"credit"}>Credit Card</MenuItem>
                            <MenuItem value={"debit"}>Debit card</MenuItem>
                        </Select>
                        </FormControl>

                    </Box>


                    <Box className="b2">
                    <Typography fontFamily='poppins' className='text-icon-aligns' variant='body1'>
                    <Icon icon="akar-icons:cart" fontSize='17px' color='#9747FF' />
                    <strong>Total Items</strong> - {addedToCart.length}
                    </Typography>

                    <Typography fontFamily='poppins' className='text-icon-aligns' variant='body1'>
                    <Icon icon="material-symbols:production-quantity-limits" fontSize='17px' color='#FFD700' />
                    <strong>Qty</strong> - {props.total_qty}
                    </Typography>

                    <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
                        <InputLabel>State</InputLabel>
                        <Select   label="State" value={address_Details.state} name='state' onChange={handleChange}>
                         {userDetails && userDetails.length>0 ? 
                         userDetails.map((x,i)=>(<MenuItem  key={x._id} value={x.state}>{x.state}</MenuItem>))
                         :null}
                        </Select>
                        </FormControl>

                        <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
                        <InputLabel >Pin code</InputLabel>
                        <Select   label="pincode" value={address_Details.pincode} name='pincode' onChange={handleChange}>
                         {userDetails && userDetails.length>0 ? 
                         userDetails.map((x,i)=>(<MenuItem  key={x._id} value={x.pincode}>{x.pincode}</MenuItem>))
                         :null}
                        </Select>
                        </FormControl>
                    </Box>
                </Stack>
                <Box className="order-modal-button">
                    <Button variant='contained' color='success' onClick={handleOrder} 
                    disabled={!address_Details.paymentMethod || !address_Details.address || !address_Details.city || !address_Details.state || !address_Details.pincode} >
                        Order
                    </Button>
                </Box>
            </Box>
        </Modal>
    </div>
  )
}

export default OrderModal