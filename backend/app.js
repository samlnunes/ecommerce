const express = require("express");
const bodyParser = require("body-parser");
const {
  createUser,
  loginUser,
  getUserById,
} = require("./controllers/userController");
const { addToCart, getCart } = require("./controllers/userCart");
const cors = require("cors");

const app = express();
const port = process.env.PORT || 8383;

app.use(cors());
app.use(bodyParser.json());

app.post("/users", async (req, res) => {
  const { email, password, name, address, phone } = req.body;
  try {
    const user = await createUser(email, password, name, address, phone);
    res.status(201).send(user);
  } catch (error) {
    console.error(error);
    res
      .status(error.status)
      .json({ status: error.status, error: error.message });
  }
});

app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const token = await loginUser(email, password);
    res.status(201).send(token);
  } catch (error) {
    console.error(error);
    res
      .status(error.status)
      .json({ status: error.status, error: error.message });
  }
});

app.get("/users/:userId", async (req, res) => {
  try {
    const user = await getUserById(req.params.userId);
    res.send(user);
  } catch (error) {
    console.error(error);
    res.status(error.status || 500).send(error.message);
  }
});

app.put("/cart/:userId", async (req, res) => {
  const { product, quantity } = req.body;
  try {
    const user = await addToCart(req.params.userId, product, quantity);
    res.send(user);
  } catch (error) {
    console.error(error);
    res.status(error.status || 500).send(error.message);
  }
});

app.get("/cart/:userId", async (req, res) => {
  try {
    const user = await getCart(req.params.userId);
    res.send(user);
  } catch (error) {
    console.error(error);
    res.status(error.status || 500).send(error.message);
  }
});

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});
