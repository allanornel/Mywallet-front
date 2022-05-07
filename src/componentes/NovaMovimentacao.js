import UserContext from "../context/UserContext";
import styled from "styled-components";
import { useState, useContext } from "react";
import axios from "axios";
import { ThreeDots } from "react-loader-spinner";
import { useLocation, useNavigate } from "react-router-dom";

export default function NovaMovimentacao() {
  const { user } = useContext(UserContext);
  const [logando, setLogando] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { isEntrada } = location.state;
  const [objMovimentacao, setObjMovimentacao] = useState({
    description: "",
    isEntrada,
  });

  async function postMovimentacao(e) {
    e.preventDefault();
    setLogando(true);
    const URL = "https://back-projeto13-mywallet-allan.herokuapp.com/moviment";
    const config = {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    };
    try {
      const promise = await axios.post(
        URL,
        { ...objMovimentacao, value: parseFloat(objMovimentacao.value) },
        config
      );
      console.log(promise.data);
      navigate("/registros");
    } catch (error) {
      console.log(error.data);
    }
    setLogando(false);
  }

  return (
    <Container>
      <h1>Nova {isEntrada ? "entrada" : "saída"}</h1>
      <Form onSubmit={(e) => postMovimentacao(e)}>
        <input
          type="number"
          value={objMovimentacao.value}
          placeholder="Valor"
          required
          disabled={logando}
          onChange={(e) =>
            setObjMovimentacao({ ...objMovimentacao, value: e.target.value })
          }
        />
        <input
          type="text"
          value={objMovimentacao.description}
          placeholder="Descrição"
          required
          disabled={logando}
          onChange={(e) =>
            setObjMovimentacao({
              ...objMovimentacao,
              description: e.target.value,
            })
          }
        />
        <button disabled={logando}>
          {!logando ? (
            isEntrada ? (
              "Salvar entrada"
            ) : (
              "Salvar saída"
            )
          ) : (
            <ThreeDots color="#FFFFFF" />
          )}
        </button>
      </Form>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  font-family: "Raleway";
  margin-top: 25px;

  h1 {
    text-align: left;
    font-family: "Raleway";
    font-style: normal;
    font-weight: 700;
    font-size: 26px;
    line-height: 31px;
    color: #ffffff;
    margin-bottom: 40px;
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
