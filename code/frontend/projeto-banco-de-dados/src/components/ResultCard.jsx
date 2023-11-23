import classes from "./ResultCard.module.css";
import Button from "./UI/Button";
import Card from "./UI/Card";

function formatarData(data) {

    const dia = data.getDate().toString().padStart(2, '0');
    const mes = (data.getMonth() + 1).toString().padStart(2, '0'); 
    const ano = data.getFullYear();
  
    return `${dia}/${mes}/${ano}`;
}

const ResultCard = (props) => {
  const materialDisponivel = props.status === "disponivel";

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
          <h3>{props.titulo}</h3>
          <div className={classes["book-info"]}>
            {`${props.autor}, ISBN: ${props.isbn}`}
          </div>
          <div className={classes.details}>
            <div>
              <div className={classes["details-title"]}>Data de Aquisição:</div>
              <div>{formatarData(props.data_aquisicao)}</div>
            </div>
            <div>
              <div className={classes["details-title"]}>Estado:</div>
              <div>{props.estado}</div>
            </div>
            <div>
              <div className={classes["details-title"]}>Locadivzação:</div>
              <div>{props.localizacao}</div>
            </div>
          </div>
          <div>
            <div className={classes["details-title"]}>Descrição:</div>
            <div>
              {props.descricao}
            </div>
          </div>
        </div>
      </div>
      <div className={classes.actions}>
        <Button disabled={!materialDisponivel} >Reservar</Button>
      </div>
      {!materialDisponivel && <p style={{fontSize: 0.8 + 'rem'}} >Este material não está disponível no momento.</p>}
    </div>
  );
};

export default ResultCard;
