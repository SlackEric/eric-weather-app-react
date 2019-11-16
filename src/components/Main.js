import React from 'react';
import WeatherCondition from './WeatherCondition';
import WeatherForecast from './WeatherForecast';

function Main (props) {

    return (
        <main>
            <WeatherCondition 
                unit={props.unit}
            />
            <WeatherForecast 
                unit={props.unit}
            />
        </main>
    );
}

export default Main;