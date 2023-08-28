import React from 'react'
import ReactDOM from 'react-dom/client'
import {App} from './components/App'
import {createBrowserRouter,RouterProvider} from 'react-router-dom';
import { Login } from './components/Login';
import { Register } from './components/Register';

const routes = createBrowserRouter([
  {
    path:'/',
    element: <Login/>
  },
  {
    path:'/register',
    element: <Register/>
  },
  {
    path:'/products',
    element: <App/>
  }
])

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
      <RouterProvider router={routes}/>
  </React.StrictMode>,
)
