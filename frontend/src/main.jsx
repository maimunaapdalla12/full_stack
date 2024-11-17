import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import App from './App';
import './index.css';

import RegisterPage from './pages/RegisterPage';

import LoginPage from './pages/LoginPage';


import {UserProvider} from './hooks/useUser'
import  { Toaster } from 'react-hot-toast';
import Pages from './pages/Pages';




const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [

 
      {
        path: "/register",
        element: <RegisterPage />
      },

      {
        path:"/login",
        element: < LoginPage/>
      },
      {
        path: "/Pages",
        element: <Pages />
      }
     
    ]
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <UserProvider>
    <Toaster />
    <RouterProvider router={router} />
    </UserProvider>
   
  </React.StrictMode>,
);

