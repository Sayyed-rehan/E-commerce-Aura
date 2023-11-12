import React, { useEffect, useState } from "react";
import "./ProductCard.css";
import {Box, Button, Card, CardActionArea, CardActions, CardContent,  CardMedia,  Chip,  Pagination,  Stack,  Typography,} from "@mui/material";
import nike from "../../Images/nike.png"
import fila from "../../Images/fila.png"
import puma from "../../Images/puma.png"
import addidas from "../../Images/addidas.png"
import rebook from "../../Images/rebook.png"
import minus from "../../Images/minus.png"
import { useSelector, useDispatch } from "react-redux";
import {setPage, fetchProductDataByPagination} from "../../redux/ProductSlice";
import { Icon } from '@iconify/react';
import { currentUser } from "../../utils/CurrentUser";
import {motion}from 'framer-motion'
import axios from "axios";
import swal from "sweetalert";
import { addedToCart } from "../../utils/AddedToCart";



const ProductCard = (props) => {

  const dispatch = useDispatch()
  const count = useSelector(state=>state.Product.count)
  const Slicepage = useSelector(state=>state.Product.value)
 
  

 

  const [qty, setqty] = useState({})

  const [duplicateCart, setduplicateCart] = useState(false)

  

  const Product_data = useSelector((state) => state.Product);

  console.log('ok',Product_data.data);
  

  

  const handleClick=(id,i)=>{
    setqty({...qty,[id]:(qty[id]||1)+i})

    if(qty[x._id]<0){
      setqty({...qty,[id]:(qty[id]==0)})
    }
  }

 

  const checkLogo = (x)=>{
    if(x=='rebook'){
        return rebook
    }if(x=='Nike'){
        return nike
    }if(x=='fila'){
        return fila
    }if(x=='puma'){
        return puma
    }else{
        return addidas
    }
  }

  const [cartArray, setcartArray] = useState([])

  const handleAddToCart=async(x,y)=>{
    
    const data = await axios.get(`http://localhost:5000/product/findById/${x}`)
  
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

 

  const checkDuplicate=(id)=>{
    const ass = addedToCart.find(a=>a.product_id===id)

    if(ass){
      return true
    }
  }
  const [page, setpage] = useState(1)
  const [allDataLength, setallDataLength] = useState(0)

  const allProductsData = async()=>{
    const res = await axios.get("http://localhost:5000/product/")
    setallDataLength(res.data.length)
  }

  
 
  

  

  useEffect(()=>{
    if(count===0){
      dispatch(fetchProductDataByPagination(page))
    }
    allProductsData()
    dispatch(setPage(page))
  },[page])
  
  
 
 
  
 




  return (
    <div className="card-container">
      <Box className="card-items" >
        {Product_data.data && Product_data.data.length>0? 
        Product_data.data.map((x, i) => (
         
              <Card sx={{ maxWidth: 250, float:"left",m:"10px", width:{lg:"240px",md:"220px", sm:"290px"}, boxShadow:"5" }} key={x._id} component={motion.div} whileHover={{scale:1.1}} >
              
                  <CardMedia component="img"  height="100"  image={x.product_img} sx={{objectFit:"cover"}}  />
                  <CardContent>
                    <Stack direction='row' sx={{display:"flex", alignItems:"center", justifyContent:"space-between"}}>
                    <Typography fontWeight='bold' >{x.product_name}</Typography>
                    <img src={checkLogo(x.brand)} width='28px' />
                    </Stack>
                    <Typography>Price - {x.price}</Typography>
             
                    <Typography >Ratings - {x.ratings}⭐</Typography>
                   
                  
                  </CardContent>
               

                <CardActions sx={{display:"flex", justifyContent:"center", bgcolor:"", mt:"-20px"}}>
                    <Stack direction='row' sx={{display:"flex", alignItems:"center", cursor:"pointer"}} spacing={2}>
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
         
              
        ))
              : <h1>No data found</h1>}


      </Box>
     
          <Box sx={{mt:"10px", mb:"20px", display:"flex", justifyContent:"center", alignItems:"center"}}>
              <Pagination count={Math.ceil((count!==0? count: allDataLength)/6)} onChange={(e,p)=>setpage(p)} color="primary" disabled={Product_data.data?.length==0}
              size="medium"  />
          </Box>
      
    </div>
  );
}

export default ProductCard;