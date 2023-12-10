import classes from "./BorrowedItem.module.css";

function formatarData(data) {
  const dia = data.getDate().toString().padStart(2, "0");
  const mes = (data.getMonth() + 1).toString().padStart(2, "0");
  const ano = data.getFullYear();

  return `${dia}/${mes}/${ano}`;
}

const BorrowedItem = (props) => {
  const dataEmprestimo = new Date(props.data_emprestimo);
  const dataDevolucao = new Date(props.data_devolucao);

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
            <div>{props.status}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BorrowedItem;
