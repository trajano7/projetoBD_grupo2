import { useState } from "react";
import classes from "./Teste.module.css";
import Button from "./UI/Button";

const Teste = (props) => {
  const [count, setCount] = useState(0);

  return (
    <>
      <div className={classes.teste}>Ola mundo</div>
      <Button onClick={() => setCount((count) => count + 1)} className={classes.newButton} >Click Me</Button>
      <p>{count}</p>
    </>
  );
};

export default Teste;
