import Card from 'react-bootstrap/Card';
import 'bootstrap/dist/css/bootstrap.css';
import tempIcon from '../assets/icons8-hot-48.png';
import windIcon from '../assets/icons8-wind-16.png';
import humidityIcon from '../assets/humidity.png';
import '../App.css';
function WeatherCard({ temp, description, wind, date }) {
  let day = new Date(date * 1000);

  function isToday(date) {
    const today = new Date();
    console.log(today);
    if (today.toDateString() === date.toDateString()) {
      return true;
    }
    return false;
  }
  return (
    <>
      <Card className="mt-5">
        <Card.Body>
          <Card.Text className="cardText">{isToday(day) ? 'Today' : day.toDateString()}</Card.Text>
          <Card.Title className="cardTitle">
            <div>
              <div>
                <span className="mx-3">
                  <img className="icons" src={tempIcon} />
                </span>
                Temp : <span>{temp}</span>
              </div>
              <div>
                <span className="mx-3">
                  <img className="icons" src={humidityIcon} />
                </span>
                Detail: <span>{description}</span>
              </div>
              <div>
                <span className="mx-3">
                  <img className="icons" src={windIcon} />
                </span>
                Wind: <span>{wind}</span>
              </div>
            </div>
          </Card.Title>
        </Card.Body>
      </Card>
    </>
  );
}

export default WeatherCard;
