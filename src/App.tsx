import { Route, Routes } from "react-router-dom";

import "./App.css";
import About from "./pages/About";
import Checkout from "./pages/Checkout";
import Dashboard from "./pages/Dashboard";
import Home from "./pages/Home";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";
import Product from "./pages/Product";
import ProductDetail from "./pages/ProductDetail";
import ErrorBoundary from "@/components/error-boundary";
import PrivateRoute from "@/components/routes/PrivateRoute";

function App() {
  return (
    <>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Home />} />
        <Route
          path="/products"
          element={
            <ErrorBoundary>
              <Product />
            </ErrorBoundary>
          }
        />
        <Route
          path="/products/:id"
          element={
            <ErrorBoundary>
              <ProductDetail />
            </ErrorBoundary>
          }
        />
        <Route
          path="/checkout"
          element={
            <PrivateRoute>
              <Checkout />
            </PrivateRoute>
          }
        />
        <Route
          path="/dashboard"
          element={
            <PrivateRoute allowedRoles={["admin"]}>
              <Dashboard />
            </PrivateRoute>
          }
        />
        <Route path="/about" element={<About />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
