import React from 'react';
import { Provider } from 'react-redux';
import createStore from './redux/createStore';

import LoadingSpinner from './components/LoadingSpinner/LoadingSpinner';
import Navigation from './Navigation';

import './App.css';

const store = createStore();

function App() {
    return (
        <Provider store={store}>
            <LoadingSpinner/>
            <Navigation/>
        </Provider>
    );
}

export default App;
