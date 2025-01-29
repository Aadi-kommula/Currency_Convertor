import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import './App.css'
function App() {
  const [currencies, setcurrencies] = useState('')
  const [FromCurrency, setFromCurrency] = useState('1inch')
  const [ToCurrency, setToCurrency] = useState('1inch')
  const [FromValue, setFromValue] = useState(1)
  const [ToValue, setToValue] = useState(1)

  //fecthing currency countries data

  useEffect(() => {
    fetch('https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies.json')
      .then((response) => response.json())
      .then((data) => {
        setcurrencies(data)
      })
  }, [])

  //Caluclating currency values 

  function Caluclate() {
    fetch(`https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/${FromCurrency}.json`)
      .then((response) => response.json())
      .then((data) => {
        setToValue(FromValue * data[FromCurrency][ToCurrency])

      })
  }
  return (
    <>
      <div className='flex justify-center items-center flex-col h-screen '>
        <div id="select" className='w-auto h-auto bg-white flex flex-col rounded pl-16 pr-16 pt-5 pb-7'>
          <heading className='m-2 '>Currency Convertor</heading>

          {/* Display text  */}
          <h3>{FromValue} {currencies[FromCurrency]} equals </h3>
          <h1>{ToValue} {currencies[ToCurrency]}</h1>

          <div className="flex-row">
            <input type="tel"
              onChange={(e) => { setFromValue(e.target.value) }}
              placeholder='Enter the amount of currency '
              name="input from" id="" /><br />
              
            <select className='w-30 h-10 bg-white' name="" id="from" onChange={(e) => setFromCurrency(e.target.value)}>
              {Object.entries(currencies).map(([currencyCode, CurrencycCountry]) =>
                <option key={currencyCode} value={currencyCode}>
                  {CurrencycCountry}
                </option>)}
            </select>
            <arrow>→</arrow>
            <select className='w-30 h-10 mx-3 bg-white' name="" id="from" onChange={(e) => { setToCurrency(e.target.value) }}>
              {Object.entries(currencies).map(([currencyCode, CurrencycCountry]) =>
                <option key={currencyCode} value={currencyCode}>
                  {CurrencycCountry}
                </option>)}
            </select>
            {/* <input className='bg-white m-2' type="tel" value={ToValue} disabled name="input from" id="" /> */}
          </div>
          <button className='bg-gray-200 ' onClick={Caluclate} >Fetch Data</button>
        </div>

      </div>
    </>
  )
}

export default App;