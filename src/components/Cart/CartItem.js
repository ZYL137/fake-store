import { useDispatch } from "react-redux";
import { cartActions } from "../../store/cart-slice";
import { Link } from "react-router-dom";
import styles from "../../sass/components/CartItem.module.scss";

function CartItem({ item, hideBtn }) {
  const dispatch = useDispatch();

  const increaseItemQuantityHandler = () => {
    dispatch(
      cartActions.addItemToCart({ ...item, price: item.price * 1, quantity: 1 })
    );
  };
  const decreaseItemQuantityHandler = () => {
    dispatch(cartActions.decreaseItemQuantity(item.id));
  };

  const deleteItemHandler = () => {
    dispatch(cartActions.deleteItemFromCart(item.id));
  };

  return (
    <div className={styles["cart-item"]}>
      <div className={styles["cart-item__img-box"]}>
        <Link to={`/products/${item.id}`} className={styles["cart-item__link"]}>
          <img src={item.image} alt={item.title} />
        </Link>
      </div>

      <Link to={`/products/${item.id}`} className={styles["cart-item__link"]}>
        <p className={styles["cart-item__title"]}>{item.title}</p>
      </Link>

      <strong className={styles["cart-item__price"]}>${item.price}</strong>

      <>
        {!hideBtn && (
          <>
            <div className={styles["cart-item__actions"]}>
              <button
                className={styles["cart-item__actions-btn"]}
                onClick={decreaseItemQuantityHandler}
              >
                -
              </button>
              <span className={styles["cart-item__quantity"]}>
                {item.quantity}
              </span>
              <button
                className={styles["cart-item__actions-btn"]}
                onClick={increaseItemQuantityHandler}
              >
                +
              </button>
            </div>
            <button
              className={styles["cart-item__actions-delete"]}
              onClick={deleteItemHandler}
            >
              Delete
            </button>
          </>
        )}
        {hideBtn && <p>x{item.quantity}</p>}
        <p className={styles["cart-item__amount"]}>
          Total price:
          <strong>${(item.price * item.quantity).toFixed(2)}</strong>
        </p>
      </>
    </div>
  );
}

export default CartItem;
