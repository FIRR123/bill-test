import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

import add from "@/test.js"
let total = add(1,1)
console.log(total)

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <App />
);

