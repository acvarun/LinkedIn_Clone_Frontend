import React from 'react'
import {Routes, Route } from "react-router-dom";
import './App.css'
import Login from './components/Login/Login';
import Home from './components/Home/Home';
import Register from './components/Register/Register';
import CreatePost from './components/CreatePost/CreatePost';
import CreateMedia from './components/CreateMedia/CreateMedia';


function App() {

  return (
    <>
    <Routes>
      <Route path='/login' element={<Login/>}/>
      <Route path='/' element={<Register/>}/>
      <Route path='/feed' element={<Home/>}/>
      <Route path='/createpost' element={<CreatePost/>}/>
      <Route path='/createmedia' element={<CreateMedia/>}/>
    </Routes>
    </>
  );
}

export default App;
