import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.scss'
import {
  Experimental_CssVarsProvider as CssVarsProvider,
} from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import { theme } from './theme.tsx';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Dashboard from './pages/admin/Dashboard.tsx';
import AdminLayout from './layouts/admin/AdminLayout.tsx';
import Products from './pages/admin/products/Products.tsx';
import CreateProduct from './pages/admin/products/CreateProduct.tsx';
import UpdateProduct from './pages/admin/products/UpdateProduct.tsx';
import Category from './pages/admin/categories/Category.tsx';

const router = createBrowserRouter([
  {
    path: "/admin/dashboard",
    element: <AdminLayout><Dashboard /></AdminLayout>,
  },
  {
    path: "/admin/products",
    element: <AdminLayout><Products /></AdminLayout>,
  },
  {
    path: "/admin/products/create",
    element: <AdminLayout><CreateProduct /></AdminLayout>,
  },
  {
    path: "/admin/products/update/:id",
    element: <AdminLayout><UpdateProduct /></AdminLayout>,
  },
  {
    path: "/admin/products/category",
    element: <AdminLayout><Category /></AdminLayout>,
  }
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <CssVarsProvider theme={theme}>
      <CssBaseline />
      <RouterProvider router={router}></RouterProvider>
    </CssVarsProvider>

  </React.StrictMode>,
)
