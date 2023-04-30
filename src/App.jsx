import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Home";
import Categories from "./Categories";
import CategoryDetail from "./CategoryDetail";
// https://www.themealdb.com/api/json/v1/1/search.php?s=poha
// https://www.themealdb.com/api/json/v1/1/lookup.php?i=52807
// https://www.themealdb.com/api/json/v1/1/filter.php?a=indian
const App = () => {
  return (
    <div className="font-be">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/categories/:id" element={<CategoryDetail />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
