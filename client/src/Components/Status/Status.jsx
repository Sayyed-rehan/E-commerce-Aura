import axios from "axios";
import React, { useEffect } from "react";
import { Box, Chip } from "@mui/material";
import moment from "moment/moment";
// import { curryGetDefaultMiddleware } from "@reduxjs/toolkit/dist/getDefaultMiddleware";

const Status = (props) => {

  

console.log('page',props.page);
  // const currdate1 = new Date();
  // const delvdate2 = new Date(props.expected_delivery);
  // console.log(props.delivery_status, props.expected_delivery);


  // const compareDate = async() => {

  //   if(props.delivery_status==='canceled'){
  //     return 
  //   }
  //   //pending
  //   if (props.delivery_status ==='pending' && currdate1 < delvdate2) {
  //     console.log("currdate1 is earlier than delvdate2");
  //     const res = await axios.patch(`http://localhost:5000/order/${props.oid}`,{
  //       delivery_status:"Pending"
  //     })
  //     console.log(res.data);
  //     return 
      
  //     //delivered
  //   } else if (currdate1 > delvdate2 || currdate1 == delvdate2) {
  //     console.log("currdate1 is later than delvdate2");
  //     const res = await axios.patch(`http://localhost:5000/order/${props.oid}`,{
  //       delivery_status:"Delivered"
  //     })
  //     console.log(res.data);
  //     //same
  //   } else  {
  //     console.log('else');
  //   }
  // };


  const update_Status = async()=>{

    let currdate1 =  new Date().toLocaleString('en-IN',{month: 'numeric', year: 'numeric', day: 'numeric'})
    var delvdate2 = props.expected_delivery

    var d1 = moment(props.expected_delivery).format('DD/MM/YYYY');
    var c1 = moment().format("DD/MM/YYYY")
    console.log(c1, d1, c1<d1);
    
  
    
  
    // console.log(`today = ${currdate1}   del =  ${delvdate2}`);
 

    if(props.delivery_status==='Canceled'){
      return
    }
    else if(c1<d1 && props.delivery_status!=='Canceled'){
      console.log('pending');
      // const res = await axios.patch(`http://localhost:5000/order/${props.oid}`,{
      //   delivery_status:"pending"
      // })
      console.log(res.data);
    }
    else if(c1>d1 && props.delivery_status==='Pending' ){
      console.log('delv');
      const res = await axios.patch(`http://localhost:5000/order/${props.oid}`,{
        delivery_status:"Delivered"
      })
      console.log(res.data);
    }else if(c1===d1 && props.delivery_status==='Pending'){
      console.log("today");
      const res = await axios.patch(`http://localhost:5000/order/${props.oid}`,{
        delivery_status:"Delivered"
      })
      console.log(res.data);
    }

   
    
    // if(props.delivery_status === 'canceled'){
    //   // console.log('@',props.delivery_status, props.expected_delivery);
    //   return
    // }
    //  if( currdate1 < delvdate2){
    //   // console.log('#',props.delivery_status, props.expected_delivery);
    //   // console.log("currdate1 is earlier than delvdate2");
    //   return
    // }
    //  if(  currdate1 > delvdate2){
    //   // console.log('$',props.delivery_status, props.expected_delivery);
    //   // console.log("currdate1 is earlier than delvdate2");
    //   const res = await axios.patch(`http://localhost:5000/order/${props.oid}`,{
    //     delivery_status:"Delivered"
    //   })
    //   console.log("upted to delviered");
    // }
    // else if(props.delivery_status==='Delivered'){
    //   // console.log('&',props.delivery_status, props.expected_delivery);
    //   return
    // }
    // #BFE0B7
  }

  const chipModifiy = ()=>{
    if(props.delivery_status=='Delivered'){
      return(
        <Chip  label={props.delivery_status} sx={{color:"#1B7006", bgcolor:"#c8e6c9", fontFamily:"poppins", fontWeight:"bold"}}/>
      )
    }if(props.delivery_status=='Canceled' || props.delivery_status=='canceled'){
      return <Chip  label={props.delivery_status} sx={{color:"#B30909", bgcolor:"#ffcdd2", fontFamily:"poppins", fontWeight:"bold"}}/>
    }if(props.delivery_status=='pending' || props.delivery_status=='Pending'){
      return <Chip  label={props.delivery_status} sx={{color:"#2196f3", bgcolor:"#b3e5fc", fontFamily:"poppins", fontWeight:"bold"}}/>
    }
  }

  

  useEffect(() => {

    // compareDate();
    update_Status()
  }, [props.page]);

  return <div>
    {chipModifiy()}
  </div>;
};

export default Status;