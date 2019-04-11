import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Button, Modal, Header, Image, Container, Divider, Grid, Menu, Segment, Icon, Popup, Form, Table, Label } from 'semantic-ui-react';

export default class Test extends Component {
    render() {
        <div>
            <h1>Hello from test-render</h1>
        </div>;
       return (
            <div>
               <h1>Hello from test-return</h1>
               <Button primary>Hello World</Button>
            </div>
        );
    }
} 

const app = document.getElementById("test");
ReactDOM.render(< Test />, app);