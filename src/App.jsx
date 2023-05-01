import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Home";
import CategoryDetail from "./CategoryDetail";
import SinglePage from "./SinglePage";

const App = () => {
  return (
    <div className="font-be">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/categories/:id" element={<CategoryDetail />} />
          <Route path="/details/:id" element={<SinglePage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
