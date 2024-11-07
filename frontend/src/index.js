import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import { Chart, CategoryScale, LinearScale, ArcElement, BarElement, LineElement, BarController, LineController } from 'chart.js';


// Register Chart.js components globally
Chart.register(CategoryScale, LinearScale, ArcElement, BarElement, LineElement, BarController, LineController);

const rootElement = document.getElementById('root');
const root = createRoot(rootElement);

root.render(<App />);
