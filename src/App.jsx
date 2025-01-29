import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
function App() {
  const [currencies, setcurrencies] = useState('')
  const [FromCurrency, setFromCurrency] = useState('1inch')
  const [ToCurrency, setToCurrency] = useState('1inch')
  const [FromValue,setFromValue]=useState(0)
  const [ToValue,setToValue]=useState()

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
      .then((response)=>response.json())
      .then((data)=>{
        setToValue(FromValue*data[FromCurrency][ToCurrency])
        
      })
  }
  return (
    <>
      {/* from section */}
      <div className='flex justify-center items-center flex-col '>
        <h1>My First React App</h1><br />
        <div id="select" className='w-92 h-auto bg-gray-300 flex flex-col'>
          <label htmlFor="select" className='m-3'>From</label>
          <select className='w-30 m-2 bg-white' name="" id="from" onChange={(e) => setFromCurrency(e.target.value)}>
            {Object.entries(currencies).map(([currencyCode, CurrencycCountry]) =>
              <option key={currencyCode} value={currencyCode}>
                {CurrencycCountry}
              </option>)}
          </select>
          <input className='bg-white m-2' type="tel" onChange={(e)=>{setFromValue(e.target.value)}} placeholder='Enter a value ' name="input from" id="" />
          <button className='bg-green-500 w-22 p-0 m-2' onClick={Caluclate} >Calculate</button>
        </div>
        <br />
        {/* To section  */}
        <div id="select" className='w-92 h-auto bg-gray-300 flex flex-col'>
          <label htmlFor="select" className='m-3'>To</label>
          <select className='w-30 m-2 bg-white' name="" id="from" onChange={(e) => { setToCurrency(e.target.value) }}>
            {Object.entries(currencies).map(([currencyCode, CurrencycCountry]) =>
              <option key={currencyCode} value={currencyCode}>
                {CurrencycCountry}
              </option>)}
          </select>
          <input className='bg-white m-2' type="tel" value={ToValue} disabled name="input from" id="" />
        </div>
      </div>
    </>
  )
}

export default App;