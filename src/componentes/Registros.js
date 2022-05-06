import { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import UserContext from "../context/UserContext";
import axios from "axios";
export default function Registros() {
  const { user } = useContext(UserContext);
  console.log(user);
  const [moviments, setMoviments] = useState([]);

  useEffect(() => {
    const URL = "http://localhost:5000/moviment";
    const config = {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    };
    console.log(config);

    const promise = axios.get(URL, config);
    promise.then((response) => {
      console.log(response);
      setMoviments(response.data);
    });
    promise.catch((error) => console.log(error.data));
  }, [user.token]);

  return (
    <Container>
      <header>
        <h1>Olá, {user.name}</h1>
        <ion-icon name="log-out-outline"></ion-icon>
      </header>
      <ContainerRegistros>
        {moviments.map((moviment) => {
          return (
            <>
              <p key={moviment._id}>
                <span className="date">{moviment.date} </span>{" "}
                {moviment.description}{" "}
                <Value className="value" isEntrada={moviment.isEntrada}>
                  {moviment.value}
                </Value>
              </p>
            </>
          );
        })}
      </ContainerRegistros>
      <footer>
        <div>
          <ion-icon name="add-circle-outline"></ion-icon>
          <p>
            Nova <br /> entrada
          </p>
        </div>
        <div>
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
    width: 560px;
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

  p {
    font-family: "Raleway";
    font-style: normal;
    font-weight: 400;
    font-size: 16px;
    line-height: 19px;
    color: #000000;
    width: 100%;
  }

  .date {
    color: #c6c6c6;
  }
`;

const Value = styled.span`
  color: ${(props) => (props.isEntrada ? "#03AC00" : "#C70000")};
`;
