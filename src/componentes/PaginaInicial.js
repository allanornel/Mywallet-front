import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useState, useContext } from "react";
import axios from "axios";
import UserContext from "./../context/UserContext";
import { ThreeDots } from "react-loader-spinner";

export default function PaginaInicial() {
  const { setUser } = useContext(UserContext);
  const [logando, setLogando] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const [objLogin, setObjLogin] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  async function login(e) {
    e.preventDefault();
    setLogando(true);
    setDisabled(true);
    const URL =
      "https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/auth/login";
    try {
      const promise = await axios.post(URL, objLogin);
      const { data } = promise;
      setUser({ token: data.token, image: data.image });
      navigate("/hoje");
    } catch (error) {
      console.log(error.response);
      console.log(error.response.status);
      alert("Houve falha no Login!");
      setDisabled(false);
      setLogando(false);
    }
  }

  return (
    <>
      <Container>
        <H1>MyWallet</H1>
        <Form onSubmit={(e) => login(e)}>
          <input
            type="email"
            value={objLogin.email}
            placeholder="email"
            required
            disabled={disabled}
            onChange={(e) =>
              setObjLogin({ ...objLogin, email: e.target.value })
            }
          />
          <input
            type="password"
            value={objLogin.password}
            placeholder="senha"
            required
            disabled={disabled}
            onChange={(e) =>
              setObjLogin({ ...objLogin, password: e.target.value })
            }
          />
          <button disabled={disabled}>
            {!logando ? "Entrar" : <ThreeDots color="#FFFFFF" />}
          </button>
        </Form>
        <Link to={"/cadastro"}>
          <p>Não tem uma conta? Cadastre-se</p>
        </Link>
      </Container>
    </>
  );
}

const Container = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  margin-top: 68px;

  p {
    font-size: 13.976px;
    line-height: 17px;
    text-align: center;
    text-decoration-line: underline;
    color: #52b6ff;
  }
`;

const H1 = styled.h1`
  font-family: "Saira Stencil One";
  font-style: normal;
  font-weight: 400;
  font-size: 32px;
  line-height: 50px;
  color: #ffffff;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  margin-bottom: 25px;

  button {
    width: 303px;
    height: 45px;
    margin-bottom: 6px;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  input {
    width: 303px;
    height: 45px;
    margin-bottom: 6px;
    background: #ffffff;
    border: 1px solid #d5d5d5;
    border-radius: 5px;
    font-size: 19.976px;
    line-height: 25px;
    color: #dbdbdb;
    padding-left: 10px;
  }

  button {
    background: #52b6ff;
    border-radius: 4.63636px;
    font-size: 20.976px;
    line-height: 26px;
    text-align: center;
    color: #ffffff;
  }
`;
