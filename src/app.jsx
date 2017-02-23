import React from 'react';
import { render } from 'react-dom';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';

import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers/rootReducer';

import Main from './components/Main';
import Customers from './components/customers/Customers';
import Invoices from './components/invoices/Invoices';
import Products from './components/products/Products';
import InvoiceNew from './components/invoices/InvoiceNew';
import InvoiceEdit from './components/invoices/InvoiceEdit';

const store = createStore(
  rootReducer,  
  applyMiddleware(thunk)  
);

render(
    <Provider store={store}>
        <Router history={browserHistory}>
            <Route path="/" component={Main}>
                <IndexRoute  component={Invoices}/>
                <Route path="products" component={Products}/>
                <Route path="customers" component={Customers}/>
                <Route path="invoices/new" component={InvoiceNew}/>
                <Route path="invoices/:id" component={InvoiceEdit}/>
            </Route>
        </Router>
    </Provider>,
    document.getElementById('app-root'));
