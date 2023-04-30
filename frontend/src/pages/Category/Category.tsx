import React, { useEffect, useState } from "react";

import { Container } from "../Home/styles";
import { Card } from "../../components";

interface CategoryProps {
  category: string;
}

const Category: React.FC<CategoryProps> = ({ category }) => {
  const [products, setProducts] = useState([]);
  const [newCategory, setNewCategory] = useState("");

  const verifyCategory = () => {
    switch (category) {
      case "eletronicos":
        return setNewCategory("electronics");
      case "joias":
        return setNewCategory("jewelery");
      case "masculino":
        return setNewCategory("men's clothing");
      case "feminino":
        return setNewCategory("women's clothing");
      default:
        return "";
    }
  };

  useEffect(() => {
    setNewCategory("");
    verifyCategory();
  }, [category]);

  useEffect(() => {
    if (!newCategory) return;

    fetch(`https://fakestoreapi.com/products/category/${newCategory}`)
      .then((res) => res.json())
      .then((json) => setProducts(json));
  }, [newCategory]);

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

export default Category;
