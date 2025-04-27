const products = [
  {
    id: "prod_001",
    name: "Smartphone X",
    price: 15000,
    description: "Latest smartphone with AI features",
    category: "Electronics",
    isActive: true,
  },
  {
    id: "prod_002",
    name: "Laptop Y",
    price: 55000,
    description: "High performance laptop",
    category: "Electronics",
    isActive: true,
  },
  {
    id: "prod_003",
    name: "Tablet Z",
    price: 22000,
    description: "Lightweight tablet for daily use",
    category: "Electronics",
    isActive: true,
  },
  {
    id: "prod_004",
    name: "Smartwatch A",
    price: 8000,
    description: "Fitness tracking smartwatch",
    category: "Wearables",
    isActive: true,
  },
  {
    id: "prod_005",
    name: "Camera B",
    price: 30000,
    description: "Professional DSLR camera",
    category: "Photography",
    isActive: true,
  },
  {
    id: "prod_006",
    name: "Headphones C",
    price: 5000,
    description: "Noise-cancelling wireless headphones",
    category: "Accessories",
    isActive: false,
  },
  {
    id: "prod_007",
    name: "Gaming Console D",
    price: 40000,
    description: "Next-gen gaming console",
    category: "Gaming",
    isActive: true,
  },
  {
    id: "prod_008",
    name: "Drone E",
    price: 60000,
    description: "High-definition camera drone",
    category: "Photography",
    isActive: true,
  },
  {
    id: "prod_009",
    name: "Fitness Band F",
    price: 3500,
    description: "Smart fitness tracking band",
    category: "Wearables",
    isActive: false,
  },
  {
    id: "prod_010",
    name: "Bluetooth Speaker G",
    price: 2500,
    description: "Portable Bluetooth speaker with deep bass",
    category: "Accessories",
    isActive: true,
  }
];

  function simulateDelay() {
    const delay = Math.random() * (2500 - 200) + 200;
    return new Promise((resolve) => setTimeout(resolve, delay));
  }
  
  function simulateError() {
    const random = Math.random();
    if (random < 0.15) {
      throw new Error("500 Server Error");
    }
  }
  
  export async function fetchProducts(search = "") {
    await simulateDelay();
    simulateError();
    if (search) {
      return products.filter((p) =>
        p.name.toLowerCase().includes(search.toLowerCase())
      );
    }
    return products.filter((p) => p.isActive);
  }
  
  export async function addProduct(newProduct) {
    await simulateDelay();
    simulateError();
    products.push({ ...newProduct, id: `prod_${Date.now()}`, isActive: true });
    return true;
  }
  
  export async function updateProduct(id, updatedFields) {
    await simulateDelay();
    const randomConflict = Math.random();
    if (randomConflict < 0.2) {
      throw new Error("409 Conflict");
    }
    simulateError();
  
    const index = products.findIndex((p) => p.id === id);
    if (index !== -1) {
      products[index] = { ...products[index], ...updatedFields };
    } else {
      throw new Error("404 Not Found");
    }
  }
  
  export async function deleteProduct(id) {
    await simulateDelay();
    simulateError();
    const index = products.findIndex((p) => p.id === id);
    if (index !== -1) {
      products[index].isActive = false;
    } else {
      throw new Error("404 Not Found");
    }
  }
  