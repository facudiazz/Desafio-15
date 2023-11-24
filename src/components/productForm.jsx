import React, { useState, useEffect } from "react";

const ProductForm = ({
  products,
  setProducts,
  selectedProduct,
  setSelectedProduct,
}) => {
  const [formProduct, setFormProduct] = useState({
    name: "",
    description: "",
    price: 0,
  });

  useEffect(() => {
    if (selectedProduct) {
      setFormProduct({
        name: selectedProduct.name,
        description: selectedProduct.description,
        price: selectedProduct.price,
      });
    } else {
      setFormProduct({ name: "", description: "", price: 0 });
    }
  }, [selectedProduct]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormProduct({
      ...formProduct,
      [name]: name === "price" ? (value === "" ? "" : Number(value)) : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formProduct.name || formProduct.price <= 0) {
      alert("Por favor, complete el nombre y el precio del producto.");
      return;
    }

    if (selectedProduct) {
      const updatedProducts = products.map((product) =>
        product.name === selectedProduct.name &&
        product.price === selectedProduct.price
          ? { ...formProduct, quantity: product.quantity }
          : product
      );
      setProducts(updatedProducts);
    } else {
      const existingProduct = products.find(
        (product) =>
          product.name === formProduct.name &&
          product.price === formProduct.price
      );

      if (existingProduct) {
        const updatedProducts = products.map((product) =>
          product.name === existingProduct.name &&
          product.price === existingProduct.price
            ? { ...product, quantity: product.quantity + 1 }
            : product
        );
        setProducts(updatedProducts);
      } else {
        setProducts([...products, { ...formProduct, quantity: 1 }]);
      }
    }

    setFormProduct({ name: "", description: "", price: 0 });
    setSelectedProduct(null);
    localStorage.setItem(
      "products",
      JSON.stringify([...products, formProduct])
    );
  };

  const handleCancel = () => {
    setFormProduct({ name: "", description: "", price: 0 });
    setSelectedProduct(null);
  };

  return (
    <div>
      <h2>{selectedProduct ? "Editar Producto" : "Agregar Producto"}</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Nombre:
          <input
            type="text"
            name="name"
            value={formProduct.name}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          Descripción:
          <input
            type="text"
            name="description"
            value={formProduct.description}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          Precio:
          <input
            type="number"
            name="price"
            value={formProduct.price}
            onChange={handleChange}
          />
        </label>
        <br />
        <button type="submit">
          {selectedProduct ? "Guardar cambios" : "Agregar Producto"}
        </button>
        {selectedProduct && (
          <button type="button" onClick={handleCancel}>
            Cancelar
          </button>
        )}
      </form>
    </div>
  );
};

export default ProductForm;
