import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../pages/home/Home";
import Login from "../components/Login";
import Register from "../components/Register";
import CartPage from "../pages/books/CartPage";
import CheckoutPage from "../pages/books/CheckoutPage";
import SingleBook from "../pages/books/SingleBook";
import PrivateRoute from "./PrivateRoute";
import OrderPage from "../pages/books/OrderPage";
import AdminRoute from "./AdminRoute";
import AdminLogin from "../components/AdminLogin";
import DashboardLayout from "../pages/dashboard/DashboardLayout";
import Dashboard from "../pages/dashboard/Dashboard";
import ManageBooks from "../pages/dashboard/manageBooks/ManageBooks";
import AddBook from "../pages/dashboard/addBook/AddBook";
import UpdateBook from "../pages/dashboard/EditBook/UpdateBook";
import UserDashboard from "../pages/dashboard/users/UserDashboard";
import PaypalPayment from "../pages/books/PaypalPayment";
import FinishSignUp from "../components/FinishSignUp";
import TermsAndConditions from "../pages/TermsAndConditions";
import PurchasePolicy from "../pages/PurchasePolicy";

// import Paypal from "../pages/books/Paypal";
import ForgotPassword from "../components/ForgotPsswd";
import ChangePassword from "../components/ChangePassword";

import Services from '../pages/Services';
import About from '../pages/About';
import Contact from '../pages/Contact';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      { path: "/terms-and-conditions",
        element: <TermsAndConditions /> 
      },
      { path: "/purchase-policy",
        element: <PurchasePolicy /> 
      },
      { path: "/services", element: <Services /> },
      { path: "/about", element: <About /> },
      { path: "/contact", element: <Contact /> },
      {
        path: "FinishSignUp",
        element: <FinishSignUp />
      },
      {
        path: "/orders",
        element: <PrivateRoute><OrderPage /></PrivateRoute>
      },
      {
        path: "/about",
        element: <div>About</div>,
      },
      {
        path: "/paypal",
        element: <PrivateRoute><PaypalPayment /></PrivateRoute>
      },
      {
        path: "/login",
        element: <Login />
      },
      {
        path: "/register",
        element: <Register />
      },
      {
        path: "/cart",
        element: <CartPage />
      },
      {
        path: "/checkout",
        element: <PrivateRoute><CheckoutPage /></PrivateRoute>
      },
      {
        path: "/books/:id",
        element: <SingleBook />

      },
      {
        path: "/user-dashboard",
        element: <PrivateRoute><UserDashboard /></PrivateRoute>
      },
      {
        path: "/forgot-password",
        element: <ForgotPassword/>
      },
      {
        path: "/change-password",
        element: <PrivateRoute><ChangePassword/></PrivateRoute>
      },
      {
        path: "FinishSignUp",
        element:<FinishSignUp/>
       }
    ]
    
  },
  {
    path: "/admin",
    element: <AdminLogin />
  },
  {
    path: "/dashboard",
    element: <AdminRoute><DashboardLayout /></AdminRoute>,
    children: [
      {
        path: "",
        element: <AdminRoute><Dashboard /></AdminRoute>
      },
      {
        path: "add-new-book",
        element: <AdminRoute> <AddBook /> </AdminRoute>
      },
      {
        path: "edit-book/:id",
        element: <AdminRoute><UpdateBook /></AdminRoute>
      },
      {
        path: "manage-books",
        element: <AdminRoute><ManageBooks /></AdminRoute>
      },
      {
        path: "user-dashboard",
        element: <PrivateRoute><UserDashboard /></PrivateRoute>
      }
    ]
  }
]);

export default router;