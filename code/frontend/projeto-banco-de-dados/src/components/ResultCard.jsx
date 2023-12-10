import { useSelector } from "react-redux";
import classes from "./ResultCard.module.css";
import Button from "./UI/Button";
import Card from "./UI/Card";

function formatarData(data) {
  const dia = data.getDate().toString().padStart(2, "0");
  const mes = (data.getMonth() + 1).toString().padStart(2, "0");
  const ano = data.getFullYear();

  return `${dia}/${mes}/${ano}`;
}

const ResultCard = (props) => {
  const loginInfo = useSelector((state) => state.login);
  const materialDisponivel = props.status === "disponivel";
  const data = new Date(props.data_aquisicao);

  let isAdmin = false;
  if (loginInfo.isLoggedIn) {
    if (loginInfo.userInfo.cargo === "Admin") {
      isAdmin = true;
    }
  }

  let resultCategory = (
    <>
      <h3>{props.titulo}</h3>
      <div className={classes["book-info"]}>
        {`${props.autor}, ISBN: ${props.isbn}`}
      </div>
    </>
  );

  if (!props.isBookResult) {
    resultCategory = (
      <div className={classes["details-title"]}>
        {`Número de Série: ${props.ndeserie}`}
      </div>
    );
  }

  return (
    <div className={classes.result}>
      <div className={classes["result-info"]}>
        <img
          src={
            "https://m.media-amazon.com/images/I/71K0ACNXURL._AC_UF1000,1000_QL80_.jpg"
          }
          alt={"cover"}
        />
        <div className={classes.info}>
          {resultCategory}
          <div className={classes.details}>
            <div>
              <div className={classes["details-title"]}>Data de Aquisição:</div>
              <div>{formatarData(data)}</div>
            </div>
            <div>
              <div className={classes["details-title"]}>Estado:</div>
              <div>{props.estado}</div>
            </div>
            <div>
              <div className={classes["details-title"]}>Localização:</div>
              <div>{props.localizacao}</div>
            </div>
          </div>
          <div>
            <div className={classes["details-title"]}>Descrição:</div>
            <div>{props.descricao}</div>
          </div>
        </div>
      </div>
      <div className={classes.actions}>
        {isAdmin && (
          <Button
            disabled={!materialDisponivel}
            className={classes["delete-button"]}
          >
            Deletar
          </Button>
        )}
        <Button disabled={!materialDisponivel}>Reservar</Button>
      </div>
      {!materialDisponivel && (
        <p style={{ fontSize: 0.8 + "rem" }}>
          Este material não está disponível no momento.
        </p>
      )}
    </div>
  );
};

export default ResultCard;
