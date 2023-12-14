import { useDispatch, useSelector } from "react-redux";
import classes from "./ResultCard.module.css";
import Button from "./UI/Button";
import Card from "./UI/Card";
import { deleteItem, reserveItem } from "../store/searchResult-actions";
import { useFetcher } from "react-router-dom";
import { useEffect } from "react";
import { loginActions } from "../store/login-slice";
import { searchResultActions } from "../store/searchResult-slice";

function formatarData(data) {
  const dia = data.getDate().toString().padStart(2, "0");
  const mes = (data.getMonth() + 1).toString().padStart(2, "0");
  const ano = data.getFullYear();

  return `${dia}/${mes}/${ano}`;
}

const ResultCard = (props) => {
  const fetcher = useFetcher();
  const dispatch = useDispatch();
  const loginInfo = useSelector((state) => state.login);
  const materialDisponivel = props.status === "disponivel";
  const date = new Date(props.data_aquisicao);
  const { data, state } = fetcher;
  console.log(state);

  useEffect(() => {
    if (state === "idle" && data && data.message) {
      window.alert(data.message);
    }
    if (state === "idle" && data && data.deletedItem && data.message) {
      dispatch(searchResultActions.deleteItem(data.deletedItem));
    }
  }, [data, state]);

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

    let deleteSubmit = {};

    if (proceed) {
      if (props.categoria === "Livro") {
        deleteSubmit = { deleteID: Number(props.isbn), type: "Livro" };
      } else {
        deleteSubmit = { deleteID: props.ID, type: "Material" };
      }
    }

    fetcher.submit(deleteSubmit, { method: "DELETE" });
  };

  const reserveItemHandler = () => {
    let dataHoje = new Date();
    let dataHojeStr = dataHoje.toISOString().split("T")[0];

    let dataFutura = new Date();
    dataFutura.setDate(dataFutura.getDate() + 5);
    let dataFuturaStr = dataFutura.toISOString().split("T")[0];

    console.log(props.categoria);

    let submitItem = {
      IDUsuario: loginInfo.userInfo.id,
      DataEmprestimo: dataHojeStr,
      DataDevolucaoPrevista: dataFuturaStr,
      Status: "Emprestado",
    };

    if (props.categoria === "Livro") {
      submitItem = {
        ...submitItem,
        TipoEmprestimo: "Livro",
        ISBNLivro: Number(props.isbn),
      };
    } else {
      submitItem = {
        ...submitItem,
        TipoEmprestimo: "MaterialDidatico",
        IDMaterialDidatico: props.ID,
      };
    }

    fetcher.submit(submitItem, { method: "POST" });
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
              <div>{formatarData(date)}</div>
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
        <Button onClick={reserveItemHandler}>Reservar</Button>
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

export async function action({ request, params }) {
  const data = await request.formData();
  const method = request.method;

  let url = "http://127.0.0.1:5000/emprestimos";
  let itemData = {};

  console.log('metodo:', method)

  if (method === "POST") {
    itemData = {
      IDUsuario: data.get("IDUsuario"),
      TipoEmprestimo: data.get("TipoEmprestimo"),
      DataEmprestimo: data.get("DataEmprestimo"),
      DataDevolucaoPrevista: data.get("DataDevolucaoPrevista"),
      Status: data.get("Status"),
    };

    if (itemData.TipoEmprestimo === "Livro") {
      itemData = {
        ...itemData,
        ISBNLivro: data.get("ISBNLivro"),
      };
    } else {
      itemData = {
        ...itemData,
        IDMaterialDidatico: data.get("IDMaterialDidatico"),
      };
    }
  } else {
    const type =  data.get("type");
    const id = data.get("deleteID")
    if (type === "Livro") {
      url = `http://127.0.0.1:5000/livros/${id}`
    }
    else {
      url = `http://127.0.0.1:5000/materiaisdidaticos/${id}`;
    }
  }

  const response = await fetch(url, {
    method: method,
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(itemData),
  });

  if (response.status === 400) {
    return response;
  }

  if (!response.ok) {
    throw json({ message: "Could not save event." }, { status: 500 });
  }

  return response;
}
