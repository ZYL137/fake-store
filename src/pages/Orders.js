import { useEffect } from "react";
import moment from "moment";
import { Link, useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import styles from "../sass/pages/Orders.module.scss";
import CurrencyFormat from "react-currency-format";

function Orders() {
  const { user, orders } = useSelector((state) => state.user);
  const history = useHistory();

  useEffect(() => {
    if (!user) {
      history.push("/login");
    }
  }, [user, history]);

  return (
    <div className={styles.orders}>
      <h1>Orders</h1>
      {orders?.map((order, i) => (
        <div key={i} className={styles.orders__content}>
          <img
            className={styles.orders__img}
            src={order.data.items[0].image}
            alt={order.data.items[0].title}
          />

          <div className={styles.orders__info}>
            <div className={styles["orders__text-box"]}>
              <p className={styles.orders__heading}>ORDER NUMBER:</p>
              <p>{order.id}</p>
            </div>
            <div>
              <p className={styles.orders__heading}>ORDER DATE: </p>
              <p>{moment.unix(order.data.created).format("MMMM Do YYYY ")}</p>
            </div>
            <CurrencyFormat
              decimalScale={2}
              value={order.data.amount / 100}
              displayType={"text"}
              thousandSeparator={true}
              prefix={"$"}
              renderText={(value) => (
                <div>
                  <p className={styles.orders__heading}>TOTAL:</p>
                  <strong> {value}</strong>
                </div>
              )}
            />
            <Link to={`orders/${order.id}`} className={styles.orders__link}>
              View order details
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Orders;
