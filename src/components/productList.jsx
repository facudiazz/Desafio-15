import React, { useEffect } from "react";
import "../productList.css";

const ProductList = ({ products, setProducts, setSelectedProduct }) => {
  useEffect(() => {
    const savedProducts = JSON.parse(localStorage.getItem("products")) || [];
    setProducts(savedProducts);
  }, []);

  const deleteProduct = (productName) => {
    const updatedProducts = products.filter(
      (product) => product.name !== productName
    );
    setProducts(updatedProducts);
    localStorage.setItem("products", JSON.stringify(updatedProducts));
  };

  const editProduct = (product) => {
    setSelectedProduct(product);
  };

  return (
    <div>
      <h2 className="product-list-title">Lista de productos</h2>
      <div className="product-list">
        {products.map((product) => (
          <div className="card" key={product.name}>
            <div className="card-content">
              <h3 className="product-name">{`${product.name} (${
                product.quantity || 1
              })`}</h3>
              <p className="product-description">{product.description}</p>
              <p className="product-price">Precio: ${product.price}</p>
              <div className="buttons">
                <button
                  className="edit-button"
                  onClick={() => editProduct(product)}
                >
                  Modificar
                </button>
                <button
                  className="delete-button"
                  onClick={() => deleteProduct(product.name)}
                >
                  Eliminar
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductList;
