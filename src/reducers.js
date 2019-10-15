import { combineReducers } from 'redux';

const initialState = {
    limit: 5,
};

export const weatherForecast = (state = initialState, action) => {
    switch (action.type) {
        case 'UPDATE_LIMIT':
            return {
                ...state,
                limit: state.limit
            };
        default:
            return state;
    }
};

export default combineReducers({
    weatherForecast,
})