import React, {PureComponent} from 'react';
import {connect} from 'react-redux';
import {connect as connectTicker} from '../services';
import {UPDATE_STOCK_TICKER, RESET_STOCK_TICKER} from '../reducers/types';
import CardHeader from './CardHeader';
import CardBody from './CardBody';
import '../styles/application.scss';

const LENGTH = 10;

// The below line is here as an example of getting prices
class App extends PureComponent {
    constructor() {
        super(undefined);
        this.prices = [];
    }

    componentDidMount() {
        connectTicker('AAPL', this.props.updateStockTicker);
    }

    managePrices() {
        const {price} = this.props.ticker.ticker;
        if (!price) return;

        this.prices.push(price);

        if (this.prices.length > LENGTH) this.prices.splice(0, this.prices.length - LENGTH);
    }

    render() {
        this.managePrices();
        const {ticker} = this.props;
        return (
          <div className="stock-ticker">
            <CardHeader initialPrice={this.prices[0]} ticker={ticker.ticker} />
             <CardBody prices={this.prices} />
             {/* <button type="button" onClick={this.props.resetStockTinker}> Reset</button>*/}
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
