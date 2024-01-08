import React from "react"; //
import ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import { Provider } from "react-redux";
import store from "./store";
//import "bootstrap/dist/css/bootstrap.min.css";
import "./assets/styles/bootstrap.custom.css";
import "./assets/styles/index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { HelmetProvider } from "react-helmet-async";
import PrivateRoute from "./components/privateroute";
import Admin_Route from "./components/adminroute";
import Homescreen from "./screens/homescreen";
import Productscreen from "./screens/productscreen";
import Cartscreen from "./screens/cartscreen";
import LoginScreen from "./screens/loginscreen";
import RegisterScreen from "./screens/registerscreen";
import ShippingScreen from "./screens/shippingscreen";
import PaymentScreen from "./screens/paymentscreen";
import PlaceOrderScreen from "./screens/placeorderscreen";
import OrderScreen from "./screens/orderscreen";
import ProfileScreen from "./screens/profilescreen";
import Order_List_Screen from "./screens/admin/orderlistscreen";
import Product_List_Screen from "./screens/admin/productlistscreen";
import Product_Edit_Screen from "./screens/admin/producteditscreen";
import User_Edit_Screen from "./screens/admin/usereditscreen";
import User_List_Screen from "./screens/admin/userlistscreen";

//this is the main entry point for the react app
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route index={true} path="/" element={<Homescreen />} />
      <Route path="/page/:pageNumber" element={<Homescreen />} />
      <Route path="/search/:keyword" element={<Homescreen />} />
      <Route
        path="/search/:keyword/page/:pageNumber"
        element={<Homescreen />}
      />
      <Route path="/product/:id" element={<Productscreen />} />
      <Route path="/cart" element={<Cartscreen />} />
      <Route path="/login" element={<LoginScreen />} />
      <Route path="/register" element={<RegisterScreen />} />

      <Route path="" element={<PrivateRoute />}>
        <Route path="/shipping" element={<ShippingScreen />} />
        <Route path="/payment" element={<PaymentScreen />} />
        <Route path="/placeorder" element={<PlaceOrderScreen />} />
        <Route path="/order/:id" element={<OrderScreen />} />
        <Route path="/profile" element={<ProfileScreen />} />
      </Route>
      <Route path="" element={<Admin_Route />}>
        <Route path="/admin/orderlist" element={<Order_List_Screen />} />
        <Route path="/admin/productlist" element={<Product_List_Screen />} />
        <Route
          path="/admin/product/:id/edit"
          element={<Product_Edit_Screen />}
        />
      </Route>
      <Route
        path="/admin/productlist/:pageNumber"
        element={<Product_List_Screen />}
      />
      <Route path="/admin/userlist" element={<User_List_Screen />} />
      <Route path="/admin/user/:id/edit" element={<User_Edit_Screen />} />
    </Route>
  )
);
//this is the main entry point for the react app
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <HelmetProvider>
      <Provider store={store}>
        <PayPalScriptProvider deferLoading={true}>
          <RouterProvider router={router} />
        </PayPalScriptProvider>
      </Provider>
    </HelmetProvider>
  </React.StrictMode>
);

reportWebVitals();
