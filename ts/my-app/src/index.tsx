import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App'; // Import the App component

// Fix for 'global is not defined' in Vite
(window as any).global = window;

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

root.render(
  <BrowserRouter>
    <App />  {/* Only calling the App component here */}
  </BrowserRouter>
);
