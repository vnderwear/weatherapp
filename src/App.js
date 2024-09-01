import React, {useState} from 'react';
import axios from 'axios';

function App() {
  const [data,setData] = useState({})
  const [location,setLocation] = useState('')
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=imperial&appid=586e77bfd368f1ac88088c63f02fb78e`
  const [error, setError] = useState('');
  const [showModal, setShowModal] = useState(false);

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
  const handleInfoClick = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <div className="App">
      <header>
        <h1>Weather App</h1>
        <p>Developed by Xavier Jackson</p>
        <button id="info-button" onClick={handleInfoClick}>Info</button>
      </header>
      
      {showModal && (
        <div id="info-modal" className="modal">
          <div className="modal-content">
            <span className="close-button" onClick={handleCloseModal}>&times;</span>
            <h2>PM Accelerator</h2>
            <p>PM Accelerator is the premier AI learning and development hub, featuring award-winning AI products and mentors from top-tier companies such as Google, Meta, and Apple. We offer a dynamic AI PM Bootcamp, designed to empower the next generation of AI professionals through hands-on experience, mentorship, and real-world projects.</p>
          </div>
        </div>
      )}
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
