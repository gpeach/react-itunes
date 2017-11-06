import React from 'react';
import ReactDOM from 'react-dom';
import FetchArtist from './FetchArtist';
import './index.css';

// Change subreddit to whatever you like:
ReactDOM.render(
  <FetchArtist artist='gorgon+city' />,
  document.getElementById('root')
);
