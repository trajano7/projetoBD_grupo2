import { useDispatch, useSelector } from "react-redux";
import classes from "./ResultCard.module.css";
import Button from "./UI/Button";
import Card from "./UI/Card";
import { deleteItem, reserveItem } from "../store/searchResult-actions";

function formatarData(data) {
  const dia = data.getDate().toString().padStart(2, "0");
  const mes = (data.getMonth() + 1).toString().padStart(2, "0");
  const ano = data.getFullYear();

  return `${dia}/${mes}/${ano}`;
}

const ResultCard = (props) => {
  const dispatch = useDispatch();
  const loginInfo = useSelector((state) => state.login);
  const materialDisponivel = props.status === "disponivel";
  const data = new Date(props.data_aquisicao);

  let canDelete = false;
  if (loginInfo.isLoggedIn) {
    if (
      loginInfo.userInfo.cargo === "Administrador" ||
      loginInfo.userInfo.cargo === "Chefe de Laboratório"
    ) {
      canDelete = true;
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

  const deleteItemHandler = () => {
    const proceed = window.confirm(
      `Você tem certeza que deseja deletar esse item?`
    );

    if (proceed) {
      if (props.categoria === "Livro") {
        dispatch(deleteItem(props.isbn));
      } else {
        dispatch(deleteItem(props.ndeserie));
      }
    }
  };

  let dataHoje = new Date();
  let dataHojeStr = dataHoje.toISOString().split('T')[0];

  let dataFutura = new Date();
  dataFutura.setDate(dataFutura.getDate() + 5);
  let dataFuturaStr = dataFutura.toISOString().split('T')[0];

  const reserveItemHandler = () => {
    if (props.categoria === "Livro") {
      dispatch(reserveItem({
        IDUsuario: loginInfo.id,
        TipoEmprestimo: 'Livro',
        ISBNLivro: props.isbn,
        DataEmprestimo: dataHojeStr,
        DataDevolucaoPrevista: dataFuturaStr,
        Status: "Emprestado"
      }));
    } else {
      dispatch(reserveItem({
        IDUsuario: loginInfo.id,
        TipoEmprestimo: 'MaterialDidatico',
        IDMaterialDidatico: props.ID,
        DataEmprestimo: dataHojeStr,
        DataDevolucaoPrevista: dataFuturaStr,
        Status: "Emprestado"
      }));
    }
  };

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
        {canDelete && (
          <Button
            onClick={deleteItemHandler}
            className={classes["delete-button"]}
          >
            Deletar
          </Button>
        )}
        <Button onClick={reserveItemHandler}>
          Reservar
        </Button>
      </div>
      {/* {!materialDisponivel && (
        <p style={{ fontSize: 0.8 + "rem" }}>
          Este material não está disponível no momento.
        </p>
      )} */}
    </div>
  );
};

export default ResultCard;
