import React, { useEffect, useState } from 'react'
import "./OrderHistory.css"
import { Box, Chip, Collapse, FormControl, IconButton, InputLabel, Link, MenuItem, Pagination, Paper, Select, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, Typography } from '@mui/material'
import axios from 'axios'
import { currentUser } from "../../../utils/CurrentUser" 
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { useNavigate } from 'react-router-dom'
import ReviewModal from "../ReviewModal/ReviewModal"
import { motion } from 'framer-motion'
import Status from "../../Status/Status"
import Authentication from '../../../utils/Authentication'



const OrderHistory = () => {

  const nav = useNavigate()


  const [ordersById, setordersById] = useState([])

  const [age, setage] = useState("")


  const [rowsPerPage, setRowsPerPage] = useState(3);
  const [page, setPage] = useState(1);
  const [paginationLength, setpaginationLength] = useState()



  const fetchOrdersById = async(x)=>{
    const responce = await axios.get(`/order/findbyUserid/${currentUser._id}`)
    const res = await axios.get(`/order/findbyUserIdPagination/?user_id=${currentUser._id}&page=${page}&limit=3`)
    console.log('data',res.data, page);
    setordersById(res.data)
    setdata(res.data)
    // console.log(responce.data.length);
    setpaginationLength(responce.data.length)
    
  }

  console.log('ass',paginationLength);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  console.log('page', page);

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  



  const [data, setdata] = useState([])
  

    
    useEffect(()=>{
      fetchOrdersById()
      Authentication()
    },[page])
    
    
    const [open, setOpen] = React.useState(false);

    const [clickedIndex, setclickedIndex] = useState(-1)


    
 

   
   
  
    // const compareDate = async(xdate,y,z)=>{
    //   const current_date = new Date("2020-08-01T07:05:00Z")
    //   const delivery_date = new Date(xdate)


    //   if (current_date < delivery_date) {
    //       console.log("current_date is earlier than delivery_date");
    //     } else if (current_date > delivery_date) {
    //       console.log("current_date is later than delivery_date");
    //     } else if (current_date == delivery_date) {
    //       console.log("current_date and delivery_date are the same");
    //     }
    // }

    

  




 

 



  //cancel order
  const handleCancelOrder = async(oid)=>{
    await sweetAlert({title: "Are you sure?", icon: "warning", buttons: true,
    dangerMode: true,})
    .then(async(willDelete) => {
      if (willDelete) {
        const res = await axios.patch(`/order/${oid}`,{
          delivery_status:"Canceled"
        })
        window.location.reload()
        swal("Order canceled Successfully", {
          icon: "success",
        });
      } else {
        swal("Your order is safe!");
      }
    });
    console.log(res.data);
  }

  

    console.log(ordersById.length);


   

   
    
  

    const showProductDetails  =(level1,i, expected_delivery, delivery_status)=>{
   
      return(
        <>
        <Typography > click here

        <IconButton size='small' onClick={() =>{clickedIndex===i? setclickedIndex(-1):setclickedIndex(i)}} >
        {i===clickedIndex ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
        </IconButton>
        </Typography>

        <TableRow>
          <TableCell sx={{borderBottom:"none"}}>
            <Collapse in={clickedIndex===i} timeout="auto" unmountOnExit>
              <Box sx={{margin:1, p:"10px", borderRadius:"10px"}} >
                <Table stickyHeader>
                  <TableHead>
                    <TableRow >
                      <TableCell sx={{fontWeight:"bold", fontFamily:"poppins"}}>Product Id</TableCell>
                      <TableCell sx={{fontWeight:"bold", fontFamily:"poppins"}}>Product Name</TableCell>
                      <TableCell sx={{fontWeight:"bold", fontFamily:"poppins"}}>Product Price</TableCell>
                      <TableCell sx={{fontWeight:"bold", fontFamily:"poppins"}}>Product Qty</TableCell>
                      <TableCell sx={{fontWeight:"bold", fontFamily:"poppins"}}>Reviews</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {level1.product_details.map((level3, j)=>{
                      return(
                        <TableRow key={level3.product_id}>
                        <TableCell style={{borderBottom:"none", fontFamily:"poppins"}}>
                          <Link onClick={()=>nav(`/reomended/:${level3.product_id}`)} underline='none' sx={{cursor:"pointer"}} 
                          component={motion.div} whileHover={{scale:1.1}}>
                            {level3.product_id}
                            </Link>
                          </TableCell>

                        <TableCell style={{borderBottom:"none", fontFamily:"poppins"}}>{level3.product_name}</TableCell>
                        <TableCell style={{borderBottom:"none", fontFamily:"poppins"}}>{level3.price}</TableCell>
                        <TableCell style={{borderBottom:"none", fontFamily:"poppins"}}>{level3.qty}</TableCell>
                        <TableCell style={{borderBottom:"none", fontFamily:"poppins"}}>
                        <ReviewModal product_name={level3.product_name}
                                    product_id = {level3.product_id}
                                    product_price = {level3.price}
                                    product_qty = {level3.qty}
                                    delivery_status={delivery_status}
                                    />
                        </TableCell>
                      </TableRow>
                      )
                    })}
                  </TableBody>
                </Table>
              </Box>
            </Collapse>
          </TableCell>
        </TableRow>
        </>
      )
    }



  return (
    <div>
        <Box className="order-history-container">
            <Box className="order-history-header">
              <Typography fontFamily='poppins' variant='h5' fontWeight='bold'>Order History</Typography>
            </Box>


            <Box className="order-history table">
              <TableContainer component={Paper}>
                <Table stickyHeader>

                <TableHead >
                  <TableRow sx={{fontFamily:"poppins", fontWeight:"bold"}}>
                    <TableCell sx={{fontFamily:"poppins", fontWeight:"bold"}}>Sr No.</TableCell>
                    <TableCell sx={{fontFamily:"poppins", fontWeight:"bold"}}>Order Id</TableCell>
                    <TableCell sx={{fontFamily:"poppins", fontWeight:"bold"}}>Product Details</TableCell>
                    <TableCell sx={{fontFamily:"poppins", fontWeight:"bold"}}>Order Date</TableCell>
                    <TableCell sx={{fontFamily:"poppins", fontWeight:"bold"}}>Amount</TableCell>
                    <TableCell sx={{fontFamily:"poppins", fontWeight:"bold"}}>Expected Delivery</TableCell>
                    <TableCell sx={{fontFamily:"poppins", fontWeight:"bold"}}>Address</TableCell>
                    <TableCell sx={{fontFamily:"poppins", fontWeight:"bold"}}>Status</TableCell>
                    <TableCell sx={{fontFamily:"poppins", fontWeight:"bold"}}>Cancel Order</TableCell>
                  </TableRow>
                </TableHead>

                <TableBody>
                  {ordersById && ordersById.length>0?
                  ordersById.map((level1,i)=>(
                    <TableRow key={level1._id}>
                      <TableCell sx={{fontFamily:"poppins", fontWeight:"bold"}}>{i+1}</TableCell>
                      <TableCell align='center' sx={{fontFamily:"poppins"}}>{level1._id}</TableCell>
                      <TableCell align='center' sx={{fontFamily:"poppins"}}>
                        {showProductDetails(level1,i, (level1.expected_delivery), (level1.delivery_status))}
                      </TableCell>
                      <TableCell sx={{fontFamily:"poppins"}}>{level1.order_date}</TableCell>
                      <TableCell sx={{fontFamily:"poppins"}}>{level1.total_price}</TableCell>
                      <TableCell sx={{fontFamily:"poppins"}} >
                        {level1.expected_delivery}
                        </TableCell>
                      <TableCell sx={{fontFamily:"poppins"}}>{ordersById[i].ship_address.map((level2,i)=>{
                        return level2.address
                      })}</TableCell>

                    
                      <TableCell>
                        <Status oid={level1._id}
                                expected_delivery={level1.expected_delivery}  
                                delivery_status={level1.delivery_status}
                                page={page}
                        />
                      </TableCell>

                      <TableCell >
                      <Chip label="Cancel" color='error' sx={{fontFamily:"poppins", fontWeight:"bold"}} component={motion.div} whileHover={{scale:1.2}}
                      disabled={level1.delivery_status=='canceled' || level1.delivery_status=='Canceled' ||level1.delivery_status=='Delivered'}
                      onClick={()=>handleCancelOrder(level1._id)}/>
                      </TableCell>

                    

                    </TableRow>
                  )):<Typography variant='h6' fontWeight='bold' fontFamily="poppins">No Data Available</Typography>}
                </TableBody>


                  </Table>
                <Box sx={{display:"flex", mt:"10px", mb:"10px", justifyContent:"center"}}>
              <Pagination count={Math.ceil(paginationLength/3)} onChange={(e,p)=>setPage(p)} color='primary'  defaultPage={1} />
                </Box>
              </TableContainer>
              {/* <TablePagination
              // rowsPerPageOptions={[5,10,15]}
              component="div"
              count={ordersById.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={(e,p)=>setPage(p)} 
              onRowsPerPageChange={handleChangeRowsPerPage}
              /> */}
              
            </Box>
            
        </Box>
    </div>
  )
}

export default OrderHistory