import React from 'react';
import './App.css';
import Header from './components/Header';
import Navigation from './components/Navigation';
import Main from './components/Main';
import Footer from './components/Footer';
import { getWeatherFor } from './utils/axios';

class App extends React.Component {
  constructor(props) {
      super(props);

      this.state ={
          unit: 'c',
          input: '',
          cityName: '',
          current: {},
          forecasts: [],
          limit: 5,
      }
  }

  componentDidMount() {
      getWeatherFor('brisbane')
      .then(this.updateWeather);
  }

toggleUnit = () => {
  this.setState(state => ({ unit: state.unit === 'c' ? 'f' : 'c'}));
}

updateWeather = res => {
  const data = res.data.data;
  const cityName = data.city.name;
  const current = data.current;
  const forecasts = data.forecast.slice(0, 10);
  this.setState({cityName, current, forecasts});
}

handleSearch = () => {
  getWeatherFor(this.state.input)
  .then(this.updateWeather);
}

/*
  handleChangeLimit = limit => {
      this.setState({limit});
  }
  */

  handleInputChange = event => {
      this.setState({ input: event.target.value });
  }

  render() {
    return (
      <div className="weather-channel__container">
        <Header />
        <Navigation 
         inputValue={this.state.input}
         handleInputChange={this.handleInputChange}
         handleSearch={this.handleSearch}
         toggleUnit={this.toggleUnit}
         unit={this.state.unit}
         />
        <Main 
            unit={this.state.unit}
            cityName={this.state.cityName}
            current={this.state.current}
            forecasts={this.state.forecasts}
            handleChangeLimit={this.handleChangeLimit}
            limit={this.state.limit}
        />
        <Footer />
      </div>
    );
  }

}

export default App;
