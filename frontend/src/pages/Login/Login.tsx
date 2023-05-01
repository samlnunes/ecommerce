import { Link, useNavigate } from "react-router-dom";
import { Container, Top } from "./styles";
import { useForm, Controller } from "react-hook-form";
import { TextField } from "../../components";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { toast } from "react-toastify";
import { parseJwt } from "../../helpers";

const Login: React.FC = () => {
  const navigate = useNavigate();

  const schema = yup.object().shape({
    email: yup.string().required("Campo obrigatório"),
    password: yup.string().required("Campo obrigatório"),
  });

  const defaultValues = {
    email: "",
    password: "",
  };

  const { handleSubmit, control, formState, register, getValues, setValue } =
    useForm({
      defaultValues,
      resolver: yupResolver(schema),
    });

  function onSubmit(data: any) {
    const objToSend = {
      email: data.email,
      password: data.password,
    };

    fetch(process.env.REACT_APP_API_URL + "/login", {
      method: "POST",
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
        localStorage.setItem("userId", parseJwt(json.token).id);
        return navigate("/");
      })
      .catch((error) => {
        error.json().then((json: any) => {
          toast.error(json.error, {
            position: toast.POSITION.TOP_RIGHT,
          });
        });
      });
  }

  return (
    <Container>
      <Top>
        <img src="/logo.png" alt="Logo" />
        <h1>Sua conta para tudo da Clean Store</h1>
      </Top>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <Controller
            control={control}
            name="email"
            render={({ field }) => (
              <TextField
                {...field}
                type="email"
                placeholder="E-mail"
                error={
                  formState.errors.email ? formState.errors.email.message : ""
                }
              />
            )}
          />
          <Controller
            control={control}
            name="password"
            render={({ field }) => (
              <TextField
                {...field}
                placeholder="Senha"
                type="password"
                error={
                  formState.errors.password
                    ? formState.errors.password.message
                    : ""
                }
              />
            )}
          />
          <button type="submit">Entrar</button>
        </div>
      </form>
      <p>
        Não está registrado? <Link to="/cadastro">Junte-se a nós.</Link>
      </p>
    </Container>
  );
};

export default Login;
