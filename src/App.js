import React, { useState, useEffect } from 'react';
import './App.css';
import WeatherCard from './components/WeatherCard';
import 'bootstrap/dist/css/bootstrap.css';
import { Button, Col, Form, FormControl, Row } from 'react-bootstrap';
const API_KEY = process.env.REACT_APP_WEATHER_API_KEY;

function App() {
  const [weatherData, setWeatherData] = useState([]);
  const [inputText, setInputText] = useState();
  const API_KEY = process.env.REACT_APP_WEATHER_API_KEY;
  const imageURL = 'https://openweathermap.org/img/wn/';
  const [city, setCity] = useState('Oslo');
  const [error, setError] = useState(false);

  useEffect(() => {
    getCityLatlong();
  }, [city]);

  // Getting city latitude and longitude
  function getCityLatlong() {
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`)
      .then((response) => response.json())
      .then((data) => {
        setError(false);
        console.log('inside getCityLatlong', data);
        let lat = data?.coord?.lat;
        let long = data?.coord?.lon;
        if ((lat && long !== null) || undefined) {
          fetchWeatherData(lat, long);
        } else {
          setError(true);
          console.log('invalid city');
        }
      })
      .catch((error) => {
        setError(true);
        console.log('something went wrong', error.error);
      });
  }

  // fetching data from server
  function fetchWeatherData(lat, long) {
    fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${long}&exclude=minutely,alerts,hourly&appid=${API_KEY}`)
      .then((response) => response.json())
      .then((data) => {
        console.log('inside fetchWeatherData', data);
        setError(false);
        setWeatherData(data && data.daily ? data.daily : []);
      })
      .catch((error) => {
        setError(true);
        console.log('something went wrong', error.error);
      });
  }

  //set cityname in the input text
  function handleSubmit(e) {
    e.preventDefault();
    console.log('this is the city:', inputText);
    setCity(inputText);
  }

  return (
    <div className="main-div">
      <main>
        <h1 className="heading">Search for a city:</h1>

        <Form onSubmit={(e) => handleSubmit(e)}>
          <Row className="mt-4">
            <Col lg={1} sm={1}></Col>
            <Col className="m-0" lg={9} sm={9}>
              <Form.Group>
                <FormControl
                  type="text"
                  className="form-input"
                  placeholder="Enter City Name"
                  onChange={(e) => setInputText(e.target.value)}
                />
              </Form.Group>
            </Col>
            <Col lg={2} sm={2}>
              <Button className="buttonClass" variant="primary" type="submit">
                Submit
              </Button>
            </Col>
          </Row>
        </Form>

        {error ? (
          <h3 className="m-3">No data found ! </h3>
        ) : (
          <>
            <h4 className="mt-5 cityName cardText">Weather of {city}:</h4>
            <Row>
              {weatherData.map((info, index) => {
                return (
                  <Col key={index} sm={12} xsm={12} lg={3} md={6}>
                    <WeatherCard
                      date={info?.dt}
                      temp={info?.temp?.day}
                      description={info?.weather[0]?.description}
                      wind={info?.wind_speed}
                    />
                  </Col>
                );
              })}
            </Row>
          </>
        )}
      </main>
    </div>
  );
}

export default App;
