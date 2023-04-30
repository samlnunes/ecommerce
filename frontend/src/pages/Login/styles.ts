import styled from "styled-components";

interface Props {
  register?: boolean
}

export const Container = styled.div<Props>`
  max-width: ${props => props.register ? '760px' : '380px'};
  margin: 50px auto;

  form {
    display: flex;
    gap: 10px;
    margin-top: 30px;
    max-width: 100%;

    > div {
      width: 100%;
      gap: 10px;
      display: flex;
      flex-direction: column;
    }

    button {
      background-color: #000;
      border: none;
      text-transform: uppercase;
      border-radius: 3px;
      color: #fff;
      cursor: pointer;
      height: 53.6px;
      font-family: "Montserrat";
      font-weight: 700;
    }

    .cep {
      position: relative;

      button {
        position: absolute;
        right: 15px;
        top: 0;
        background-color: transparent;
        padding: 0;

        svg {
          color: #000;
        }
      }
    }
  }

  p {
    font-size: 12px;
    line-height: 14px;
    text-align: center;
    margin-top: 30px;
  }
`;

export const Top = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  h1 {
    font-size: 26px;
    line-height: 26px;
    max-width: 25ch;
    font-weight: 700;
    text-transform: uppercase;
    text-align: center;
    margin-top: 40px;
  }

  img {
    width: 60px;
  }
`;
