import styled from "styled-components";

export const Container = styled.div`
  width: 200px;
  cursor: pointer;
  transition: opacity 0.25s, transform 0.5s;
  
  a {
    text-decoration: none;
  }

  h1 {
    color: rgb(17, 17, 17);
    font-weight: 500;
    font-size: 12px;
    line-height: 1.5;
    margin: 5px 0;
  }

  p {
    margin: 0;
    color: rgb(17, 17, 17);
    font-weight: 400;
    font-size: 12px;
    line-height: 1.5;
  }

  :hover {
    opacity: 0.8;
    transform: translateY(-2px);
  }
`;

export const BoxImage = styled.div`
  height: 200px;
  background-color: #f5f5f5;
  border-radius: 2px;
  display: flex;
  align-items: center;
  justify-content: center;

  img {
    width: 100px;
  }
`;
