import React from 'react'
import ReactDOM from 'react-dom/client'
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
import ProductsUser from './pages/user/products/Products.tsx';
import CreateProduct from './pages/admin/products/CreateProduct.tsx';
import UpdateProduct from './pages/admin/products/UpdateProduct.tsx';
import Category from './pages/admin/categories/Category.tsx';
import Provider from './pages/admin/providers/Provider.tsx';
import UserLayout from './layouts/user/UserLayout.tsx';
import Home from './pages/user/home/Home.tsx';
import Promotion from './pages/user/promotions/Promotion.tsx';
import ProductDetail from './pages/user/products/ProductDetail.tsx';

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
    path: "/admin/products/categories",
    element: <AdminLayout><Category /></AdminLayout>,
  },
  {
    path: "/admin/products/providers",
    element: <AdminLayout><Provider /></AdminLayout>,
  },
  {
    path: "/home",
    element: <UserLayout><Home /></UserLayout>
  },
  {
    path: "/products",
    element: <UserLayout><ProductsUser /></UserLayout>
  },
  {
    path: '/promotions',
    element: <UserLayout><Promotion /></UserLayout>
  }, 
  {
    path: "/products/:id",
    element: <UserLayout><ProductDetail /></UserLayout>
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
