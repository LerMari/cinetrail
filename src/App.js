import React from 'react';
import './App.css';
import Header from './components/Header/Header';
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import ThemeContextProvider from './contexts/ThemeContext';


function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <ThemeContextProvider>
      <Header />
      <Routes>

      </Routes>
      </ThemeContextProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
