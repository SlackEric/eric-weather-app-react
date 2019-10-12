import React from 'react';
import ForecastRow from './ForecastRow';

function WeatherForecast() {
    return (
        <section className="weather-forecast">
            <div className="forecast__switch">
                <button className="forecast__switch_0 switch-active">5 items</button>
                <button className="forecast__switch_1">10 items</button>
            </div>

            <ForecastRow day="Friday" high="19 c" low="8 c" time="10:00"/>
            <ForecastRow />
            <ForecastRow />
        </section>
    );
}

export default WeatherForecast;