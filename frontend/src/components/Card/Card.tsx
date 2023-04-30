import React from "react";

import { Container, BoxImage } from "./styles";
import { Link } from "react-router-dom";

interface CardProps {
  img: string;
  title: string;
  price: number;
  id: number;
}

const Card: React.FC<CardProps> = ({ img, title, price, id }) => {
  const formatter = new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
    minimumFractionDigits: 2,
  });

  return (
    <Container>
      <Link to={`/produto/${id}`}>
        <BoxImage>
          <img src={img} alt="" />
        </BoxImage>
        <h1>{title}</h1>
        <p>{formatter.format(price)}</p>
      </Link>
    </Container>
  );
};

export default Card;
