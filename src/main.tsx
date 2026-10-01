import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import './index.css';

// Prevent benign ResizeObserver loop limit errors from triggering dev overlays or uncaught exceptions
if (typeof window !== 'undefined') {
  const isResizeObserverError = (msg: unknown) => {
    if (typeof msg === 'string') {
      return (
        msg.includes('ResizeObserver loop completed with undelivered notifications') ||
        msg.includes('ResizeObserver loop limit exceeded')
      );
    }
    return false;
  };

  window.addEventListener('error', (event) => {
    if (isResizeObserverError(event.message)) {
      event.stopImmediatePropagation();
      event.stopPropagation();
      event.preventDefault();
      return false;
    }
  });

  window.addEventListener('unhandledrejection', (event) => {
    if (isResizeObserverError(event.reason?.message || event.reason)) {
      event.stopImmediatePropagation();
      event.stopPropagation();
      event.preventDefault();
      return false;
    }
  });
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
