import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import CartItem from "../components/Cart/CartItem";
import Subtotal from "../components/Cart/Subtotal";
import styles from "../sass/pages/Cart.module.scss";

function Cart() {
  const cartState = useSelector((state) => state.cart);

  return (
    <div className={styles.cart}>
      {cartState.items.length === 0 && (
        <div className={styles["cart__empty-cart"]}>
          <h2 className={styles.cart__title}>Your Cart is empty</h2>
          <Link to="/" className={styles.cart__link}>
            Continue Shopping
          </Link>
        </div>
      )}
      {cartState.items?.length > 0 && (
        <>
          <div className={styles.cart__left}>
            <h2 className={styles.cart__title}>Shopping Cart</h2>
            <div className={styles.cart__details}>
              <p className={styles.cart__heading}>
                {cartState.totalQuantity} ITEMS
              </p>

              {cartState.items.map((item) => (
                <CartItem key={item.id} item={item} />
              ))}
            </div>
          </div>
          <div className={styles.cart__right}>
            <Subtotal />
          </div>
        </>
      )}
    </div>
  );
}

export default Cart;
