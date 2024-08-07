import { configureStore } from "@reduxjs/toolkit";

import countReducer from "./countslice"

const store = configureStore({
    reducer:{
      counter:countReducer,  
    }
})
export default store;

