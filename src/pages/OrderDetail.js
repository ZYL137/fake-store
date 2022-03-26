import { useParams } from "react-router-dom";
import moment from "moment";
import { useSelector } from "react-redux";
import styles from "../sass/pages/OrderDetail.module.scss";
import CartItem from "../components/Cart/CartItem";

function OrderDetail() {
  const { orderId } = useParams();
  const { user, orders } = useSelector((state) => state.user);
  const order = orders.find((order) => order.id === orderId);

  return (
    <div className={styles["order-detail"]}>
      {user && order && (
        <>
          <h2>Order Details</h2>
          <div className={styles["order-detail__info"]}>
            <p>Order Number: {order?.id}</p>
            <p>
              Order Date:{" "}
              {moment.unix(order.data.created).format("MMMM Do YYYY ")}
            </p>
          </div>

          <div className={styles["order-detail__items"]}>
            {order.data &&
              order.data.items.map((item) => (
                <CartItem key={item.id} item={item} hideBtn />
              ))}
          </div>
          <div className={styles["order-detail__amount"]}>
            <p>
              Subtotal: <span>${(order.data.amount / 100).toFixed(2)}</span>
            </p>
            <p>
              Shipping: <span>0</span>
            </p>
            <p>
              Total:{" "}
              <span className={styles["order-detail__total"]}>
                ${(order.data.amount / 100).toFixed(2)}
              </span>
            </p>
          </div>
        </>
      )}
    </div>
  );
}

export default OrderDetail;
