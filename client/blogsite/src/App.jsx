import { useState } from 'react'
import './App.css'
import Home from './Home'
import Register from './Register'
import Login from './Login'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Blogpage from './Blogpage'

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' Component = {Home}  />
          <Route path='/register' Component = { Register } />
          <Route path='/login' Component = { Login } />
          <Route path='/blogpage' Component = { Blogpage } />
        </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
