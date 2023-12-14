import { configureStore } from "@reduxjs/toolkit";
import weatherSlice from "./Weather/weatherSlice";


const store = configureStore({
    reducer: {
        weather: weatherSlice,
    }
})

export default store