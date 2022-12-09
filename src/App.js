import React from 'react';
import './App.css';
import Header from './components/Header/Header';
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import ThemeContextProvider from './contexts/ThemeContext';
import Homepage from './pages/Homepage/Homepage';
import MovieDetails from './pages/MovieDetails/MovieDetails';



function App() {

  // const apiKey = process.env.REACT_APP_API_KEY;
  // const baseUrl = process.env.REACT_APP_BASE_URL;
  
  // // console.log(baseUrl);
  // // console.log(apiKey);

  return (
    <div className="App">
      <BrowserRouter>
      <ThemeContextProvider>
      <Header />
      <Routes>
        <Route path='/' element={<Homepage />} />
        <Route path='/moviedetails/:movieId' element={<MovieDetails />} />

      </Routes>
      </ThemeContextProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
