import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useState, useContext } from "react";
import axios from "axios";
import UserContext from "./../context/UserContext";
import { ThreeDots } from "react-loader-spinner";

export default function PaginaInicial() {
  const { setUser } = useContext(UserContext);
  const [logando, setLogando] = useState(false);
  const [objLogin, setObjLogin] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  async function login(e) {
    e.preventDefault();
    setLogando(true);
    const URL = "http://localhost:5000/login";
    try {
      const promise = await axios.post(URL, objLogin);
      const { data } = promise;
      console.log(data);
      setUser({ token: data.token, name: data.name });
      navigate("/registros");
    } catch (error) {
      console.log(error.response);
      console.log(error.response.status);
      alert("Houve falha no Login!");
      setLogando(false);
    }
  }

  return (
    <>
      <Container>
        <h1>MyWallet</h1>
        <Form onSubmit={(e) => login(e)}>
          <input
            type="email"
            value={objLogin.email}
            placeholder="E-mail"
            required
            disabled={logando}
            onChange={(e) =>
              setObjLogin({ ...objLogin, email: e.target.value })
            }
          />
          <input
            type="password"
            value={objLogin.password}
            placeholder="Senha"
            required
            disabled={logando}
            onChange={(e) =>
              setObjLogin({ ...objLogin, password: e.target.value })
            }
          />
          <button disabled={logando}>
            {!logando ? "Entrar" : <ThreeDots color="#FFFFFF" />}
          </button>
        </Form>
        <Link to={"/sign-up"}>
          <p>Primeira vez? Cadastre-se!</p>
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
  margin-top: 159px;
  font-family: "Raleway";

  p {
    font-family: "Raleway";
    font-style: normal;
    font-weight: 700;
    font-size: 15px;
    line-height: 18px;
    text-decoration: none;
    color: #ffffff;
    text-align: center;
  }

  h1 {
    font-family: "Saira Stencil One";
    font-style: normal;
    font-weight: 400;
    font-size: 32px;
    line-height: 50px;
    color: #ffffff;
    margin-bottom: 24px;
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  margin-bottom: 25px;

  input {
    width: 303px;
    height: 45px;
    margin-bottom: 13px;
    background: #ffffff;
    border: 1px solid #d5d5d5;
    border-radius: 5px;
    font-size: 19.976px;
    line-height: 25px;
    color: #000000;
    padding-left: 10px;
    font-family: "Raleway";
    font-style: normal;
    font-weight: 400;
    font-size: 20px;
    line-height: 23px;
    color: #000000;
  }

  button {
    width: 303px;
    height: 45px;
    margin-bottom: 6px;
    display: flex;
    justify-content: center;
    align-items: center;
    background: #a328d6;
    border-radius: 5px;
    font-size: 20.976px;
    line-height: 26px;
    text-align: center;
    color: #ffffff;
  }
`;
