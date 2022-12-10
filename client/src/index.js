import React, {createContext} from 'react';
import ReactDOM from 'react-dom/client';
import './styles/Main.scss';
import App from './App';
import reportWebVitals from './reportWebVitals';
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
