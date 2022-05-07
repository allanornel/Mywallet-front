import { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import UserContext from "../context/UserContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Registros() {
  const { user, setUser } = useContext(UserContext);
  const [moviments, setMoviments] = useState([]);
  const [saldo, setSaldo] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const URL = "https://back-projeto13-mywallet-allan.herokuapp.com/moviment";
    const config = {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    };
    const promise = axios.get(URL, config);
    promise.then((response) => {
      setMoviments(response.data);
      let somatorio = 0;
      response.data.forEach((moviment) =>
        moviment.isEntrada
          ? (somatorio += moviment.value)
          : (somatorio -= moviment.value)
      );
      setSaldo(somatorio);
    });

    promise.catch((error) => console.log(error.data));
  }, [user.token]);

  return (
    <Container>
      <header>
        <h1>Olá, {user.name}</h1>
        <ion-icon
          name="log-out-outline"
          onClick={() => {
            setUser({});
            navigate("/");
          }}
        ></ion-icon>
      </header>
      <ContainerRegistros>
        {moviments.map((moviment) => {
          return (
            <>
              <div key={moviment._id}>
                <p>
                  <span className="date">{moviment.date} </span>
                  {moviment.description}
                </p>
                <Value className="value" isEntrada={moviment.isEntrada}>
                  {moviment.value.toFixed(2)}
                </Value>
              </div>
            </>
          );
        })}
        <div className="saldo">
          <p>
            SALDO
            <Span isPositive={saldo >= 0 ? true : false}>
              {saldo < 0 ? saldo.toFixed(2) * -1 : saldo.toFixed(2)}
            </Span>
          </p>
        </div>
      </ContainerRegistros>
      <footer>
        <div
          onClick={() =>
            navigate("/novaMovimentacao", { state: { isEntrada: true } })
          }
        >
          <ion-icon name="add-circle-outline"></ion-icon>
          <p>
            Nova <br /> entrada
          </p>
        </div>
        <div
          onClick={() =>
            navigate("/novaMovimentacao", { state: { isEntrada: false } })
          }
        >
          <ion-icon name="remove-circle-outline"></ion-icon>
          <p>
            Nova <br /> saída
          </p>
        </div>
      </footer>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  margin-top: 25px;
  font-family: "Raleway";

  header {
    display: flex;
    justify-content: space-around;
    font-family: "Raleway";
    font-style: normal;
    font-weight: 700;
    font-size: 26px;
    line-height: 31px;
    color: #ffffff;
    width: 510px;
    margin-bottom: 22px;
  }

  footer {
    display: flex;
    margin-top: 13px;
    justify-content: space-between;
    width: 330px;
  }

  footer div {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    padding-left: 10px;
    width: 155px;
    height: 114px;
    background: #a328d6;
    border-radius: 5px;
    font-family: "Raleway";
    font-style: normal;
    font-weight: 700;
    font-size: 17px;
    line-height: 20px;
    color: #ffffff;
  }
`;

const ContainerRegistros = styled.div`
  width: 326px;
  height: 446px;
  background: #ffffff;
  border-radius: 5px;
  position: relative;

  div {
    font-family: "Raleway";
    font-style: normal;
    font-weight: 400;
    font-size: 16px;
    line-height: 19px;
    color: #000000;
    width: 100%;
    margin-left: 12px;
    margin-bottom: 7px;
    display: flex;
    justify-content: space-between;
    margin-right: 30px;
  }

  div:first-child {
    margin-top: 23px;
  }

  .date {
    color: #c6c6c6;
    margin-right: 5px;
  }

  .saldo {
    display: flex;
    margin-bottom: 10px;
    justify-content: space-between;
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
  }

  .saldo p {
    font-family: "Raleway";
    font-style: normal;
    font-weight: 700;
    font-size: 17px;
    line-height: 20px;
    color: #000000;
  }

  .saldo p span {
    font-family: "Raleway";
    font-style: normal;
    font-weight: 400;
    font-size: 17px;
    line-height: 20px;
  }
`;

const Span = styled.span`
  color: ${(props) => (props.isPositive ? "#03AC00" : "#C70000")};
`;

const Value = styled.span`
  color: ${(props) => (props.isEntrada ? "#03AC00" : "#C70000")};
  margin-right: 30px;
`;
