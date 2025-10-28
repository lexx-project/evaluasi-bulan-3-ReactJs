import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import App from "./App.tsx";
import { AuthProvider } from "@/components/hooks/useAuth";
import { CartProvider } from "@/components/hooks/useCart";
import { ProductProvider } from "@/components/hooks/useProducts";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <CartProvider>
        <AuthProvider>
          <ProductProvider>
            <App />
          </ProductProvider>
        </AuthProvider>
      </CartProvider>
    </BrowserRouter>
  </StrictMode>
);
