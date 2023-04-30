import React, { useEffect, useState } from "react";
import { Card } from "../../components";
import { Container } from "./styles";

const Home: React.FC = () => {
  const [products, setProducts] = useState([]);

  console.log("process.env.JWT_CORREIOS", process.env.REACT_APP_JWT_CORREIOS)

  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then((res) => res.json())
      .then((json) => setProducts(json));
  }, []);

  useEffect(() => {
    fetch(
      "https://apihom.correios.com.br/srorastro/v1/objetos/DG049186226BR?resultado=T",
      {
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${process.env.REACT_APP_JWT_CORREIOS}`,
        },
      }
    )
      .then((res) => res.json())
      .then((json) => setProducts(json));
  }, []);

  return (
    <Container>
      {products.map((item: any, key) => (
        <Card
          key={key}
          img={item.image}
          title={item.title}
          price={item.price}
          id={item.id}
        />
      ))}
    </Container>
  );
};

export default Home;
