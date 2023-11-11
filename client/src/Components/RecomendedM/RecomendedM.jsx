import React, { useEffect, useState } from 'react'
import "./RecomendedM.css"
import { Box, Button, Card, CardActions, CardContent, CardMedia, Chip, Stack, Typography } from '@mui/material'
import { useLocation, useParams, useSearchParams } from 'react-router-dom'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { fetchProductDataByCategory, fetchProductDataById } from '../../redux/ProductSlice'
import nike from "../../Images/nike.png"
import fila from "../../Images/fila.png"
import puma from "../../Images/puma.png"
import addidas from "../../Images/addidas.png"
import rebook from "../../Images/rebook.png"
import { Icon } from '@iconify/react'
import { motion } from 'framer-motion'
import { currentUser } from '../../utils/CurrentUser'
import { addedToCart } from '../../utils/AddedToCart'
// import {ScrollMenu}from "react-horizontal-scrolling-menu"
// import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
// import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

const RecomendedM = () => {

    const dispatch = useDispatch()

    const location = useLocation();

    let {pid} = useParams()
    const ass = pid?.split(":")
    


    // const fetchProductDetails = async()=>{
    //    dispatch(fetchProductDataById(ass[1]))   
    // }

    const data = useSelector(state=>state.Product.data)
    // console.log(data?.category);

    const [categoryShoesData, setcategoryShoesData] = useState([])

  

    const tried = async()=>{
        dispatch(fetchProductDataById(ass[1]))
        const res = await axios.get(`/product/findByQuery?category=${data?.category}`)
        // console.log('ass',res.data);
        setcategoryShoesData(res.data)
        
    }

    console.log(categoryShoesData.length);

    const checkLogo = (x)=>{
        if(x=='rebook'){
            return rebook
        }if(x=='Nike'){
            return nike
        }if(x=='fila'){
            return fila
        }if(x=='puma'){
            return puma
        }if(x=='addidas'){
            return addidas
        }
      }

    
    const [qty, setqty] = useState({})

    const handleClick=(id,i)=>{
    setqty({...qty,[id]:(qty[id]||1)+i})
    console.log('aaaaa',qty);
    if(qty[x._id]<0){
        setqty({...qty,[id]:(qty[id]==0)})
        }
    }

    const checkDuplicate=(id)=>{
        const ass = addedToCart.find(a=>a.product_id===id)
        // console.log('ass',ass);
        if(ass){
          return true
        }
      }

    const handleAddToCart=async(x,y)=>{
    
        const data = await axios.get(`/product/findById/${x}`)
        console.log(data.data.product_img);
    
      console.log(qty[data.data._id])
      console.log(qty);
    
      const listObkect ={
        product_id:data.data._id,
        product_name:data.data.product_name,
        product_img: data.data.product_img,
        price: data.data.price,
        sub_category: data.data.sub_category,
        qty:   qty[data.data._id] || 1,  
        }
     
      
        const exitingList = JSON.parse(localStorage.getItem('Cart')) || []
        exitingList.push(listObkect)
        
        localStorage.setItem("Cart", JSON.stringify(exitingList))
        await swal("Added to Cart!", "", "success");
        window.location.reload()
      }

   


    useEffect(()=>{
        // fetchProductDetails(),
        // data?recomededCategoryShoes():null
        
        tried()
    },[data])


  return (
    <div>
        <Box className="recomedem container">

            <Box className="recomededm-header">
                <Typography fontFamily='poppins' fontWeight='bold' variant='h5'>Product Details</Typography>
            </Box>
            <Box className="recomededm-main" >
                <Card sx={{display:"flex",width:'550px', boxShadow:"12"}} >
                    <CardMedia component="img" image={data?.product_img} sx={{ width: 250, objectFit:"fill"}} height="200px"/>
                    <CardContent>
                        <Stack direction='row' sx={{display:"flex", justifyContent:"center",alignItems:"center", gap:"145px", mb:"10px"}} >
                        <Typography fontWeight='bold' fontFamily='poppins' variant='h6'>{data?.product_name}</Typography>
                        <img src={checkLogo(data?.brand)} width='40'/>
                        </Stack>
                        {/* <Typography fontFamily='poppins' variant='subtitle1' noWrap>Desc - {data?.desc}</Typography> */}
                        <Typography fontFamily='poppins' variant='subtitle1'>Category - {data?.category}</Typography>
                        <Typography fontFamily='poppins' variant='ubtitle1'>For {data?.sub_category}</Typography>
                        <Typography fontFamily='poppins' variant='subtitle1'>Ratings - {data?.ratings}⭐</Typography>
                        <Typography fontFamily='poppins' variant='subtitle1'>Price - {data?.price}</Typography> 
                        {/* <Button>Continue</Button> */}
                    </CardContent>


                </Card>
            </Box>


            <Box className="recomeded-stack">
                <Typography fontFamily='poppins' variant='h6' fontWeight='bold' >{`Recomeded ${data?.category} Shoes`}</Typography>
                <Box sx={{display:"flex", justifyContent:"space-evenly", ml:"-35px",width:"100vw"}}>
                {data && categoryShoesData.length>0 ?
                categoryShoesData.map((x,i)=>{
                    if(i<=4){
                        return(
                        <Card sx={{width:"207px",  boxShadow:"5"}} key={x._id}>
                        <CardMedia component="img" image={x.product_img} height='110px' sx={{objectFit:"cover"}}/>
                        <CardContent> 
                            <Stack direction='row' sx={{display:"flex", alignItems:"center", justifyContent:"space-between"}}>
                            <Typography fontWeight='bold'>{x.product_name}</Typography>
                            <img src={checkLogo(x.brand)} width='28px' />
                            </Stack>
                            <Typography>Price - {x.price}</Typography>
                            <Typography>Rating - {x.ratings}⭐</Typography>
                        </CardContent>

                        <CardActions>
                        <Stack direction='row' sx={{display:"flex", cursor:"pointer", mt:"-20px", ml:"60px"}} spacing={2}>
                        <Icon icon="zondicons:minus-outline" fontSize='18px' color='red' onClick={()=>handleClick(x._id,-1)}/>
                        <Typography>{qty[x._id] || 1}</Typography>
                        <Icon icon="gg:add" fontSize='20px' color='green'onClick={()=>handleClick(x._id, 1)}/>
                        </Stack>
                        </CardActions>

                        <CardActions className="add-to-cart">
                        <Chip label='Add to cart' variant="outlined" size="large"  component={motion.div}  whileHover={{scale:1.1}} disabled={!currentUser || checkDuplicate(x._id)===true}
                        sx={{width:"120px",  bgcolor:"#BFE0B7", fontWeight:"bold", color:"#1B7006", cursor:"pointer"}} onClick={()=>handleAddToCart(x._id,i)}/>
                        </CardActions>

                        </Card>
                            
                            )
                        }
                    }):"no data"}
                </Box>
            </Box>

        </Box>
    </div>
  )
}

export default RecomendedM