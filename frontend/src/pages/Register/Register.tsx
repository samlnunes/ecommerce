import { Link } from "react-router-dom";
import { Row } from "./styles";
import { Top, Container } from "../Login/styles";
import { TextField } from "../../components";
import { useForm, Controller } from "react-hook-form";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "react-toastify";
import * as yup from "yup";

const Register: React.FC = () => {
  const schema = yup.object().shape({
    name: yup.string().required("Campo obrigatório"),
    lastName: yup.string().required("Campo obrigatório"),
    email: yup.string().required("Campo obrigatório"),
    password: yup.string().required("Campo obrigatório"),
    confirmPassword: yup.string().required("Campo obrigatório"),
    cep: yup.string().required("Campo obrigatório"),
    city: yup.string().required("Campo obrigatório"),
    uf: yup.string().required("Campo obrigatório"),
    street: yup.string().required("Campo obrigatório"),
    number: yup.string().required("Campo obrigatório"),
    complement: yup.string(),
    phone: yup.string().required("Campo obrigatório"),
  });

  const defaultValues = {
    name: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    cep: "",
    city: "",
    uf: "",
    street: "",
    number: "",
    complement: "",
    phone: "",
  };

  const { handleSubmit, control, formState, getValues, setValue } = useForm({
    defaultValues,
    resolver: yupResolver(schema),
  });

  function onSubmit(data: any) {
    const objToSend = {
      email: data.email,
      password: data.password,
      name: {
        firstname: data.name,
        lastname: data.lastName,
      },
      address: {
        city: data.city,
        uf: data.uf,
        street: data.street,
        number: data.number,
        zipcode: data.cep.replace(/\W|_/g, ""),
        complement: data.complement,
      },
      phone: data.phone.replace(/\W|_/g, ""),
    };

    fetch(process.env.REACT_APP_API_URL + "/users", {
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
      .then((json) => console.log(json))
      .catch((error) => {
        error.json().then((json: any) => {
          toast.error(json.error, {
            position: toast.POSITION.TOP_RIGHT,
          })
        });
      });
  }

  const searchCEP = (cep: string) => {
    fetch(`https://viacep.com.br/ws/${cep}/json/`)
      .then((res) => res.json())
      .then((json) => {
        setValue("street", json.logradouro, { shouldValidate: true });
        setValue("city", json.localidade, { shouldValidate: true });
        setValue("uf", json.uf, { shouldValidate: true });
      });
  };

  return (
    <Container register>     
      <Top>
        <img src="/logo.png" alt="Logo" />
        <h1>Sua conta para tudo da Clean Store</h1>
      </Top>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <Controller
            control={control}
            name="name"
            render={({ field }) => (
              <TextField
                {...field}
                placeholder="Nome"
                error={
                  formState.errors.name ? formState.errors.name.message : ""
                }
              />
            )}
          />
          <Controller
            control={control}
            name="lastName"
            render={({ field }) => (
              <TextField
                {...field}
                placeholder="Sobrenome"
                error={
                  formState.errors.lastName
                    ? formState.errors.lastName.message
                    : ""
                }
              />
            )}
          />
          <Controller
            control={control}
            name="email"
            render={({ field }) => (
              <TextField
                {...field}
                placeholder="E-mail"
                type="email"
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
          <Controller
            control={control}
            name="confirmPassword"
            render={({ field }) => (
              <TextField
                {...field}
                placeholder="Confirmar senha"
                type="password"
                error={
                  formState.errors.confirmPassword
                    ? formState.errors.confirmPassword.message
                    : ""
                }
              />
            )}
          />
          <Controller
            control={control}
            name="phone"
            render={({ field }) => (
              <TextField
                {...field}
                placeholder="Telefone"
                type="phone"
                mask="(99) 99999-9999"
                error={
                  formState.errors.phone ? formState.errors.phone.message : ""
                }
              />
            )}
          />
        </div>
        <div>
          <div className="cep">
            <Controller
              control={control}
              name="cep"
              render={({ field }) => (
                <TextField
                  {...field}
                  placeholder="CEP"
                  mask="99999-999"
                  error={
                    formState.errors.cep ? formState.errors.cep.message : ""
                  }
                />
              )}
            />
            <button type="button" onClick={() => searchCEP(getValues("cep"))}>
              <SearchOutlinedIcon />
            </button>
          </div>
          <Controller
            control={control}
            name="street"
            render={({ field }) => (
              <TextField
                {...field}
                placeholder="Rua"
                readOnly
                error={
                  formState.errors.street ? formState.errors.street.message : ""
                }
              />
            )}
          />
          <Row>
            <Controller
              control={control}
              name="city"
              render={({ field }) => (
                <TextField
                  {...field}
                  placeholder="Cidade"
                  type="text"
                  readOnly
                  error={
                    formState.errors.city ? formState.errors.city.message : ""
                  }
                />
              )}
            />
            <Controller
              control={control}
              name="uf"
              render={({ field }) => (
                <TextField
                  {...field}
                  placeholder="Estado"
                  type="text"
                  readOnly
                  error={formState.errors.uf ? formState.errors.uf.message : ""}
                />
              )}
            />
          </Row>
          <Controller
            control={control}
            name="number"
            render={({ field }) => (
              <TextField
                {...field}
                placeholder="Número"
                type="text"
                error={
                  formState.errors.number ? formState.errors.number.message : ""
                }
              />
            )}
          />
          <Controller
            control={control}
            name="complement"
            render={({ field }) => (
              <TextField
                {...field}
                placeholder="Complemento"
                error={
                  formState.errors.complement
                    ? formState.errors.complement.message
                    : ""
                }
              />
            )}
          />

          <button>Cadastre-se</button>
        </div>
      </form>
      <p>
        Não está registrado? <Link to="/cadastro">Junte-se a nós.</Link>
      </p>
    </Container>
  );
};

export default Register;
