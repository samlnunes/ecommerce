import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  gap: 2vw;
  align-items: center;
  padding-top: 150px;
`;

export const BoxImage = styled.div`
  min-width: 500px;
  height: 500px;
  background-color: #f5f5f5;
  border-radius: 2px;
  display: flex;
  align-items: center;
  justify-content: center;

  img {
    width: 300px;
  }
`;

export const Infos = styled.div`
  h1 {
    font-size: 22px;
  }
  h2 {
    font-size: 20px;
  }
  p {
    font-size: 14px;
  }

  button {
    margin-top: 20px;
    border: none;
    border-radius: 200rem;
    background: rgb(0, 0, 0);
    color: rgb(255, 255, 255);
    padding: 15px;
    width: 100%;
    font-weight: 500;
    font-size: 15px;
    line-height: 1;
    font-family: "Montserrat";
    cursor: pointer;
  }
`;

export const BoxRating = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;

  .full {
    color: #fbc634;
  }

  .half {
    color: #fbc634;
  }

  .empty {
    color: #dddde0;
  }
`;
