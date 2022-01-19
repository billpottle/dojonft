import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {HashRouter as Router} from 'react-router-dom';
import './index.css';
import './styles/main.scss';

ReactDOM.render(
    
    <React.StrictMode>
      <Router>
            <App />
      </Router>
        </React.StrictMode>
       ,
  document.getElementById('app')
);