import React, { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [currencies, setCurrencies] = useState({});
  const [FromCurrency, setFromCurrency] = useState('1inch');
  const [ToCurrency, setToCurrency] = useState('1inch');
  const [FromValue, setFromValue] = useState(1);
  const [ToValue, setToValue] = useState(1);

  const [FromCurrency1, setFromCurrency1] = useState('1inch');
  const [ToCurrency1, setToCurrency1] = useState('1inch');
  const [FromValue1, setFromValue1] = useState(1);

  // Fetching currency countries data
  useEffect(() => {
    fetch('https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies.json')
      .then((response) => response.json())
      .then((data) => {
        setCurrencies(data);
      });
  }, []);

  // Update state values when the user clicks "Fetch Data"
  const handleFetchData = () => {
    setFromCurrency(FromCurrency1);
    setToCurrency(ToCurrency1);
    setFromValue(FromValue1);
  };

  // Calculate ToValue whenever FromCurrency, ToCurrency, or FromValue changes
  useEffect(() => {
    if (FromCurrency && ToCurrency && FromValue) {
      fetch(`https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/${FromCurrency}.json`)
        .then((response) => response.json())
        .then((data) => {
          const formula = data[FromCurrency][ToCurrency];
          setToValue(FromValue * formula);    
        })
        .catch((error) => {
          console.error('Error fetching conversion rate:', error);
        });
    }
  }, [FromCurrency, ToCurrency, FromValue]);

  const validateInput = (value) => {
    if (!/^\d*\.?\d*$/.test(value)) {
      alert('Please enter a valid positive number');
      return false;
    }
    return true;
  };

  return (
    <div className='container flex justify-center items-center flex-col h-screen'>
      <div id="select" className='w-auto h-auto bg-white flex flex-col rounded pl-16 pr-16 pt-5 pb-7'>
        <heading className='m-2'>Currency Convertor</heading>
        {/* Display text */}
        <h3>{FromValue} {currencies[FromCurrency]} equals </h3>
        <h1>{ToValue} {currencies[ToCurrency]}</h1>

        <div className="flex-col justify-center items-center">
          <input
            type="text"
            min={1}
            onBlur={(e) => {
              if (!validateInput(e.target.value)) {
                e.target.value = '';
              } else {
                setFromValue1(e.target.value);
              }
            }}
            placeholder='Enter the amount of currency'
            name="input from"
            id='inputbox'
          /><br />

          <select
            className='w-30 h-10 bg-white'
            name="from"
            id="from"
            onChange={(e) => setFromCurrency1(e.target.value)}
          >
            {Object.entries(currencies).map(([currencyCode, CurrencycCountry]) => (
              <option key={currencyCode} value={currencyCode}>
                {CurrencycCountry}
              </option>
            ))}
          </select>
          <arrow>→</arrow>
          <select
            className='w-30 h-10 mx-3 bg-white'
            name="to"
            id="to"
            onChange={(e) => setToCurrency1(e.target.value)}
          >
            {Object.entries(currencies).map(([currencyCode, CurrencycCountry]) => (
              <option key={currencyCode} value={currencyCode}>
                {CurrencycCountry}
              </option>
            ))}
          </select>
        </div>
        <button onClick={handleFetchData}>Fetch Data</button>
        <img src="/graph.jpg" alt="graph" />
      </div>
    </div>
  );
}

export default App;