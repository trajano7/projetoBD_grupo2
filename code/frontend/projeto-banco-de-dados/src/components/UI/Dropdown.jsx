import React, { useState } from "react";
import styles from "./Dropdown.module.css";

const Dropdown = (props) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleItemClick = (item) => {
    console.log(`Item clicado: ${item}`);
    // Você pode adicionar lógica adicional aqui conforme necessário
    // Por exemplo, fechar o dropdown após clicar em um item
    setIsOpen(false);
  };

  return (
    <div className={styles.dropdown}>
      <div className={styles.button}>{props.title}</div>
      <ul className={styles.menu}>
        {props.items.map((item, index) => (
          <li key={index}>
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Dropdown;

// import styles from "./Dropdown.module.css";

// const Dropdown = (props) => {
//   const classes = `${styles["dropdown"]} ${props.className}`;

//   return (
//     <div className={classes.dropdown}>
//       <button className={classes.dropbtn}>
//         {props.title}
//         <i class="fa fa-caret-down"></i>
//       </button>
//       <div className={props["dropdown-content"]}>
//         {props.content.map((item) => {
//           <div className={classes.item}>{item}</div>
//         })}
//       </div>
//     </div>
//   );
// };

// export default Dropdown;
