/*

class ProductManager {
  constructor() {
    this.products = [];
    this.nextProductId = 1; 
  }

  addProduct(title, description, price, thumbnail, code, stock) {
    
    if (!title || !description || !price || !thumbnail || !code || stock === undefined) {
      console.log("Todos los campos son obligatorios.");
      return;
    }

    if (this.products.some(product => product.code === code)) {
      console.log(" Debe ser único el codigo.");
      return;
    }

    
    const product = {
      id: this.nextProductId++,
      title,
      description,
      price,
      thumbnail,
      code,
      stock
    };
    this.products.push(product);
  }

  getProducts() {
    return this.products;
  }

  getProductById(id) {
    const product = this.products.find(product => product.id === id);
    if (product) {
      return product;
    } else {
      console.log("Producto no encontrado.");
    }
  }
}

// Ejemplo de uso
const manager = new ProductManager();
manager.addProduct("Producto 1", "Descripción 1", 10.5, "imagen1.jpg", "P001", 50);
manager.addProduct("Producto 2", "Descripción 2", 20.5, "imagen2.jpg", "P002", 30);

console.log(manager.getProducts());
console.log(manager.getProductById(1));
console.log(manager.getProductById(3)); // Esto mostrará "Producto no encontrado"




*/
const fs = require('fs');

class ProductManager {
  constructor(path) {
    this.path = path;
    this.products = [];
    this.nextProductId = 1;
    this.readProductsFromFile();
  }

  addProduct(productData) {
    // Asignar un ID autoincrementable
    productData.id = this.nextProductId++;
    
    // Agregar el producto al arreglo
    this.products.push(productData);

    // Guardar el producto en el archivo
    this.saveProductsToFile();

    return productData;
  }

  getProducts() {
    return this.products;
  }

  getProductById(id) {
    const product = this.products.find(product => product.id === id);
    return product;
  }

  updateProduct(id, updatedProductData) {
    const productIndex = this.products.findIndex(product => product.id === id);
    if (productIndex !== -1) {
      // Conservar el ID
      updatedProductData.id = id;
      
      // Actualizar el producto en el arreglo
      this.products[productIndex] = updatedProductData;

      // Guardar los productos actualizados en el archivo
      this.saveProductsToFile();

      return updatedProductData;
    } else {
      return null; // Producto no encontrado
    }
  }

  deleteProduct(id) {
    const productIndex = this.products.findIndex(product => product.id === id);
    if (productIndex !== -1) {
      // Eliminar el producto del arreglo
      this.products.splice(productIndex, 1);

      // Guardar los productos actualizados en el archivo
      this.saveProductsToFile();
    }
  }

  readProductsFromFile() {
    try {
      const data = fs.readFileSync(this.path, 'utf-8');
      this.products = JSON.parse(data);
      if (Array.isArray(this.products)) {
        const lastProduct = this.products[this.products.length - 1];
        this.nextProductId = lastProduct ? lastProduct.id + 1 : 1;
      }
    } catch (error) {
      // Si el archivo no existe o hay un error, se inicializa con un arreglo vacío
      this.products = [];
    }
  }

  saveProductsToFile() {
    fs.writeFileSync(this.path, JSON.stringify(this.products, null, 2), 'utf-8');
  }
}

// Ejemplo de uso
const manager = new ProductManager("productos.json");

manager.addProduct({
  title: "Producto 1",
  description: "Descripción 1",
  price: 10.99,
  thumbnail: "imagen1.jpg",
  code: "P001",
  stock: 50
});

manager.addProduct({
  title: "Producto 2",
  description: "Descripción 2",
  price: 15.99,
  thumbnail: "imagen2.jpg",
  code: "P002",
  stock: 30
});

console.log(manager.getProducts());
console.log(manager.getProductById(1));

// Actualizar un producto
manager.updateProduct(1, {
  title: "Producto Actualizado",
  description: "Descripción Actualizada",
  price: 19.99,
  thumbnail: "imagen_actualizada.jpg",
  code: "P001",
  stock: 60
});

// Eliminar un producto
manager.deleteProduct(2);
