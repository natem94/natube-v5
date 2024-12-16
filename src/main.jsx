import React from 'react';
import ReactDOM from 'react-dom/client'; // Замість 'react-dom'
import { Provider } from 'react-redux';
import App from './App';
import store from './store';

// Отримуємо кореневий елемент
const rootElement = document.getElementById('root');
const root = ReactDOM.createRoot(rootElement);

// Використовуємо новий API для рендерингу
root.render(
    <Provider store={store}>
             <App />
    </Provider>
);
