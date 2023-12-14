import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from "axios";

export const hostName = "https://api.openweathermap.org";
export const appId = "1635890035cbba097fd5c26c8ea672a1";

export const getCityData = createAsyncThunk('weather/getCityData', async (city) => {
  const response = await fetch(
    `${hostName}/data/2.5/weather?q=${city.city}&units=${city.unit}&APPID=${appId}`
  );
  const data = await response.json();
  if (response.ok) {
    return data;
  } else {
    throw new Error(data.message || 'Failed to fetch weather data');
  }
});


// get 5 days forecast of the provided city
export const get5DaysForecast = createAsyncThunk("5days", async (city) => {
  console.log("city", city)
  const request = await axios.get(
    `${hostName}/data/2.5/forecast?lat=${city.lat}&lon=${city.lon}&units=${city.unit}&APPID=${appId}`
  );
  const response = await request.data;
  return response;
});

const weatherSlice = createSlice({
  name: 'weather',
  initialState: {
    citySearchLoading: false,
    citySearchData: null,
    forecastLoading: false,
    forecastData: null,
    forecastError: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // city search
      .addCase(getCityData.pending, (state) => {
        state.citySearchLoading = true;
        state.citySearchData = null;
      })
      .addCase(getCityData.fulfilled, (state, action) => {
        state.citySearchLoading = false;
        state.citySearchData = action.payload;
      })
      // forecast
      .addCase(get5DaysForecast.pending, (state) => {
        state.forecastLoading = true;
        state.forecastData = null;
        state.forecastError = null;
      })
      .addCase(get5DaysForecast.fulfilled, (state, action) => {
        state.forecastLoading = false;
        state.forecastData = action.payload;
        state.forecastError = null;
      })
      .addCase(get5DaysForecast.rejected, (state, action) => {
        state.forecastLoading = false;
        state.forecastData = null;
        state.forecastError = action.error.message;
      });
  },
});

export default weatherSlice.reducer;