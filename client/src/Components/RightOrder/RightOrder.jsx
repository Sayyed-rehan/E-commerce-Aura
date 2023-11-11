import React, { useEffect, useState } from 'react'
import { Typography,Box, Stack, Link, Button }from '@mui/material'
import { addedToCart } from '../../utils/AddedToCart'
import { currentUser } from '../../utils/CurrentUser'
import axios from 'axios'
import { useSelector, useDispatch } from 'react-redux' 
import { fetchUserDataById } from '../../redux/UserSlice'
import { dark } from '@mui/material/styles/createPalette'
import { Dataset } from '@mui/icons-material'
import { Icon } from '@iconify/react';
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import OrderModal from '../Modals/OrderModal/OrderModal'

const RightOrder = () => {

    const nav = useNavigate()

    const dispatch = useDispatch()

    const [bill, setbill] = useState(0)

    const [address, setaddress] = useState([])

    const [DelDate, setDelDate] = useState("")
  
    const [totalQty, settotalQty] = useState(0)


    const fetchUserDetails=async()=>{
        const res = await axios.get(`/user/${currentUser._id}`)
        console.log(res.data.all_address);
        setaddress(res.data.all_address)
    }
    
  
    const findDate =()=>{
        var date = new Date()
        date.setDate(date.getDate()+10)
        console.log(date);
        setDelDate(date)
    }

 
        const createdAted = new Date(DelDate).toLocaleString('en-IN',
        {month: 'numeric', year: 'numeric', day: 'numeric'})


    useEffect((i) => {
        fetchUserDetails()
        findDate()

        
        let x = 0;
        let qwe=0
        addedToCart.map((a) => {
          x = x + a.price * a.qty;
          qwe = qwe+a.qty
          setbill(x);
          settotalQty(qwe)
        });
      }, []);

      console.log('ass',totalQty);
      console.log('cart',addedToCart);
      
    

  return (
    <div>
        <Box className="order-container" sx={{bgcolor:"", mt:"120px",}}>
            <Box sx={{p:"20px", bgcolor:"white", borderRadius:"10px",mr:"10px"}} boxShadow={12}>
            <Stack  spacing={2}>
            <Typography fontFamily='poppins'  variant='body1'><strong>Total Amount</strong> - {bill} ₹</Typography>
            <Stack  direction='row'> 
            <Typography fontFamily='poppins'  variant='body1'><strong>Shipment Address</strong> - 
            {address && address.length>0 ?address[0].address:"Not Available" }
                
            <Icon icon="iconamoon:delivery-fast-light" width='25px' style={{paddingLeft:"10px"}}  />
            </Typography>
            </Stack>

            <Typography fontFamily='poppins' variant='body1'><strong>Expected Delivery</strong> - {addedToCart && addedToCart.length>0? createdAted:"Please Add Items in Cart"}
            <Icon icon="uiw-date" width='17px'   style={{paddingLeft:"10px"}}/>
            </Typography>
            </Stack>
            </Box>
            <Box sx={{display:"flex", justifyContent:"center", mt:"20px"}}>
            <OrderModal delivery_date = {createdAted}
                        total_bill={bill}
                        total_qty = {totalQty}/>
            </Box>
        </Box>
    </div>
  )
}

export default RightOrder
