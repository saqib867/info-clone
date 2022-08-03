import React from 'react';
import * as ReactDOMClient from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { StateProvider } from './stateProvoider';
import reducer, { initialState } from './reducer';

ReactDOMClient.createRoot(
  document.querySelector("#root"))
  .render(
      
       <StateProvider initialState={initialState} reducer={reducer}>
             <App/>
        </StateProvider>
    
    );

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
