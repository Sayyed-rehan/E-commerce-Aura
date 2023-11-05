import React from 'react'
import { currentUser } from './CurrentUser'
import swal from 'sweetalert'

const Authentication = async() => {
    if(!currentUser){
        await swal ({
            title:"Not Login",
            text:"Please login first",
            icon:"info",
            buttons:"Go to login",
            dangerMode:true
        })

        window.location.href = '/login'
    }
}

export default Authentication