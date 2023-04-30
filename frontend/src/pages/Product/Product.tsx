import React, { useEffect, useState } from "react";

import { useParams } from "react-router-dom";
import Rating from "@mui/material/Rating";
import StarIcon from "@mui/icons-material/Star";
import { toast } from "react-toastify";

import { Container, BoxImage, Infos, BoxRating } from "./styles";
import { Loader } from "../../components";

const Product: React.FC = () => {
  const formatter = new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
    minimumFractionDigits: 2,
  });

  const [product, setProduct] = useState<any>({});
  const [rating, setRating] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const { id } = useParams();
  const userId = localStorage.getItem("userId");

  const onSubmit = () => {
    setIsLoading(true);
    const objToSend = {
      product: {
        ...product,
      },
      quantity: quantity,
    };

    fetch(`http://localhost:8383/cart/${userId}`, {
      method: "PUT",
      body: JSON.stringify(objToSend),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          throw res;
        }
      })
      .then((json) => {
        console.log("json");
      })
      .catch((error) => {
        error.json().then((json: any) => {
          toast.error(json.error, {
            position: toast.POSITION.TOP_RIGHT,
          });
        });
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  useEffect(() => {
    if (!id) return;

    fetch(`https://fakestoreapi.com/products/${id}`)
      .then((res) => res.json())
      .then((json) => {
        {
          setProduct(json);
          setRating(json?.rating?.rate);
        }
      });
  }, []);

  return (
    <Container>
      <Loader isActive={isLoading} />
      <BoxImage>
        <img src={product?.image} alt="" />
      </BoxImage>
      <Infos>
        <span>{product?.category}</span>
        <h1>{product?.title}</h1>
        <h2>{formatter.format(product?.price)}</h2>
        <p>{product?.description}</p>
        <BoxRating>
          <div>
            <Rating
              value={rating}
              precision={0.5}
              readOnly
              emptyIcon={<StarIcon fontSize="inherit" />}
            />
          </div>
          <p>{product?.rating?.count} Reviews</p>
        </BoxRating>
        <button onClick={() => onSubmit()}>Adicionar ao carrinho</button>
      </Infos>
    </Container>
  );
};

export default Product;
