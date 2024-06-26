// src/pages/HomePage.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Spinner } from 'react-bootstrap';
import StockChart from '../components/StockChart';


const HomePage = () => {
  const [stockData, setStockData] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/stock')
      .then(response => {
        setStockData(response.data);
      })
      .catch(error => {
        console.error('Error fetching stock data:', error);
      });
  }, []);

  return (
    <Container>
      <h1 className="mt-4">Stock Statistics</h1>
      {stockData.length > 0 ? (
        <StockChart stockData={stockData} />
      ) : (
        <div className="d-flex justify-content-center">
          <Spinner animation="border" />
        </div>
      )}
    </Container>
  );
};

export default HomePage;
