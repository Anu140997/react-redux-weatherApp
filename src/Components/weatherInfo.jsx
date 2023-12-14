import React, { useState } from 'react';
import { Input, Button, Row, Col, Spin, Table, } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { getCityData, get5DaysForecast } from '../Store/Weather/weatherSlice';
import WeatherCards from './WeatherCard';

const WeatherInfo = () => {
  const dispatch = useDispatch();

  const [city, setCity] = useState('');
  const [unit, setUnit] = useState('metric');

  const { citySearchData, forecastLoading, forecastData, forecastError } = useSelector((state) => state.weather);

 

  console.log("citySearchData", citySearchData)

  const fetchData = async () => {
    try {
      const response = await dispatch(
        getCityData({
          city,
          unit,
        })
      );
  
      // Check if the city data is available
      if (!response.payload?.error) {
        console.log("response.payload", response.payload.coord.lat)
        // Extract lat and lon from the city data
        const { lat, lon } = response.payload.coord;
  
        // Call get5DaysForecast with the correct parameters
        dispatch(
          get5DaysForecast({
            lat,
            lon,
            unit,
          })
        );
      }
    } catch (error) {
      console.error('Error fetching city data:', error.message);
    }
  };

  const handleSearch = () => {
    fetchData();
  };


  const mapForecastData = () => {
    if (forecastData) {
      console.log("item", forecastData)
      return forecastData.list.map((item) => ({
        key: item.dt,
        date: new Date(item.dt * 1000).toLocaleDateString(),
        temperature: `${Math.ceil(item.main.temp)}°C`,
        weather: item.weather[0].description,
        temp_max: item.main.temp_max,
        temp_min: item.main.temp_min,
        pressure: item.main.pressure,
        humidity: item.main.humidity,
      }));
    }
    return [];
  };

  const columns = [
    {
      title: 'Date',
      dataIndex: 'date',
      key: 'date',
    },
    {
      title: 'Temperature (°C)',
      dataIndex: 'temperature',
      key: 'temperature',
    },
    {
      title: 'Min Temperature',
      dataIndex: 'temp_min',
      key: 'temp_min',
    },
    {
      title: 'MAX Temperature',
      dataIndex: 'temp_max',
      key: 'temp_max',
    },
    {
      title: 'Pressure',
      dataIndex: 'pressure',
      key: 'pressure',
    },
    {
      title: 'Humidity',
      dataIndex: 'humidity',
      key: 'humidity',
    },
    {
      title: 'Weather',
      dataIndex: 'weather',
      key: 'weather',
    },
  ];


  return (
    <div>
      <Row gutter={[12, 12]} justify="center" >
        <Col xs={24} sm={24} md={10} lg={10} xl={10} offset={4} >
          <Input
            placeholder="Search...."
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
        </Col>
        <Col xs={24} sm={24} md={4} lg={4} xl={4} >
          <Button type="primary" onClick={handleSearch} style={{ width: '100%' }}>
            Search
          </Button>
        </Col>
      </Row>

   

    {forecastLoading && <Spin />}
      {forecastError && <p style={{ color: 'red' }}>{forecastError}</p>}
      {forecastData && (

        <WeatherCards forecastData={mapForecastData()}/>

        
      )}
    </div>
  );
};


export default WeatherInfo;

