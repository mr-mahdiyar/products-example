import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/home-page";
import ProductPage from "./pages/product-page";
import NotFoundPage from "./pages/not-found-page";
import MainLayout from "./layouts/main-layout";

type AppProp = {};

const App: React.FC<AppProp> = () => {
  return (
    <BrowserRouter>
      <MainLayout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="product" element={<ProductPage />} />
          <Route path="product/create" element={<ProductPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </MainLayout>
    </BrowserRouter>
  );
};

export default App;
