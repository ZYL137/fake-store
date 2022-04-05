import { lazy, Suspense } from "react";
import { NavLink } from "react-router-dom";
import { Switch, Route, useRouteMatch } from "react-router-dom";
import Loader from "../components/UI/Loader";
import Profile from "../components/User/Profile";
import styles from "../sass/pages/Account.module.scss";

function Account() {
  const Orders = lazy(() => import("../pages/Orders"));
  const { url, path } = useRouteMatch();

  return (
    <div className={styles.account}>
      <div className={styles.account__menu}>
        <ul className={styles["account__menu-links"]}>
          <li>
            <NavLink
              exact
              to={`${url}`}
              className={styles["account__menu-link"]}
              activeStyle={{ borderColor: "#53afe4" }}
            >
              Profile
            </NavLink>
          </li>
          <li>
            <NavLink
              exact
              to={`${url}/orders`}
              className={styles["account__menu-link"]}
              activeStyle={{ borderColor: "#53afe4" }}
            >
              Orders
            </NavLink>
          </li>
        </ul>
      </div>
      <div className={styles.account__content}>
        <Switch>
          <Route path={`${path}`} exact>
            <Profile />
          </Route>

          <Route path={`${path}/orders`}>
            <Suspense fallback={<Loader />}>
              <Orders />
            </Suspense>
          </Route>
        </Switch>
      </div>
    </div>
  );
}

export default Account;
