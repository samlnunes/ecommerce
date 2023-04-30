const { db } = require("../firebase");

async function addToCart(userId, product, quantity) {
  try {
    const cartRef = db.collection("carts").doc(userId);
    const cart = await cartRef.get();

    if (!cart.exists) {
      throw { status: 404, message: "Cart not found" };
    }

    const updatedCart = {
      products: cart.data().products || [],
    };

    const existingProductIndex = updatedCart.products.findIndex(
      (p) => p.id === product.id
    );

    if (existingProductIndex !== -1) {
      updatedCart.products[existingProductIndex].quantity += quantity;
    } else {
      updatedCart.products.push({ ...product, quantity });
    }

    await cartRef.set(updatedCart);

    return { message: "Product added to cart successfully" };
  } catch (error) {
    console.error(error);
    if (error.status) {
      throw error;
    }
    throw { status: 500, message: "Error adding product to cart" };
  }
}

async function getCart(userId) {
  try {
    const cartRef = db.collection("carts").doc(userId);
    const cart = await cartRef.get();

    if (!cart.exists) {
      throw { status: 404, message: "Cart not found" };
    }

    return { products: cart.data().products || [] };
  } catch (error) {
    console.error(error);
    if (error.status) {
      throw error;
    }
    throw { status: 500, message: "Error getting cart" };
  }
}

module.exports = { addToCart, getCart };
