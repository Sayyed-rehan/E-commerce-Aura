import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"; 
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { initializeUseSelector } from "react-redux/es/hooks/useSelector";




// fetch all products
export const fetchProductData = createAsyncThunk("fetchData", async()=>{
    const responce = await axios.get("/product/");
    console.log('from slice',responce.data);
    return responce.data
});


// fetch all products by Pagination
export const fetchProductDataByPagination = createAsyncThunk("fetchData", async(x)=>{
    console.log('.......active');
    const responce = await axios.get(`/product/page?page=${x}&limit=${6}`);
    console.log('from slice',responce.data);
    return responce.data
});



//fetch data by Id
export const fetchProductDataById = createAsyncThunk("fetchData", async(x)=>{
    const responce = await axios.get(`/product/findById/${x}`);
    console.log('from',responce.data);
    return responce.data
});


//fetch by product name
// export const fetchProductDataByName = createAsyncThunk("fetchData",async(x)=>{
//     console.log('pname',x);
//     const responce = await axios.get(`/product/findByName/${x}`);
//     console.log('from name',responce.data);
//     return responce.data
// });

export const fetchProductDataByName = createAsyncThunk("fetchData",async(params)=>{

    const {productName,page} = params
    console.log('pram',params);
    const responce = await axios.get(`/product/findByName/${page}/${6}?product_name=${productName}`);
    console.log('from name',responce.data);
    return responce.data.data
});


//fetch by gender
export const fetchProductDataByGender = createAsyncThunk("fetchData",async(params)=>{

   const {x,page} = params

    const responce = await axios.get(`/product/findByGender/${x}/${page}/6`);
    console.log('from name',responce.data);
    return responce.data.data
});


//fetch by category
// export const fetchProductDataByCategory = createAsyncThunk("fetchData",async(x)=>{
//     const responce = await axios.get(`/product/findByQuery?category=${x}`);
//     console.log('from name',responce.data);
//     return responce.data
// });

export const fetchProductDataByCategory = createAsyncThunk("fetchData",async(params)=>{

    console.log("......Alive");
    const {x,page} = params
    console.log('dsss',params);
    const responce = await axios.get(`/product/findbyCategory/${x}/${page}/6`);
    console.log('from name',responce.data);
    return responce.data.data
});


//fetch by Brand
// export const fetchProductDataByBrand = createAsyncThunk("fetchData",async(x)=>{
//     const responce = await axios.get(`/product/findByBrand?brand=${x}`);
//     console.log('from name',responce.data);
//     return responce.data
// });

export const fetchProductDataByBrand = createAsyncThunk("fetchData",async(params)=>{

    const {x,page} = params
  
    const responce = await axios.get(`/product/findByBrand?brand=${x}&page=${page}&limit=6`);
    console.log('from name',responce.data);

    return responce.data.data
});



//fetch by Price
// export const fetchProductDataByPirce = createAsyncThunk("fetchData",async(x)=>{
//     const responce = await axios.get(`/product/findByPrice/?minPrice=${x}&maxPrice=${x+1000}`);
//     console.log('from name',responce.data);
//     return responce.data
// });

export const fetchProductDataByPirce = createAsyncThunk("fetchData",async(params)=>{
  const {x, page} = params
    const responce = await axios.get(`/product/findByPrice/?minPrice=${x}&maxPrice=${x+1000}&page=${page}&limit=6`);
    console.log('from name',responce.data);
    return responce.data.data
});


//fetch by Ratigs
// export const fetchProductDataByRating = createAsyncThunk("fetchData",async(x)=>{
//     const responce = await axios.get(`/product/findByRatings/?minRating=${x}&maxRating=${x+1}`);
//     console.log('from name',responce.data);
//     return responce.data
// });

export const fetchProductDataByRating = createAsyncThunk("fetchData",async(params)=>{
    
    const {x,page} = params
    const responce = await axios.get(`/product/findByRatings/?minRating=${x}&maxRating=${x+1}&page=${page}&limit=6`);
    console.log('from rate',responce.data);
    return responce.data.data
});



export const ProductSlice = createSlice({
    name:"product",
    initialState:{
        loading:false,
        data:null,
        value:1,
        count:0
    },


    reducers:{
        setCount:(state,action)=>{
            state.count = action.payload
        },
        setPage(state, action) {
           state.value = action.payload
    },
    
    },

    extraReducers:(builder)=>{
        builder.addCase(fetchProductData.fulfilled, (state, action)=>{
            state.loading = false;
            state.data = action.payload
        });
        builder.addCase(fetchProductData.pending, (state,action)=>{
            state.loading = true
        })
    },

    extraReducers:(builder)=>{
        builder.addCase(fetchProductDataByPagination.fulfilled, (state, action)=>{
            state.loading = false;
            state.data = action.payload
        });
        builder.addCase(fetchProductDataByPagination.pending, (state,action)=>{
            state.loading = true
        })
    },

    extraReducers:(builder)=>{
        builder.addCase(fetchProductDataById().fulfilled, (state, action)=>{
            state.loading = false;
            state.data = action.payload
        });
        builder.addCase(fetchProductDataById().pending, (state,action)=>{
            state.loading = true
        })
    },

    extraReducers:(builder)=>{
        builder.addCase(fetchProductDataByName.fulfilled, (state, action)=>{
            state.loading = false;
            state.data = action.payload
        });
        builder.addCase(fetchProductDataByName.pending, (state,action)=>{
            state.loading = true
        })
    },

    extraReducers:(builder)=>{
        builder.addCase(fetchProductDataByGender.fulfilled, (state, action)=>{
            state.loading = false;
            state.data = action.payload
        });
        builder.addCase(fetchProductDataByGender.pending, (state,action)=>{
            state.loading = true
        })
    },


    extraReducers:(builder)=>{
        builder.addCase(fetchProductDataByCategory.fulfilled, (state, action)=>{
            state.loading = false;
            state.data = action.payload
        });
        builder.addCase(fetchProductDataByCategory.pending, (state,action)=>{
            state.loading = true
        })
    },


    extraReducers:(builder)=>{
        builder.addCase(fetchProductDataByBrand.fulfilled, (state, action)=>{
            state.loading = false;
            state.data = action.payload
        });
        builder.addCase(fetchProductDataByBrand.pending, (state,action)=>{
            state.loading = true
        })
    },

    extraReducers:(builder)=>{
        builder.addCase(fetchProductDataByPirce.fulfilled, (state, action)=>{
            state.loading = false;
            state.data = action.payload
        });
        builder.addCase(fetchProductDataByPirce.pending, (state,action)=>{
            state.loading = true
        })
    },

    extraReducers:(builder)=>{
        builder.addCase(fetchProductDataByRating.fulfilled, (state, action)=>{
            state.loading = false;
            state.data = action.payload
        });
        builder.addCase(fetchProductDataByRating.pending, (state,action)=>{
            state.loading = true
        })
    }
})

export const {addUser,setPage, setCount} = ProductSlice.actions

export default ProductSlice.reducer