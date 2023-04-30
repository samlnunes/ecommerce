import styled from "styled-components";

export const Row = styled.div`
  display: flex;
  gap: 10px;

  > div {
    width: 100%;
  }

  > div:last-child {
    width: 100px;
  }
`;
