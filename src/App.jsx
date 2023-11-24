import React, { useState } from "react";
import ProductList from "./components/productList";
import ProductForm from "./components/productForm";
import "./App.css";

const App = () => {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);

  return (
    <div>
      <h1>Control de Inventario</h1>
      <ProductForm
        products={products}
        setProducts={setProducts}
        selectedProduct={selectedProduct}
        setSelectedProduct={setSelectedProduct}
      />

      <ProductList
        products={products}
        setProducts={setProducts}
        setSelectedProduct={setSelectedProduct}
      />
    </div>
  );
};

export default App;
