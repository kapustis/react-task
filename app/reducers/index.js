import { UPDATE_STOCK_TICKER, RESET_STOCK_TICKER }from './types';

const initialState = {
    ticker: []
};

const stockTicker = (state = initialState, action) => {
    switch (action.type) {
        case UPDATE_STOCK_TICKER:
            return {...state, ticker: action.payload};
        case RESET_STOCK_TICKER:
            return {...state, ticker: []};
        default:
            return state;
    }
};

export default stockTicker;
