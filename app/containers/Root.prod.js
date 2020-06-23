import React, {Fragment} from 'react';
import PropTypes from 'prop-types';
import { Provider } from 'react-redux';
import { Route } from 'react-router-dom';
import { ConnectedRouter } from 'react-router-redux';

import App from '../components/App';

export default function Root({store, history}) {
    return (
        <Provider store={store}>
            <Fragment>
                <ConnectedRouter history={history}>
                    <Route path="/" component={App}/>
                </ConnectedRouter>
            </Fragment>
        </Provider>
    );
}

Root.propTypes = {
    store: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired
};
