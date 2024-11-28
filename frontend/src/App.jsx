import React from 'react'
import { BrowserRouter, Route,Routes } from 'react-router-dom'
import Home from './components/Home'
import Login from './components/Login'
import SignUp from './components/SignUp'
import Error from './components/Error'
import First from './components/First'
import { Toaster } from 'react-hot-toast'
import Edit from './components/Edit'
import Create from './components/Create'

const App = () => {
  return (
    <>
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<First/>}/>
      <Route path='/home' element={<Home/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='/signUp' element={<SignUp/>}/>
      <Route path='/create' element={<Create/>}/>
      <Route path='/edit/:id' element={<Edit/>}/>
      <Route path='*' element={<Error/>}/>
    </Routes>
    <Toaster/>
    </BrowserRouter>
      
    </>
  )
}

export default App

