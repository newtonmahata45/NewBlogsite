import { useState } from 'react'
import './App.css'
import Home from './Home'
import Register from './Register'
import Login from './Login'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Blogpage from './Blogpage'
import Createbog from './Createbog'

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' Component = {Home}  />
          <Route path='/register' Component = { Register } />
          <Route path='/login' Component = { Login } />
          <Route path='/blogpage/:id' Component = { Blogpage } />
          <Route path='/creatblog' Component = { Createbog } />
        </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
