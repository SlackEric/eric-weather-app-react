import React from 'react';
import './App.css';
import Header from './components/Header';
import Navigation from './components/Navigation';
import Main from './components/Main';
import Footer from './components/Footer';
import { getWeatherFor } from './utils/axios';
import { connect } from 'react-redux';
import { fetchDataThunkAction } from './redux/weatherActions'; 

class App extends React.Component {
  constructor(props) {
      super(props);

      this.state ={
          unit: 'c',
          current: {},
          cityName: '',
          forecast: {},
          input: ''
      }
  }

  componentDidMount() {
      this.props.fetchWeatherData('Brisbane');
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


  handleChangeLimit = limit => {
      this.setState({limit});
      this.state.updateLimit(5);
  }


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
        />
        <Footer />
      </div>
    );
  }

}

const mapDispatchToProps = dispatch => ({
    fetchWeatherData: city => dispatch(fetchDataThunkAction(city)),
});

export default connect(null, mapDispatchToProps)(App);
