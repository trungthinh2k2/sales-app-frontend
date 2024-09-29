import { createBrowserRouter, Navigate } from "react-router-dom";
import AdminLayout from "../layouts/admin/AdminLayout";
import Dashboard from "../pages/admin/Dashboard";
import Products from "../pages/admin/products/Products";
import CreateProduct from "../pages/admin/products/CreateProduct";
import UpdateProduct from "../pages/admin/products/UpdateProduct";
import Category from "../pages/admin/categories/Category";
import Provider from "../pages/admin/providers/Provider";
import UserLayout from "../layouts/user/UserLayout";
import Home from "../pages/user/home/Home";
import Promotion from "../pages/user/promotions/Promotion";
import ProductUser from "../pages/user/products/Products";
import ProductDetail from "../pages/user/products/ProductDetail";
import Cart from "../pages/user/cart/Cart";
import Login from "../pages/user/auth/Login";
import LoginSuccsess from "../pages/user/auth/LoginSuccsess";
import Register from "../pages/user/auth/Register";
import Verify from "../pages/user/auth/Verify";
import ProtectRouter from "./ProtectRoutes";
import { Role } from "../models/user.model";
import ForgotPassword from "../pages/user/auth/ForgotPassword";
import PaymentSuccess from "../pages/user/cart/PaymentSuccess";

const adminRoutes = [
    {
        path: "/admin/dashboard",
        element: <ProtectRouter role={Role.ROLE_ADMIN}><AdminLayout><Dashboard /></AdminLayout></ProtectRouter>,
      },
      {
        path: "/admin/products",
        element: <ProtectRouter role={Role.ROLE_ADMIN}><AdminLayout><Products /></AdminLayout></ProtectRouter>
      },
      {
        path: "/admin/products/create",
        element: <ProtectRouter role={Role.ROLE_ADMIN}><AdminLayout><CreateProduct /></AdminLayout></ProtectRouter>
      },
      {
        path: "/admin/products/update/:id",
        element: <ProtectRouter role={Role.ROLE_ADMIN}><AdminLayout><UpdateProduct /></AdminLayout></ProtectRouter>,
      },
      {
        path: "/admin/products/categories",
        element: <ProtectRouter role={Role.ROLE_ADMIN}><AdminLayout><Category /></AdminLayout></ProtectRouter>,
      },
      {
        path: "/admin/products/providers",
        element: <ProtectRouter role={Role.ROLE_ADMIN}><AdminLayout><Provider /></AdminLayout></ProtectRouter>,
      },
]
const userRoutes = [
    {}
]

const publicRoutes = [
    {
        path: "/home",
        element: <UserLayout><Home /></UserLayout>
      },
      {
        path: "/",
        element: <Navigate to="/home" />
      },
      {
        path: '/promotions',
        element: <UserLayout><Promotion /></UserLayout>
      },
      {
        path: '/products',
        element: <UserLayout><ProductUser /></UserLayout>
      },
      {
        path: "/products/:id",
        element: <UserLayout><ProductDetail /></UserLayout>
      },
      {
        path: '/cart',
        element: <UserLayout><Cart /></UserLayout>
      },
      {
        path: '/payments/success',
        element: <UserLayout><PaymentSuccess /></UserLayout>
      },
      {
        path: '/auth/login',
        element: <Login></Login>
      },
      {
        path: '/auth/login-success',
        element: <LoginSuccsess></LoginSuccsess>
      },
      {
        path: '/auth/register',
        element: <Register></Register>
      },
      {
        path: '/auth/verify-email',
        element: <Verify></Verify>
      },
      {
        path: '/auth/forgot-password',
        element: <ForgotPassword></ForgotPassword>
      }
]

export const router = createBrowserRouter([
    ...adminRoutes,
    ...userRoutes,
    ...publicRoutes
  ]);