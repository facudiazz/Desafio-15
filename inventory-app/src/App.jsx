import React, { useState, useEffect } from 'react';
import './App.css';
import ProductList from './ProductList';
import { fetchProducts } from './Api'; 

function App() {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    fetchProducts().then((data) => {
      setProducts(data);
    });
  }, []);

  useEffect(() => {
    const savedProducts = localStorage.getItem('products');
    if (savedProducts) {
 
      if (products.length === 0) {
        setProducts(JSON.parse(savedProducts));
      }
    }
  }, [products]);

  const addProduct = (formData) => {
    const name = formData.name.value;
    const description = formData.description.value;
    const price = parseFloat(formData.price.value);

    if (name && description && !isNaN(price)) {
      const newProduct = {
        id: Date.now(),
        name: name,
        description: description,
        price: price,
      };

      setProducts([...products, newProduct]);

      formData.reset();
    }
  };

  const handleEditProduct = (formData) => {
    const id = selectedProduct.id;
    const name = formData.name.value;
    const description = formData.description.value;
    const price = parseFloat(formData.price.value);

    if (name and description && !isNaN(price)) {
      const updatedProducts = products.map((product) => {
        if (product.id === id) {
          return { ...product, name, description, price };
        }
        return product;
      });

      setProducts(updatedProducts);
      setSelectedProduct(null);
    }
  };

  const deleteProduct = (productId) => {
    const updatedProducts = products.filter((product) => product.id !== productId);
    setProducts(updatedProducts);
  };

  return (
    <div className="App">
      <ProductList
        products={products}
        onAddProduct={selectedProduct ? handleEditProduct : addProduct}
        onDeleteProduct={deleteProduct}
        selectedProduct={selectedProduct}
        onEditProduct={setSelectedProduct}
      />
    </div>
  );
}

export default App;
