

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
