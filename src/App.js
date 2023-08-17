import React, { Component } from 'react';
import { RouterProvider } from 'react-router-dom';
import routes from './routes/routes.js';
import axios from 'axios';
axios.defaults.withCredentials = true;
axios.defaults.baseURL='http://127.0.0.1:8000/';
axios.defaults.headers.post['Content-Type']= 'application/json'
axios.defaults.headers.post['Accept']= 'application/json';
axios.interceptors.request.use(function (config){
  const token=localStorage.getItem('auth_token')
  config.headers.Authorization= token ? `Bearer ${token}`:''
  return config
})
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
