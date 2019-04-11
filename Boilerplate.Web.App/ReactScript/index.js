//import './stylesheets/style.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import './style/myStyle.css';
import React, { Component } from 'react';
import { render } from 'react-dom';
import App from './Component/App.jsx';
import Product from './Component/Product.jsx';


function renderApp() {
    render(
        <App/>,
        document.getElementById("home")
    );
}
renderApp();

// Allow Hot Module Replacement
if (module.hot) {
    module.hot.accept();
    //module.hot.accept('./routes', () => { const NextApp = require('./routes').default; renderApp(); });
}