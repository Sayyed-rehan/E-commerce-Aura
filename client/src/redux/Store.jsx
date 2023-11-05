import { configureStore } from "@reduxjs/toolkit"; 
import ProductSlice from "./ProductSlice";
// import User

export default configureStore({
    reducer:{
        Product:ProductSlice
    }
})