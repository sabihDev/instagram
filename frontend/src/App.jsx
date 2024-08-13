import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './App.css'
import Signup from './components/Signup'
import MainLayout from './components/MainLayout'
import Home from './components/Home'
import Login from './components/Login'

function App() {

  const browserRouter = createBrowserRouter([
    {
      path: '/',
      element: <MainLayout/>,
      children:[{
        path: '/',
        element: <Home/>
      }]
    },
    {
      path: '/signup',
      element: <Signup/>
    },
    {
      path: '/login',
      element: <Login/>
    }
  ])

  return (
    <>
      <RouterProvider router={browserRouter}/>
    </>
  )
}

export default App
