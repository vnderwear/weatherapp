import React, {useState} from 'react';
import axios from 'axios';

function App() {
  const [data,setData] = useState({})
  const [location,setLocation] = useState('')
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=imperial&appid=586e77bfd368f1ac88088c63f02fb78e`
  const [error, setError] = useState('');

  const searchLocation = (event) => {
    if(event.key === 'Enter'){
      axios.get(url).then((response) =>{
        setData(response.data)
        console.log(response.data)
        setError('')
      })
      .catch((error) => {
        setError('City not found or API request failed.')
        setData({})
      });
      setLocation('')
    }
  }

  return (
    <div className="App">
      <div className='search'>
        <input
        value={location}
        onChange={event => setLocation(event.target.value)}
        onKeyPress={searchLocation}
        placeholder='Enter Location Here'
        type='text'
        ></input>
      </div>
        <div className='top'>
          <div className='location'>
            <p>{data.name}</p>
          </div>
          <div className='temp'>
            {data.main? <h1>{data.main.temp}°F</h1>: null}
          </div>
          <div className='description'>
            {data.weather? <p>{data.weather[0].main}</p>: null}
            
          </div>
        </div>
        <div className='bottom'>
          <div className='feels'>
            {data.main? <p>Feels Like: {data.main.feels_like}°F</p>: null}
          </div>
          <div className='humidity'>
            {data.main? <p>Humidity: {data.main.humidity}%</p>: null}
          </div>
        </div>
      </div>
  );
}

export default App;
