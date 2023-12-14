import classes from "./BorrowedItem.module.css";

function formatarData(data) {
  const dia = data.getDate().toString().padStart(2, "0");
  const mes = (data.getMonth() + 1).toString().padStart(2, "0");
  const ano = data.getFullYear();

  return `${dia}/${mes}/${ano}`;
}

const BorrowedItem = (props) => {
  const dataEmprestimo = new Date(props.DataEmprestimo);
  const dataDevolucao = new Date(props.DataDevolucaoPrevista);

  let resultCategory = (
    <>
      <h3>{props.Livro.Titulo}</h3>
      <div className={classes["book-info"]}>
        {`${props.Livro.Autor}, ISBN: ${props.Livro.ISBN}`}
      </div>
    </>
  );

  if (!props.isBookResult) {
    resultCategory = (
      <div className={classes["details-title"]}>
        {`Número de Série: ${props.MaterialDidatico.NumeroSerie}`}
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
              <div className={classes["details-title"]}>
                Data de Emprestimo:
              </div>
              <div>{formatarData(dataEmprestimo)}</div>
            </div>
            <div>
              <div className={classes["details-title"]}>Data de Devolução:</div>
              <div>{formatarData(dataDevolucao)}</div>
            </div>
          </div>
          <div>
            <div className={classes["details-title"]}>Status</div>
            <div>{props.Status}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BorrowedItem;
