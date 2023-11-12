import React, { useEffect, useState } from 'react'
import "./Sign.css"
import {}from 'react-router-dom'
import { Box, Button, IconButton, InputAdornment, Link, Stack, TextField, Typography }from '@mui/material'
import signimg from "./../../Images/sign.png"
import axios from "axios"
import {useNavigate}from 'react-router-dom'
import logo from "../../Images/logo.png"
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import validator from 'validator';
import { Icon } from '@iconify/react';
import {motion}from 'framer-motion'
import swal from 'sweetalert'
import { currentUser } from '../../utils/CurrentUser'
import { Maximize } from '@mui/icons-material'




const Sign = () => {

    const nav = useNavigate()

    const [user, setuser] = useState({
        name:"", email:"", contact:"", password:""
    })

   
    

    const [showPassword, setshowPassword] = useState(false)
    const handleClickShowPassword = () => setshowPassword((show) => !show);
    const handleMouseDownPassword = () => setshowPassword(!showPassword);
   

    const handleInput = (e)=>{
        setuser({...user, [e.target.name]:e.target.value})
    }

    const checkPhone = user.contact? validator.isMobilePhone(user.contact, "en-IN"):true
    const emailCheck = user.email? validator.isEmail(user.email):true
    const checkName = user.name? validator.isAlpha(user.name, 'en-IN', {ignore: '\s'}):true
  
        


    const [Email_Exits, setEmail_Exits] = useState(false)
    
    const check_Email_Exits = async()=>{
      const res = await axios.get("/user/")
      console.log(res.data);
      const result = res.data.find(x=>x.email===user?.email)
      {result? setEmail_Exits(true):setEmail_Exits(false)}
      console.log(result);
    }




    



    

    const handleSign = async()=>{
        
        const res = await axios.post("/user/",{
            name:user.name,
            email:user.email,
            contact:user.contact,
            password:user.password
        })
        await swal("Sign Up Successfully!", "you are ready to login!", "success");
        window.location.href='/login'
        setuser({name:"", email:"",contact:"", password:""})
    }

    useEffect(()=>{
      if(currentUser){
        // window.location.href='/'
        nav("/")
      }

      console.log(user.name.length);

      check_Email_Exits()
    },[user])

  return (
    <div>
        <Box className='sign-container'>
            <Stack direction={{md:"row", sm:"column-reverse", xs:"column-reverse"}} >

                <Box className='sign-img' >
                    <img src={signimg} width='550px' alt='sign-img' height='580px'  />
                </Box>

                <Box className='sign-field' width='400px'>
                    <Box className='sign-logo'>
                    <img src={logo} alt='logo'/>
                    </Box>

                    <Stack>
                    <Typography variant='h5' fontWeight='bold'  sx={{paddingLeft:"50px",paddingBottom:"20px", paddingTop:"40px"}}>Sign Up</Typography>
                    <Box className='sign-field1' >
                    <Stack spacing={3} width="300px">
                    <TextField placeholder='Please Enter Name Here' label='Name' value={user.name} name='name' onChange={handleInput}  
                    sx={{bgcolor:"white", borderRadius:"5px"}} error={checkName==false}
                    size='small' 
                    InputProps={{endAdornment:(<InputAdornment position='end'><Icon icon="charm:person" fontSize='25px' color='grey' /></InputAdornment>), inputMode:"text"}} />

                    <TextField placeholder='Please Enter Email Here' label='Email'  type={"email"} name='email' value={user.email} onChange={handleInput} 
                    sx={{bgcolor:"white",borderRadius:"5px"}} size='small' error={emailCheck===false || Email_Exits==true} helperText={Email_Exits===true?"Email Already Exists":null}
                    InputProps={{endAdornment:(<InputAdornment position='end'><Icon icon="mi:email" fontSize='25px' color='grey' /></InputAdornment>)}} />

                    <TextField placeholder='Please Enter Contact No. Here.' label='Contact No.'  type={"phone"} error={checkPhone===false}
                    name='contact' value={user.contact} onChange={handleInput} sx={{bgcolor:"white",borderRadius:"5px"}} size='small'
                    InputProps={{endAdornment:(<InputAdornment position='end'><Icon icon="tabler:phone" fontSize='25px' color='grey' /></InputAdornment>)}} />


                    <TextField placeholder='Please Enter Password Here' label='Password' name='password' value={user.password} onChange={handleInput} 
                    size='small' sx={{bgcolor:"white",borderRadius:"5px"}}
                    type={showPassword ? 'text' : 'password'} 
                    InputProps={{ 
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton onClick={handleClickShowPassword} onMouseDown={handleMouseDownPassword}>
                              {showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
                            </IconButton>
                          </InputAdornment>
                        )
                      }}
                    />
                    </Stack>
                    </Box>

                   <Box className='sign-button'>
                    <Button variant='contained' fullWidth  onClick={handleSign} disabled={!user.name || user.name.length>25 ||!user.email || !user.contact || !user.password 
                    || emailCheck===false || checkPhone===false || Email_Exits===true || checkName==false  } 
                    color='success'>
                        Sign-up
                        </Button>
                   </Box>

                    <Box className='sign-login'>
                    <Stack direction='row' sx={{marginBottom:{sm:"10px", xs:"10px"}}}>
                   <Typography>Already have Account? </Typography>
                   <Link onClick={()=>nav("/login")} sx={{cursor:"pointer"}} component={motion.div} whileHover={{scale:1.1}}>Login</Link>
                    </Stack>
                    </Box>
                  
                    </Stack>
                </Box>
                
            </Stack>
        </Box>
    </div>
  )
}

export default Sign