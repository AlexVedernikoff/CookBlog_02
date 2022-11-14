import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';

import './firebase';
import store from './store/index';
import './index.css';
import App from './components/App/App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Provider store={store}>
        <App />
    </Provider>
);
