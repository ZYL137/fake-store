import { useEffect, lazy, Suspense } from "react";
import moment from "moment";
import {
  Link,
  useHistory,
  useRouteMatch,
  Route,
  Switch,
} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import CurrencyFormat from "react-currency-format";
import Loader from "../components/UI/Loader";
import styles from "../sass/pages/Orders.module.scss";
import { deleteUserOrder } from "../store/user-slice";

function Orders() {
  const OrderDetail = lazy(() => import("./OrderDetail"));
  const { user, orders } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const history = useHistory();
  const { url, path } = useRouteMatch();

  useEffect(() => {
    if (!user) {
      history.push("/login");
    }
  }, [user, history]);

  const deleteOrder = (orderId) => {
    dispatch(deleteUserOrder(user, orderId));
  };

  return (
    <Switch>
      <Route path={`${path}`} exact>
        <div className={styles.orders}>
          {orders.length === 0 && (
            <div className={styles.orders__empty}>
              <p>You don't have any orders.</p>
              <Link to="/" className={styles.orders__link}>
                Go shopping
              </Link>
            </div>
          )}
          {orders.length >= 1 && (
            <>
              <h1 className={styles.orders__heading}>Orders</h1>
              {orders?.map((order, i) => (
                <div key={i} className={styles.orders__content}>
                  <Link to={`${url}/${order.id}`}>
                    <img
                      className={styles.orders__img}
                      src={order.data.items[0].image}
                      alt={order.data.items[0].title}
                    />
                  </Link>
                  <div className={styles.orders__info}>
                    <div className={styles["orders__info-text"]}>
                      <p className={styles.orders__heading}>ORDER NUMBER:</p>
                      <p>{order.id}</p>
                    </div>
                    <div>
                      <p className={styles.orders__heading}>ORDER DATE: </p>
                      <p>
                        {moment
                          .unix(order.data.created)
                          .format("MMMM Do YYYY ")}
                      </p>
                    </div>
                    <CurrencyFormat
                      decimalScale={2}
                      value={order.data.amount / 100}
                      displayType={"text"}
                      thousandSeparator={true}
                      prefix={"$"}
                      renderText={(value) => (
                        <div className={styles["orders__text-box"]}>
                          <p className={styles.orders__heading}>TOTAL:</p>
                          <strong> {value}</strong>
                        </div>
                      )}
                    />
                  </div>

                  <button
                    className={styles.orders__btn}
                    onClick={() => deleteOrder(order.id)}
                  >
                    Delete
                  </button>
                </div>
              ))}
            </>
          )}
        </div>
      </Route>

      <Route path={`${path}/:orderId`} exact>
        <Suspense fallback={<Loader />}>
          <OrderDetail />
        </Suspense>
      </Route>
    </Switch>
  );
}

export default Orders;
