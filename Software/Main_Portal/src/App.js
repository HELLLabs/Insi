import React, { Component } from 'react';
import Layout from './Hoc/Layout/Layout'
import {BrowserRouter} from 'react-router-dom'
// import './App.css';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div>
          <Layout />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
