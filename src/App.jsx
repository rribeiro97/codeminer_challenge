import React from 'react';
import TopbarComponent from './components/TopBarComponent/TopBarComponent';

import './App.scss';
import HomePage from './pages/HomePage/HomePage';

const App = () => (
  <div data-testid="app">
      <TopbarComponent />
      <HomePage/>
  </div>
);

export default App;
