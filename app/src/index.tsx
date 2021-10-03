import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import reportWebVitals from './reportWebVitals';
import { ApolloProvider } from "@apollo/client";
import { client } from './graph/ApolloClient';
import CssBaseline from '@mui/material/CssBaseline';
import { GlobalTheme } from './GlobalTheme';
import { ThemeProvider } from '@mui/system';
import { ToastContainer } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';

ReactDOM.render(
    <React.StrictMode>
        <ApolloProvider client={client}>
            <ThemeProvider theme={GlobalTheme}>
                <React.Fragment>
                    <CssBaseline />
                    <App />
                </React.Fragment>
            </ThemeProvider>
        </ApolloProvider>
        <ToastContainer
            position="top-right"
            autoClose={1500}
            hideProgressBar={false}
            newestOnTop
            closeOnClick
            rtl={false}
        />
    </React.StrictMode>,
    document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
