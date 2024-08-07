import { createSlice } from "@reduxjs/toolkit";

const countSlice = createSlice({
    name:"counter",
    initialState:{
        count:0,
        name:"Ali",
        loading: false,
    },
    reducers:{
        increment: (state)=>{
            state.count +=1;
        },
        decrement: (state)=>{
            state.count -=1;
        },
        changeName: (state, action)=>{
            state.name = action.payload;
        },
        changeLoading:(state, action)=>{
            state.loading = action.payload;
        }
    }
});
export const {increment, decrement, changeName, changeLoading} = countSlice.actions;
export default countSlice.reducer;