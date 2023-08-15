import React, { Component } from 'react';
import { BrowserRouter as Router, Route, RouterProvider, Routes } from 'react-router-dom';
import MasterLayout from './layouts/admin/MasterLayout';
import routes from './routes/routes.js'
class App extends Component {
  render() {
    return (
      <div className="App">
        <RouterProvider router={routes}/>
      </div>
    );
  }
}

export default App;
