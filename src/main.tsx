import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { App } from './App';
import './style.css';
import './board.css';
import './training.css';
import './space-vader.css';

createRoot(document.getElementById('root')!).render(<StrictMode><App /></StrictMode>);
