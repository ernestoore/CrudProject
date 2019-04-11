// ./src/common/main.component.jsx
import React, { Component } from 'react';
import ReactDOM from 'react-dom';

export default class App extends Component {
    constructor() {
        super();
    }

    render() {
        return (
            <div>
                <h1>Welcome</h1>
                <ul className="header">
                    <li><a href="/">Home</a></li>
                    <li><a href="/stuff">Stuff</a></li>
                    <li><a href="/contact">Contact</a></li>
                </ul>
                <div className="content" />
            </div>
        );
        
    }
}
const app = document.getElementById('home');
ReactDOM.render(<div><h1 className="anim">Welcome To Shop</h1><App /></div>, app);
