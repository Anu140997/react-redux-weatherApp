import React from 'react';
import { Card, Row, Col } from 'antd';

const WeatherCards = ({ forecastData }) => {
  const renderCards = () => {
    return forecastData.map((item) => (
      <Col key={item.key} span={8}>
        <Card title={item.date} style={{ margin: '8px' }}>
          <p>Temperature: {item.temperature}</p>
          <p>Min Temperature: {item.temp_min}°C</p>
          <p>Max Temperature: {item.temp_max}°C</p>
          <p>Pressure: {item.pressure} hPa</p>
          <p>Humidity: {item.humidity}%</p>
          <p>Weather: {item.weather}</p>
        </Card>
      </Col>
    ));
  };

  return <Row gutter={16}>{renderCards()}</Row>;
};

export default WeatherCards;
