import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"; 
import axios from "axios";

// fetch User by Id
export const fetchUserDataById = createAsyncThunk("fetchData", async(x)=>{
    const responce = await axios.get(`http://localhost:5000/user/${x}`);
    console.log('from slice',responce.data);
    return responce.data
});


export const UserSlice = createSlice({
    name:"user",
    initialState:{
        loading:false,
        user_data:null
    },


    extraReducers:(builder)=>{
        builder.addCase(fetchUserDataById.fulfilled, (state, action)=>{
            state.loading = false;
            state.user_data = action.payload
        });
        builder.addCase(fetchUserDataById.pending, (state,action)=>{
            state.loading = true
        })
    }
})

export const {} = UserSlice.actions

export default UserSlice.reducer