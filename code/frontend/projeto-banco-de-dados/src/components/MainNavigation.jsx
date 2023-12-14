import { NavLink, useLocation } from "react-router-dom";

import classes from "./MainNavigation.module.css";
import Button from "./UI/Button";
import Dropdown from "./UI/Dropdown";
import { useDispatch, useSelector } from "react-redux";
import { uiActions } from "../store/ui-slice";
import { loginActions } from "../store/login-slice";

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
  const isLoggedIn = useSelector((state) => state.login.isLoggedIn);
  const userRole = useSelector((state) => state.login.userInfo.cargo);
  const userID = useSelector((state) => state.login.userInfo.id);
  const dispatch = useDispatch();
  const location = useLocation();

  let isAdmin = "";
  let isChefe = "";
  if (isLoggedIn) {
    isAdmin = userRole === "Administrador";
    isChefe = userRole === "Chefe de Laboratório";
  }

  const openModalHandler = () => {
    dispatch(uiActions.toggle());
  };

  const logoutHandler = () => {
    dispatch(loginActions.logout());
  };

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
            {isLoggedIn && isAdmin && (
              <>
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
                    to="/gerenciarUsuarios"
                    className={({ isActive }) =>
                      isActive ? classes.active : undefined
                    }
                    end
                  >
                    Gerenciar Usuários
                  </NavLink>
                </li>
              </>
            )}
            {isLoggedIn && (isAdmin || isChefe) && (
              <>
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
              </>
            )}
            {isLoggedIn && (
              <>
                <li>
                  <NavLink
                    to={`/meuPerfil/${userID}`}
                    className={({ isActive }) =>
                      isActive ? classes.active : undefined
                    }
                    end
                  >
                    Perfil
                  </NavLink>
                </li>
                <li>
                  <Button onClick={logoutHandler}>Sair</Button>
                </li>
              </>
            )}
            {!isLoggedIn && (
              <li>
                <Button onClick={openModalHandler}>Entrar</Button>
              </li>
            )}
            {/* <li>
              <Dropdown title="Cadastrar" items={itensCadastro}></Dropdown>
            </li> */}
          </ul>
        </nav>
      </div>
      <div className={classes.styleBox} />
    </header>
  );
}

export default MainNavigation;
