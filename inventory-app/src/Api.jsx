// api.js
const products = [
    { id: 1, name: 'Producto 1', description: 'Descripción del Producto 1', price: 10.99 },
    { id: 2, name: 'Producto 2', description: 'Descripción del Producto 2', price: 19.99 },
    { id: 3, name: 'Producto 3', description: 'Descripción del Producto 3', price: 29.99 },
  ];
  
  export function fetchProducts() {
    // Simulamos una llamada a una API con un retardo de tiempo
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(products);
      }, 1000); // Simulamos un retardo de 1 segundo
    });
  }
  