import styled from "styled-components";

export const Container = styled.header`
  padding: 20px 0;
  position: fixed;
  width: calc(100% - 12vw);
  background-color: #fbfbff;
  z-index: 3;
  left: 6vw;
  display: flex;
  align-items: center;
  gap: 20vw;

  img {
    width: 50px;
  }
`;

export const Nav = styled.nav`
  width: 100%;

  ul {
    display: flex;
    justify-content: space-between;
    align-items: center;
    list-style-type: none;
    padding: 0;
  }

  a {
    text-decoration: none;
    color: #6e6e6e;
    font-size: 0.9em;
    font-weight: 500;
    transition: 0.5s;

    :hover {
      transition: 0.5s;
      font-weight: 600;
    }
  }
`;

export const BoxUser = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  width: 350px;

  a {
    text-decoration: none;
    color: #6e6e6e;
    font-size: 1em;
    font-weight: 500;
    transition: 0.5s;

    :hover {
      transition: 0.5s;
      font-weight: 600;
    }
  }

  p {
    font-size: 12px;
    font-weight: 600;
  }

  button {
    cursor: pointer;
    background-color: transparent;
    border: none;
    font-family: "Montserrat";
    position: relative;

    div {
      top: 12px;
      right: 14px;
      position: absolute;
      display: flex;
      align-items: center;
      justify-content: center;
      width: 20px;
      height: 20px;
      border-radius: 50%;

      p {
        color: #000;
      }
    }
  }
`;
