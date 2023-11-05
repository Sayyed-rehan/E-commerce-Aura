import React, { useEffect, useState } from 'react'
import {Box, Chip, FormControl, InputAdornment, InputLabel, ListSubheader, MenuItem, Select, Stack, TextField}from '@mui/material'
import axios from 'axios'
import {useSelector, useDispatch}from "react-redux"
import {fetchProductData,fetchProductDataById,fetchProductDataByName, fetchProductDataByGender, fetchProductDataByPirce, fetchProductDataByBrand,
fetchProductDataByRating, fetchProductDataByCategory, fetchProductDataByPagination,  setCount, setPage} from '../../redux/ProductSlice'
import "./Feed.css"
import { Icon } from '@iconify/react';
import {motion}from 'framer-motion'
import ProductCard from '../ProductCard/ProductCard'
// import AppPagination from '../Pagination/AppPagination'
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
// import state from 'sweetalert/typings/modules/state'


const Feed = () => {

    const dispatch = useDispatch()

    const page = useSelector(state=>state.Product.value)
    const count = useSelector(state=>state.Product) 



    const [Age, setAge] = useState(false)

    // const [Im_Active, setIm_Active] = useState({active_action:""})



    const [minMax, setminMax] = useState({
        min:0, max:0
    })

    const [rate, setrate] = useState({
        minRate:0
    })

    // const [closeIt, setcloseIt] = useState()


    const [qty, setqty] = useState(10)

 

    
   

    const [productName, setproductName] = useState('')
    // const name = useSelector(state=>state.setName.name)
    // console.log(name);

    const handleInput=(e)=>{
        setproductName(e.target.value)
        setAge(true)

        // setIm_Active({active_action:"search"})

       
        
        // dispatch(setName(e.target.value))
        

        // if(productName.length>0){
        //     dispatch(fetchProductDataByName(e.target.value))
        // }else{
        //     dispatch(fetchProductData())
        // }
        
    }

    // const check_Active_Action = ()=>{
    //   if( Im_Active.active_action.length>0 &&   Im_Active.active_action==='drop-down'){
    //     // setproductName("")
    //     console.log(Im_Active.active_action);
    //     console.log('...................................',true);
    //   }
    // }
  



 
    
    const [active_API, setactive_API] = useState({
      category:"", specific_category:""
    })

    //for gender API
    const handleClick = async(x)=>{

      const ds={x,sample}
      dispatch(fetchProductDataByGender(ds))
      const responce = await axios.get(`http://localhost:5000/product/findByGender/${x}/${1}/6`);
      console.log('ok', responce.data.count);
      setactive_API({category:"gender", specific_category:x})
      dispatch(setCount(responce.data.count))
      setproductName("")  
    
    }

    console.log(count);

    const [sample, setsample] = useState(1)
   
    //for category API
    const handleCategoryClick = async(x)=>{

      const ds = {x,sample}
      dispatch(fetchProductDataByCategory(ds))
      
      //for counting the data lennght
      const responce =  await axios.get(`http://localhost:5000/product/findbyCategory/${x}/${1}/6`);
      setactive_API({category:"category", specific_category:x})
      console.log(responce.data);
      dispatch(setCount(responce.data.count))
      setproductName("")
      
    }

    console.log(active_API);
  

    //for Price API
    const handlePriceClick = async(x)=>{

      const ds = {x, sample}
      // dispatch(setPage(sample))
      dispatch(fetchProductDataByPirce(minMax.min=ds))
      
      //for counting the data lennght
      const responce = await axios.get(`http://localhost:5000/product/findByPrice/?minPrice=${x}&maxPrice=${x+1000}&page=${1}&limit=6`);
      console.log(responce.data);
      dispatch(setCount(responce.data.count))
      setproductName("")
    }

    //for Rating API
    const handle_Rating_Click = async(x)=>{

      const ds={x,sample}
      
      dispatch(fetchProductDataByRating(rate.minRate = ds))
      
      //for counting the data lennght
      const responce = await axios.get(`http://localhost:5000/product/findByRatings/?minRating=${x}&maxRating=${x+1}&page=${1}&limit=6`);
      console.log(responce.data);
      setactive_API({category:"rating", specific_category:x})
      dispatch(setCount(responce.data.count))
      setproductName("")
    }

    //for Brand API
    const handle_Brand_Click =async(x)=>{

      const ds ={x,sample}
      dispatch(fetchProductDataByBrand(ds))
      
      //for counting the data lennght
      const responce = await axios.get(`http://localhost:5000/product/findByBrand?brand=${x}&page=${1}&limit=6`);
      console.log(responce.data);
      setactive_API({category:"brand", specific_category:x})
      dispatch(setCount(responce.data.count))
      setproductName("")

    }

    

    const return_Active_API = ()=>{
      if(active_API.category==='category'){
        const data = {x:active_API.specific_category, page:page}
        console.log(data);
        return  dispatch(fetchProductDataByCategory(data))
      }else if(active_API.category==='gender'){
        const data = {x:active_API.specific_category, page:page}
        return dispatch(fetchProductDataByGender(data))
      }else if(active_API.category==='brand'){
        const data ={x:active_API.specific_category, page:page}
        return dispatch(fetchProductDataByBrand(data))
      }else if(active_API.category==='rating'){
        const data = {x:active_API.specific_category, page:page}
        return dispatch(fetchProductDataByRating(rate.minRate = data))
      }
    }

    const fetch_ProductData_ByName = async()=>{
      const responce = await axios.get(`http://localhost:5000/product/findByName/${1}/${6}?product_name=${productName}`);
      console.log(responce.data.count)
      dispatch(setCount(responce.data.count))

    }
    





   

  useEffect(() => {

    if (productName.length > 0) {
        const ds={productName,page} 
        dispatch(fetchProductDataByName(ds))

        fetch_ProductData_ByName()

    }else if(count>0){
      return_Active_API()
    }
    else if(count===0) {
    dispatch(fetchProductDataByPagination(page))
    }

    // check_Active_Action()
  }, [productName, page]);

   

  return (
    <div className='feed-container'>
        <Box className="search-bar">
            <TextField label='Search Products here...' value={productName} onChange={handleInput} 
            sx={{bgcolor:"white", borderRadius:"10px",width:300, borderColor:"black",}} size='small'
            InputProps={{endAdornment:(<InputAdornment position='end'><Icon icon="ri:search-line" fontSize='20px' color='grey' /></InputAdornment>)}} />

        <FormControl sx={{ m: 1, minWidth: 120, bgcolor:"white", borderRadius:"10px" }} size='small' >
          <InputLabel htmlFor="grouped-select" >Filter By</InputLabel>
            <Select defaultValue=""  id="grouped-select" label="Grouping" autoWidth IconComponent={()=><Icon icon="mi:filter"
            className='select-filter'/>}>
         
   
          <MenuItem value="" > 
            <em>None</em>
            </MenuItem>
       
          <ListSubheader sx={{fontWeight:"bolder"}}>Brands</ListSubheader>
            <MenuItem value={7} onClick={()=>handle_Brand_Click("Nike")}>Nike</MenuItem>
            <MenuItem value={8} onClick={()=>handle_Brand_Click("rebook")}>Rebook</MenuItem>
            <MenuItem value={9} onClick={()=>handle_Brand_Click("adidas")}>Addidas</MenuItem>
            <MenuItem value={10} onClick={()=>handle_Brand_Click("fila")}>Fila</MenuItem>
            <MenuItem value={11} onClick={()=>handle_Brand_Click("Puma")}>Puma</MenuItem>
          <ListSubheader sx={{fontWeight:"bolder"}}>Price</ListSubheader>
            <MenuItem value={12} onClick={()=>handlePriceClick(0)}>below 1000</MenuItem>
            <MenuItem value={13} onClick={()=>handlePriceClick(1000)}>1000-2000</MenuItem>
            <MenuItem value={14} onClick={()=>handlePriceClick(2000)}>2000-3000</MenuItem>
            <MenuItem value={15} onClick={()=>handlePriceClick(4000)}>4000-5000</MenuItem>
          <ListSubheader sx={{fontWeight:"bolder"}}>Ratings</ListSubheader>
            <MenuItem value={16} onClick={()=>handle_Rating_Click(4)}>4 - above⭐</MenuItem>
            <MenuItem value={17} onClick={()=>handle_Rating_Click(3)}>3 - 4⭐</MenuItem>
            <MenuItem value={18} onClick={()=>handle_Rating_Click(2)}>2 - 3⭐</MenuItem>
            <MenuItem value={19} onClick={()=>handle_Rating_Click(1)}>1 - 2⭐</MenuItem>
        </Select>
      </FormControl>
        </Box>

        <Box className="chips">
        <Chip label="For Men" variant='outlined' size='small' onClick={()=>handleClick("male")} component={motion.div} whileHover={{scale:1.2}}
        sx={{width:"90px", bgcolor:"white", borderColor:"black", fontWeight:"bold"}}/>

        <Chip label="For Women"  variant='outlined' size='small' onClick={()=>handleClick("female")} component={motion.div} whileHover={{scale:1.2}}
        sx={{width:"90px", bgcolor:"white", borderColor:"black",fontWeight:"bold"}} />

        <Chip label="For Kids" variant='outlined' size='small' onClick={()=>handleClick("kids")} component={motion.div} whileHover={{scale:1.2}}
        sx={{width:"90px", bgcolor:"white", borderColor:"black",fontWeight:"bold"}}/>

        <Chip label="Sports" variant='outlined' size='small' onClick={()=>handleCategoryClick("sports")} component={motion.div} whileHover={{scale:1.2}}
        sx={{width:"90px", bgcolor:"white", borderColor:"black",fontWeight:"bold"}}/>

        <Chip label="Casual" variant='outlined' size='small' onClick={()=>handleCategoryClick('casual')} component={motion.div} whileHover={{scale:1.2}} 
        sx={{width:"90px", bgcolor:"white", borderColor:"black",fontWeight:"bold"}}/>

        <Chip label="Studs" variant='outlined' size='small' onClick={()=>handleCategoryClick("stud")} component={motion.div} whileHover={{scale:1.2}}
        sx={{width:"90px", bgcolor:"white", borderColor:"black",fontWeight:"bold"}}/>
        </Box>


        <Box className="cards">
          <Stack>
            <ProductCard qty={qty}/>
          </Stack>
        </Box>

    </div>
  )
}

export default Feed
