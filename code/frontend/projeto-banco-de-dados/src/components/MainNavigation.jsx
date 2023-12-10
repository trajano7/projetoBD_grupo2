import { NavLink, useLocation } from "react-router-dom";

import classes from "./MainNavigation.module.css";
import Button from "./UI/Button";
import Dropdown from "./UI/Dropdown";

const itensCadastro = [
  <NavLink
    to="/novoUsuario"
    className={({ isActive }) => (isActive ? classes.active : undefined)}
    end
  >
    Cadastrar Usuário
  </NavLink>,
  <NavLink
    to="/novoItem"
    className={({ isActive }) => (isActive ? classes.active : undefined)}
    end
  >
    Cadastrar Material
  </NavLink>,
];

function MainNavigation() {
  const location = useLocation();
  console.log(location.pathname);

  return (
    <header className={classes.header}>
      <div className={classes.nav}>
        <NavLink to="/" className={classes.title} end>
          <h1>Collection</h1>
        </NavLink>
        <nav>
          <ul className={classes.list}>
            <li>
              <NavLink
                to="/"
                className={({ isActive }) =>
                  isActive ? classes.active : undefined
                }
                end
              >
                Home
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/novoUsuario"
                className={({ isActive }) =>
                  isActive ? classes.active : undefined
                }
                end
              >
                Cadastrar Usuário
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/novoLivro"
                className={({ isActive }) =>
                  isActive ? classes.active : undefined
                }
                end
              >
                Cadastrar Livro
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/novoMaterial"
                className={({ isActive }) =>
                  isActive ? classes.active : undefined
                }
                end
              >
                Cadastrar Material
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/products"
                className={({ isActive }) =>
                  isActive ? classes.active : undefined
                }
                end
              >
                Meus Empréstimos
              </NavLink>
            </li>
            {/* <li>
              <Dropdown title="Cadastrar" items={itensCadastro}></Dropdown>
            </li> */}
            <li>
              <NavLink
                to="/meuPerfil"
                className={({ isActive }) =>
                  isActive ? classes.active : undefined
                }
                end
              >
                Perfil
              </NavLink>
            </li>
            <li>
              <Button>Sair</Button>
            </li>
          </ul>
        </nav>
      </div>
      <div className={classes.styleBox} />
    </header>
  );
}

export default MainNavigation;
