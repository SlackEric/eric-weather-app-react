import React from 'react';
import {format} from 'date-fns';
import { connect } from 'react-redux';
import { changeLimitAction} from '../redux/weatherActions';
import ForecastRow from './ForecastRow';

class WeatherForecast extends React.Component {
    render() {
        const {changeLimit, limit, unit} = this.props;
        const forecasts = this.props.forecasts.slice(0, limit);

        return (
            <section className="weather-forecast">
                <div className="forecast__switch">
                    <button
                        className={`forecast__switch_0 ${limit === 5 ? ' switch-active' : ''}`}
                        onClick={() => changeLimit(5)}
                    >
                        5 items
                    </button>
                    <button
                        className={`forecast__switch_1 ${limit === 10 ? ' switch-active' : ''}`}
                        onClick={() => changeLimit(10)}
                    >
                        10 items
                    </button>
                </div>

                {forecasts.map(forecast => {
                    const date = new Date(forecast.time * 1000);
                    const day = format(date, 'EEE');
                    const time = format(date, 'HH:mm');

                    return (
                        <ForecastRow
                            unit={unit}
                            key={forecast.time}
                            day={day}
                            high={unit === 'c' ?  forecast.maxCelsius : forecast.maxFahrenheit}
                            low={unit === 'c' ? forecast.minCelsius : forecast.minFahrenheit}
                            time={time}
                        />
                    );
                })}
            </section>
        );
    };
}

 const mapStateToProps = state => ({
     limit: state.weather.limit,
     forecasts: state.weather.forecasts
 });



const mapDispatchToProps = dispatch => ({
    changeLimit: limit => dispatch(changeLimitAction(limit)),
});

export default connect(mapStateToProps, mapDispatchToProps)(WeatherForecast);