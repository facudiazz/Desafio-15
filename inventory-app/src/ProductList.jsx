import React from 'react';

const ProductList = ({ products, onAddProduct, onDeleteProduct, selectedProduct, onEditProduct }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    onAddProduct(e.target);
  };

  return (
    <div className="product-list">
      <h2>{selectedProduct ? 'Editar Producto' : 'Agregar Producto'}</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <input
            type="text"
            placeholder="Nombre"
            name="name"
            defaultValue={selectedProduct ? selectedProduct.name : ''}
          />
          <input
            type="text"
            placeholder="Descripción"
            name="description"
            defaultValue={selectedProduct ? selectedProduct.description : ''}
          />
          <input
            type="number"
            placeholder="Precio"
            name="price"
            step="0.01"
            defaultValue={selectedProduct ? selectedProduct.price : ''}
          />
          <button type="submit">{selectedProduct ? 'Guardar' : 'Agregar'}</button>
        </div>
      </form>
      <h2>Lista de Productos</h2>
      <ul>
        {products.map((product) => (
          <li key={product.id}>
            {product.name} - {product.description} - ${product.price}
            <button onClick={() => onDeleteProduct(product.id)}>Eliminar</button>
            <button onClick={() => onEditProduct(product)}>Editar</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductList;
