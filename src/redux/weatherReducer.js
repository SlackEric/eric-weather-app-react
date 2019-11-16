import { CHANGE_LIMIT, 
        FETCH_DATA_SUCCESS,
        FETCH_DATA,
        FETCH_DATA_FAILURE} from './weatherActions'

const initialState = {
    limit: 5,
    cityName: '',
    current: {},
    forecasts: [],
    isLoading: false,
    error: null
};

const weatherReducer = (state = initialState, action) => {
    switch(action.type) {
        case CHANGE_LIMIT: 
            return {
                ...state,
                limit: action.limit,
            };
        case FETCH_DATA:
            return {
                ...state,
                isLoading: true
            };
        case FETCH_DATA_SUCCESS:
            console.log(action.data);
                const cityName = action.data.data.data.city.name;
                const current = action.data.data.data.current;
                const forecasts = action.data.data.data.forecast.slice(0, 10);
            return {
                ...state,
                isLoading: false,
                cityName,
                current,
                forecasts
            };
        case FETCH_DATA_FAILURE:
            return {
                ...state,
                error: action.error,
                isLoading: false
            }
        default:
            return state;
    }
};

export default weatherReducer;