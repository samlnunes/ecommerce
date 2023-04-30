import { Container, Spin } from "./styles";

interface LoaderProps {
  isActive: boolean;
}

const Loader: React.FC<LoaderProps> = ({ isActive }) => {
  return isActive ? (
    <Container>
      <Spin />
    </Container>
  ) : null;
};

export default Loader;
