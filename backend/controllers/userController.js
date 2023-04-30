const { db } = require("../firebase");
const jwt = require("jsonwebtoken");
const { customAlphabet } = require("nanoid");

async function createUser(email, password, name, address, phone) {
  const generateUserId = customAlphabet("0123456789", 5);

  try {
    const usersRef = db.collection("users");
    const existingUser = await usersRef.where("email", "==", email).get();

    if (!existingUser.empty) {
      throw { status: 401, message: "Email já cadastrado" };
    }

    const userId = parseInt("1" + generateUserId());
    const userRef = db.collection("users").doc(userId.toString());
    await userRef.set({
      email,
      password,
      name: {
        firstname: name.firstname,
        lastname: name.lastname,
      },
      address: {
        city: address.city,
        uf: address.uf,
        street: address.street,
        number: address.number,
        complement: address.complement || null,
        zipcode: address.zipcode,
      },
      phone,
    });

    const cartRef = db.collection("carts").doc(userId.toString());
    await cartRef.set({
      userId: userId.toString(),
      products: [],
    });

    await userRef.update({
      cartId: cartRef.id,
    });
    
    return { userId, email, name, address, phone };
  } catch (error) {
    if (error.status === 401) {
      throw error;
    }
    throw { status: 500, message: "Erro ao criar usuário, tente novamente!" };
  }
}

async function loginUser(email, password) {
  try {
    const user = await db
      .collection("users")
      .where("email", "==", email)
      .limit(1)
      .get();

    if (user.empty) {
      throw { status: 401, message: "Email ou senha inválidos" };
    }

    const userData = user.docs[0].data();
    const userId = user.docs[0].id;

    if (password !== userData.password) {
      throw { status: 401, message: "Email ou senha inválidos" };
    }

    const token = jwt.sign(
      {
        id: userId,
        name: userData.name,
      },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    return { token };
  } catch (error) {
    console.log(error);
    if (error.status === 401) {
      throw error;
    }
    throw { status: 500, message: "Erro ao criar usuário, tente novamente!" };
  }
}

async function getUserById(userId) {
  try {
    const userRef = db.collection("users").doc(userId);
    const userDoc = await userRef.get();
    if (!userDoc.exists) {
      throw { status: 404, message: "Usuário não encontrado" };
    }
    const userData = userDoc.data();
    delete userData.password;

    return { id: userDoc.id, ...userData };
  } catch (error) {
    console.error(error);
    if (error.status) {
      throw error;
    }
    throw { status: 500, message: "Erro ao buscar usuário" };
  }
}

module.exports = { createUser, loginUser, getUserById };
