import React, { useEffect, useState } from 'react'
import axios from 'axios'
import {Alert, Box, Button, IconButton, InputAdornment, Link, Snackbar, Stack, TextField, Typography}from "@mui/material"
import "./Login.css"
import {useNavigate}from 'react-router-dom'
import { Icon } from '@iconify/react';
import logo from "./../../Images/logo.png"
import loginimg from "./../../Images/login.png"
import validator from 'validator';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import {motion}from 'framer-motion'
import swal from 'sweetalert'
import { currentUser } from '../../utils/CurrentUser'
import { fetchUserDataById } from '../../redux/UserSlice'
import {useDispatch, useSelector}from "react-redux"

const Login = () => {

    const nav = useNavigate()
    const dispatch = useDispatch()

    const [user, setuser] = useState({
        email:"", password:""
    })

    const [isEmail, setisEmail] = useState()

    const [showPassword, setshowPassword] = useState(false)
    const handleClickShowPassword = () => setshowPassword((show) => !show);
    const handleMouseDownPassword = () => setshowPassword(!showPassword);

    const [open, setOpen] = React.useState(false);

    const handleInput=(e)=>{
        setuser({...user,[e.target.name]:e.target.value})

        const checkEmail = user.email?validator.isEmail(user.email):setisEmail(false)
        setisEmail(checkEmail)
    }


   

    const handleLogin = async(e)=>{
        const res = await axios.post('/user/login',{
            email:user.email,
            password:user.password
        }) 

        
       
        if(res.data.mess==='login'){
          const id = res.data.data._id  
          localStorage.setItem("currentUser", JSON.stringify(res.data.data))
          setuser({email:"", password:""})
          await swal("Login Successful", "You are ready to go", "success");
          window.location.href = "/"
        }else{
          setuser({...user,[e.target.name]:e.target.value})
          await swal("Invalid Crendentails", "Please try again", "error");
        }
    }

    useEffect(()=>{
      if(currentUser){
        // window.location.href="/"
        nav("/")
      }

      
    },[])


  return (
    <div>
        <Box className='login-container1'>
            <Stack direction='row'>
                <Box className='login-img' >
                    <img src={loginimg} alt='login-img' width='550px' height='570px'/>
                </Box>
                <Box className='login-field' width='400px'>
                    <Stack>
                    <Box className='logo-img'>
                    <img src={logo} alt='logo'/>
                    </Box>

                    <Stack>
                    <Box className='login-header'>
                    <Typography variant='h5' fontWeight='bold'>Login</Typography>
                    <Typography variant='caption'>Please login here</Typography>
                    </Box>

                    <Stack spacing={3} width="300px">
                    <TextField variant='outlined' size='small' label='Email' type='email' placeholder='Please enter Email here' name='email' value={user.email}
                    onChange={handleInput} className='login-field1' error={isEmail===false}
                    InputProps={{endAdornment:(<InputAdornment position='end'><Icon icon="mi:email" fontSize='25px' color='grey' /></InputAdornment>)}}/>

                    <TextField variant='outlined' size='small' label='Password'  placeholder='Please enter Password here' name='password' value={user.password}
                    onChange={handleInput} className='login-field1'
                    type={showPassword ? 'text' : 'password'} 
                    InputProps={{ 
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton onClick={handleClickShowPassword} onMouseDown={handleMouseDownPassword}>
                              {showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
                            </IconButton>
                          </InputAdornment>
                        )
                      }}/>

                    </Stack>
                    <Box className='login-button'>
                    <Button variant='contained' color='info' onClick={handleLogin} disabled={!user.email || !user.password || isEmail===false} fullWidth>
                        Login
                    </Button>
                    </Box>
                    <Stack direction='row'>
                    <Typography>Don't have Account?</Typography>
                    <Link onClick={()=>nav("/sign")} sx={{cursor:"pointer"}}  component={motion.div} whileHover={{scale:1.1}}>Sign Up</Link>
                    </Stack>
                    </Stack>

                    </Stack>
                </Box>
            </Stack>
        </Box>
    </div>
  )
}

export default Login