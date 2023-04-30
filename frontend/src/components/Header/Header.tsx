import { Container, Nav, BoxUser } from "./styles";
import { Outlet, Link } from "react-router-dom";
import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";
import { useEffect, useState } from "react";
import { getCartUser, getUser } from "../../helpers";

const Header: React.FC = () => {
  const [userData, setUserData] = useState<any>({});
  const [userCart, setUserCart] = useState<any>({});
  const userId = localStorage.getItem("userId");

  async function getUserData() {
    const dados = await getUser(Number(userId));
    setUserData(dados);
  }

  async function getUserCart() {
    const cart = await getCartUser(Number(userId));
    setUserCart(cart);
  }

  useEffect(() => {
    if (!userId) return;

    getUserData();
    getUserCart();
  }, []);

  return (
    <>
      <Container>
        <Link to="/">
          <img src="https://fakestoreapi.com/icons/logo.png" alt="Logo" />
        </Link>
        <Nav>
          <ul>
            <li>
              <Link to="eletronicos">Eletrônicos</Link>
            </li>
            <li>
              <Link to="joias">Jóias</Link>
            </li>
            <li>
              <Link to="masculino">Masculino</Link>
            </li>
            <li>
              <Link to="feminino">Feminino</Link>
            </li>
          </ul>
        </Nav>
        <BoxUser>
          {userData?.name ? (
            <p>Olá, {userData?.name?.firstname}</p>
          ) : (
            <Link to="/login">Entrar</Link>
          )}
          <button>
            <ShoppingBagOutlinedIcon fontSize="large" />
            <div>
              <p>{userCart?.products?.length}</p>
            </div>
          </button>
        </BoxUser>
      </Container>
      <Outlet />
    </>
  );
};

export default Header;
