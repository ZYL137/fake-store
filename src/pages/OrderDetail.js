import moment from "moment";
import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import styles from "../sass/pages/OrderDetail.module.scss";

function OrderDetail() {
  const { orderId } = useParams();
  const { orders } = useSelector((state) => state.user);

  const order = orders.find((order) => order.id === orderId);

  return (
    <div className={styles["order-detail"]}>
      <h2>Order Details</h2>
      <div className={styles["order-detail__info"]}>
        <p>Order Number: {order?.id}</p>
        <p>
          Order Date: {moment.unix(order.data.created).format("MMMM Do YYYY ")}
        </p>
      </div>

      <div className={styles["order-detail__items"]}>
        {order.data &&
          order.data.items.map((item) => (
            <div className={styles["order-detail__item"]} key={item.id}>
              <Link to={`/products/${item.id}`}>
                <div className={styles["order-detail__item-img"]}>
                  <img src={item.image} alt={item.title} />
                </div>
              </Link>

              <div className={styles["order-detail__item-info"]}>
                <Link
                  to={`/products/${item.id}`}
                  className={styles["order-detail__item-link"]}
                >
                  <p>{item.title}</p>
                </Link>
                <p>
                  Price: <strong>${item.price}</strong>
                </p>
                <p>
                  Quantity: <strong>{item.quantity}</strong>
                </p>
              </div>
            </div>
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
    </div>
  );
}

export default OrderDetail;
