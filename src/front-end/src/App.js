import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Container } from "react-bootstrap";
import { Outlet } from "react-router-dom"; //Outlet is a placeholder for the child routes, means in folder it is index.js

import "react-toastify/dist/ReactToastify.css";
import { logout } from "./slices/authSlice";
import Header from "./components/header";
import Footer from "./components/footer";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    const expirationTime = localStorage.getItem("expirationTime");
    if (expirationTime) {
      const currTime = new Date().getTime();
      if (currTime > expirationTime) {
        dispatch(logout());
      }
    }
  }, [dispatch]);
  return (
    <>
      <ToastContainer />
      <Header />
      <main>
        <Container className="py-3">
          {/* This is where the nested routes will be rendered */}
          <Outlet />
        </Container>
      </main>
      <Footer />
      <ToastContainer />
    </>
  );
};

export default App;
