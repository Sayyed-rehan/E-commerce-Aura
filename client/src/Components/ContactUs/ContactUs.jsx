import React, { useEffect, useState } from 'react'
import "./ContactUs.css"
import { Box, Button, CircularProgress, Grid, LinearProgress, Link, Typography } from '@mui/material'
import { Icon } from '@iconify/react'
// import Map from "../../Images/Map.png"
import { motion } from 'framer-motion'
import axios from 'axios'
import {currentUser}from "../../utils/CurrentUser"




const ContactUs = () => {
   

  

  return (
    <div className='contact-div-container'>
        <Box className="contact-us-container">
            <Box className="contact-us-header">
                <Typography fontFamily='poppins' fontWeight='bold' variant='h4'>Contact Us</Typography>
            </Box>
            <Box className="contact-us-main-container" boxShadow={12}>
                <Grid container>
                    <Grid item xs={6} sx={{bgcolor:''}}>
                        <Box className="grid-1">
                            <Typography fontFamily='poppins' fontWeight='bold' variant='h6'>
                                <Icon  icon="fluent:call-24-regular" fontSize='25px' color='#FF9A62'/>
                                By Phone
                            </Typography>
                            <Typography fontFamily='poppins' fontWeight='bold' variant='subtitle2'>
                                (Monday to Friday 9am to 4pm IST)
                            </Typography>
                            
                            <Typography fontFamily='poppins'variant='subtitle2' >India Toll Free No.
                                <br />
                                1-301-864-2786
                            </Typography>

                            <Typography fontFamily='poppins' variant='subtitle2'>International 
                                <br />
                                1-604-63-1231
                            </Typography>
                        </Box>
                    </Grid>
                    <Grid item xs={6} sx={{bgcolor:''}}>
                        <box className="grid-2">
                            <Link variant='body1' href="https://goo.gl/maps/rAdiGqmiTRSG52kW9"  sx={{cursor:"pointer"}}>
                                Click here
                            </Link>

                            {/* <img src={Map} alt='map' width='350'/> */}

                            <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3770.225564774918!2d74.7325015!3d19.097758000000002!
                            2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bdcb089c6ea6b03%3A0xbcff4f8c7e247abc!2sDelhi%20Gate%2C%20Delhi%20
                            Gate%20Rd%2C%20Sarjepura%20city%2C%20Ahmednagar%2C%20Maharashtra%20414001!5e0!3m2!1sen!2sin!4v1695453734626!5m2!1sen!2sin" 
                            width="350" height="210" style={{border:1,borderStyle:"solid", borderColor:"black"}} allowfullscreen="" loading="eager" referrerpolicy="no-referrer-when-downgrade">
                            </iframe>

                            <Typography fontFamily='poppins' variant='subtitle2'>
                                <strong>Address - </strong>
                                4450 court lane near Jama Masjid, Ahmednagar, Maharashtra, 414001
                            </Typography>
                         
                      
                        </box>
                    </Grid>
                </Grid>
            </Box>
        </Box>
    </div>
  )
}

export default ContactUs