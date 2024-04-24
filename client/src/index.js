import React, {createContext} from 'react';
import ReactDOM from 'react-dom/client';
import './styles/Main.scss';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter as Router } from "react-router-dom";
import StatisticsStore from "./store/statisticsStore"

const root = ReactDOM.createRoot(document.getElementById('root'));

export const Context = createContext(null)

root.render(
 //<React.StrictMode>
    <Context.Provider value = {{ stat:new StatisticsStore()}}>
    <Router>
      <App />
      </Router>
   </Context.Provider>
 // </React.StrictMode>
);

reportWebVitals();
