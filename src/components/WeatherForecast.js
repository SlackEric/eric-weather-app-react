import React from 'react';
import {format} from 'date-fns';
import { connect } from 'react-redux';
import {updateLimitAction} from '../actions';
import ForecastRow from './ForecastRow';

class WeatherForecast extends React.Component {


    render() {
        const {limit, unit} = this.props;
        const forecasts = this.props.forecasts.slice(0, limit);

        return (
            <section className="weather-forecast">
                <div className="forecast__switch">
                    <button
                        className={`forecast__switch_0 ${limit === 5 ? ' switch-active' : ''}`}
                        onClick={() => this.props.handleChangeLimit(5)}
                    >
                        5 items
                    </button>
                    <button
                        className={`forecast__switch_1 ${limit === 10 ? ' switch-active' : ''}`}
                        onClick={() => this.props.handleChangeLimit(10)}
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
    limit: state.weatherForecast.limit
});

const mapDispatchToProps = dispatch => ({
    updateLimit: limit => dispatch(updateLimitAction(limit)),
});

export default connect(mapStateToProps, mapDispatchToProps)(WeatherForecast);