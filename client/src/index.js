import React, {createContext} from 'react';
import ReactDOM from 'react-dom/client';
import './styles/Main.scss';
import App from './App';
import reportWebVitals from './reportWebVitals';
<<<<<<< Updated upstream

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
=======
import { BrowserRouter as Router } from "react-router-dom";
import exerlevelStore from "./store/exerlevelStore"

export const Context = createContext(null)
//console.log(process.env.REACT_APP_API_URL)

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Context.Provider value = {{exerlevel: new exerlevelStore()}}>
        <React.StrictMode>
                <App />
        </React.StrictMode>
    </Context.Provider>
);

reportWebVitals();
>>>>>>> Stashed changes
