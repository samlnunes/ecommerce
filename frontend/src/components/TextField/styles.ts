import styled, { css } from "styled-components";

interface InputStyleProps {
  error?: boolean;
  filled?: boolean;
}

const labelFloat = css`
  color: #802c6e;
  font-weight: 500;
  font-size: 12px;
  line-height: 15px;
  overflow: hidden;
  top: 10px;
  text-overflow: ellipsis;
  white-space: nowrap;
  width: calc(100% - 30px);
`;

export const Parent = styled.div<InputStyleProps>`
  position: relative;
  display: flex;
  flex-direction: column;

  input[type="email"] {
    text-transform: lowercase;
  }

  input {
    border: 1px solid ${({ error }) => (error ? "red" : "#000")};
    background-color: #fff;
    color: #000;
    transition: all 0.25s ease;
    padding: 12px 15px 0;
    border-radius: 2px;
    line-height: 22px;
    font-size: 16px;
    height: 40px;
    max-width: 100%;

    &:disabled {
      background-color: #fff;
      color: yellow;

      & + label {
        color: yellow;
        cursor: default;
      }
    }

    &:focus {
      border-color: ${({ error }) => (error ? "red" : "#802C6E")};
      outline: none;

      & + label {
        color: ${({ error }) => (error ? "red" : "#802C6E")} !important;
        ${labelFloat}
      }
    }
  }
`;

export const Input = styled.input<InputStyleProps>`
  max-width: 100%;
  height: 40px;
  font-size: 16px;
  line-height: 22px;
  border-radius: 2px;
  padding: 12px 15px 0;
  transition: all 0.25s ease;
  color: #000;
  background-color: #fff;
  border: 1px solid ${({ error }) => (error ? "red" : "#802C6E")};

  &:focus {
    border-color: ${({ error }) => (error ? "red" : "#802C6E")};
    outline: none;

    & + label {
      color: ${({ error }) => (error ? "red" : "#802C6E'")} !important;
      ${labelFloat}
    }
  }

  &:disabled {
    background-color: #fff;
    color: yellow;

    & + label {
      color: yellow;
      cursor: default;
    }
  }
`;

export const Placeholder = styled.label<InputStyleProps>`
  color: #000;
  cursor: text;
  font-size: 14px;
  font-weight: 400;
  line-height: 17px;
  left: 15px;
  position: absolute;
  top: 18px;
  transition: all 0.25s ease;

  &.label-height {
    top: 15px;
  }

  ${({ error }) =>
    error &&
    css`
      color: red !important;
      ${labelFloat}
    `}

  ${({ filled }) =>
    filled &&
    css`
      ${labelFloat}
    `}
`;

export const ErrorMessage = styled.span`
  color: red;
  font-size: 12px;
  font-weight: 500;
  line-height: 15px;
  margin-top: 5px;
`;
