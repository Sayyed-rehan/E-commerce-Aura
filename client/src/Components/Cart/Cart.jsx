import React, { useEffect, useState } from 'react'
import "./Cart.css"
import {Box, Button, Card, CardActions, CardContent, CardMedia, Chip,  Stack, Typography}from '@mui/material'
import { addedToCart } from '../../utils/AddedToCart'
import { Icon } from '@iconify/react';
import { motion } from 'framer-motion'
import Authentication from '../../utils/Authentication';


const Cart = () => {

    const [bill, setbill] = useState(0);

   
    console.log(addedToCart);

    const handleRemove= async(x)=>{
        await swal({
            title: "Are you sure?",
            icon: "warning",
            buttons: true,
            dangerMode: true,
          })
          .then((willDelete) => {
            if (willDelete) {
                addedToCart.splice(x,1)
                localStorage.setItem("Cart", JSON.stringify(addedToCart))
                window.location.reload()
              swal("Item removed from the cart", {
                icon: "success",
              });
            } else {
              swal("Your Cart items are safe!");
            }
          });
        
    }

    useEffect((i) => {
        let x = 0;
        addedToCart.map((a) => {
          x = x + a.price * a.qty;
          setbill(x);
        });
        Authentication()
      }, []);
  

    console.log(bill);


    const [qtys, setqtys] = useState({})

    const handleMinus=(id,val,i,a)=>{
    

      var data = window.localStorage.getItem("Cart")
     
        let cart = JSON.parse(data)
        cart[a].qty=  cart[a].qty-1;
        window.localStorage.setItem("Cart", JSON.stringify(cart))
      
      window.location.reload()

    }

    const handlePlus=(id,val,i,a)=>{
   

      var data = window.localStorage.getItem("Cart")
     
        let cart = JSON.parse(data)
        cart[a].qty=  cart[a].qty+1;
        window.localStorage.setItem("Cart", JSON.stringify(cart))
      
      window.location.reload()

    }

    

    var date = new Date();
    date.setDate(date.getDate() + 10);
    

  return (
    <div>
        <Box className="cart-container">
            <Stack>
                <Box className="header">
                    <Typography fontWeight='bold' variant='h4' fontFamily='poppins'>Shopping Cart</Typography>
                </Box>
               <Box className="cart-item">
                {addedToCart && addedToCart.length>0 ?addedToCart.map((x,i)=>(
                   <Card sx={{display:"flex",width:'450px', height:"110px", mb:"20px", boxShadow:"12"}} component={motion.div} whileHover={{scale:1.1}} key={x._id}>
                      <CardMedia component="img" image={x.product_img} sx={{ width: 130,   display:"flex", justifyContent:"center", alignItems:"center" }} />
                      <CardContent sx={{width:"190px", mt:"-10px"}}>
                        <Typography fontWeight='bold' fontFamily='poppins' variant='h6'>{x.product_name}</Typography>
                        <Typography fontFamily='poppins' variant=''>For {x.sub_category}</Typography>
                        <Stack direction='row' spacing={2}>
                        <Icon icon="zondicons:minus-outline" fontSize='18px' color='red' onClick={()=>handleMinus(x.product_id,x.qty,-1,i)}/>
                        <Typography fontFamily='poppins' variant=''> {x.qty}</Typography>
                        <Icon icon="gg:add" fontSize='20px' color='green' onClick={()=>handlePlus(x.product_id,x.qty,1,i)}/>
                        </Stack>
                        <Typography fontFamily='poppins' variant=''>Total Price - {x.qty * x.price}</Typography>
                      </CardContent>
                      
                      <CardActions sx={{display:"flex", bgcolor:""}}>
                        <Chip label='Remove' sx={{fontWeight:"bold"}} color='error' onClick={()=>handleRemove(i)} component={motion.button} whileHover={{scale:1.1}}/>
                      </CardActions>
                   </Card>
                )):<Typography fontFamily='poppins' variant='h6' fontWeight='bolder'>No Item added to Cart</Typography>}
               </Box>
            </Stack>
        </Box>
    </div>
  )
}

export default Cart