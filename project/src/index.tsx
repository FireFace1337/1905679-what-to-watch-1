import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/app/app';

const Setting = {
  year: 2022,
  genre: 'Horror',
  title: 'Life'
};

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);

root.render(
  <React.StrictMode>
    <App
      year = {Setting.year}
      genre = {Setting.genre}
      title = {Setting.title}
    />
  </React.StrictMode>,
);
