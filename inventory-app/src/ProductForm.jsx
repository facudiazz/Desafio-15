// ProductForm.js
import React, { useState } from 'react';

const ProductForm = ({ products, setProducts }) => {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [formProduct, setFormProduct] = useState({ name: '', description: '', price: '' });

  const handleSubmit = () => {
    if (formProduct.name.trim() === '' || formProduct.price.trim() === '') {
      alert('El nombre y el precio son obligatorios.');
      return;
    }

    if (selectedProduct) {
      const updatedProducts = products.map((product) =>
        product.id === selectedProduct.id ? { ...product, ...formProduct } : product
      );
      setProducts(updatedProducts);
    } else {
      const newProduct = { id: Date.now(), ...formProduct };
      setProducts([...products, newProduct]);
    }

    setSelectedProduct(null);
    setFormProduct({ name: '', description: '', price: '' });
  };

  const handleDelete = (product) => {
    const updatedProducts = products.filter((p) => p.id !== product.id);
    setProducts(updatedProducts);
  };

  return (
    <div>
      <h2>Formulario de Producto</h2>
      <form>
        <div>
          <label>Nombre:</label>
          <input
            type="text"
            value={formProduct.name}
            onChange={(e) => setFormProduct({ ...formProduct, name: e.target.value })}
          />
        </div>
        <div>
          <label>Descripción:</label>
          <input
            type="text"
            value={formProduct.description}
            onChange={(e) => setFormProduct({ ...formProduct, description: e.target.value })}
          />
        </div>
        <div>
          <label>Precio:</label>
          <input
            type="text"
            value={formProduct.price}
            onChange={(e) => setFormProduct({ ...formProduct, price: e.target.value })}
          />
        </div>
        <div>
          <button type="button" onClick={handleSubmit}>
            {selectedProduct ? 'Actualizar Producto' : 'Agregar Producto'}
          </button>
        </div>
      </form>

      {selectedProduct && (
        <button type="button" onClick={() => setSelectedProduct(null)}>
          Cancelar Edición
        </button>
      )}

      <h2>Lista de Productos</h2>
      <ul>
        {products.map((product) => (
          <li key={product.id}>
            {product.name} - {product.description} - ${product.price}
            <button type="button" onClick={() => setSelectedProduct(product)}>
              Editar
            </button>
            <button type="button" onClick={() => handleDelete(product)}>
              Eliminar
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductForm;
