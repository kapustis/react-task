import React, {PureComponent} from 'react';
import {connect} from 'react-redux';
import {connect as connectTicker} from '../services';
import {UPDATE_STOCK_TICKER, RESET_STOCK_TICKER} from '../reducers/types';
import '../styles/application.scss';

// The below line is here as an example of getting prices
class App extends PureComponent {
    componentDidMount() {
        connectTicker('AAPL', this.props.updateStockTicker);
    }

    render() {
        const {ticker} = this.props;
        // console.log(ticker);
        return (
              <div className="stock-ticker">
                <p>{ticker.ticker.ticker}</p>
                <p>{ticker.ticker.exchange}</p>
                <p>{ticker.ticker.change}</p>
                <p>{ticker.ticker.change_percent}</p>
                <p>{ticker.ticker.dividend}</p>
                <p>{ticker.ticker.last_trade_time}</p>
                <p>{ticker.ticker.price}</p>
                <p>{ticker.ticker.yield}</p>
                <button type="button" onClick={this.props.resetStockTinker}> Reset</button>
              </div>
        );
    }
}

const mapStateToProps = state => ({ticker: state});
const mapDispatchToProps = dispatch => ({
    updateStockTicker: data => dispatch({type: UPDATE_STOCK_TICKER, payload: data}),
    resetStockTinker: () => dispatch({type: RESET_STOCK_TICKER})
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
