import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/app/app';
import { films } from './mocks/films';
import { promoFilm } from './mocks/promoFilm';
import { favouriteFilms } from './mocks/favouriteFilms';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);

root.render(
  <React.StrictMode>
    <App
      films={films}
      promoFilm={promoFilm}
      favouriteFilms={favouriteFilms}
    />
  </React.StrictMode>,
);
