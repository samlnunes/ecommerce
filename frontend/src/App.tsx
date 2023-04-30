import { Header } from "./components";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Container } from "./styles";
import { Home, Category, Product, Login, Register } from "./pages";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <BrowserRouter>
     <ToastContainer />
      <Container>
        <Routes>
          <Route path="/" element={<Header />}>
            <Route index element={<Home />} />
            <Route
              path="eletronicos"
              element={<Category category="eletronicos" />}
            />
            <Route path="joias" element={<Category category="joias" />} />
            <Route
              path="masculino"
              element={<Category category="masculino" />}
            />
            <Route path="feminino" element={<Category category="feminino" />} />
            <Route path="produto/:id" element={<Product />} />
          </Route>
          <Route path="login" element={<Login />} />
          <Route path="cadastro" element={<Register />} />
        </Routes>
      </Container>
    </BrowserRouter>
  );
}

export default App;
