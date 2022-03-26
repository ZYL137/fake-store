import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import CartItem from "../components/Cart/CartItem";
import Subtotal from "../components/Cart/Subtotal";
import styles from "../sass/pages/Checkout.module.scss";

function Checkout() {
  const cartState = useSelector((state) => state.cart);

  return (
    <div className={styles.checkout}>
      {cartState.items.length === 0 && (
        <div className={styles["checkout__empty-cart"]}>
          <h2 className={styles.checkout__title}>Your Cart is empty</h2>
          <Link to="/" className={styles.checkout__link}>
            Continue Shopping
          </Link>
        </div>
      )}
      {cartState.items?.length > 0 && (
        <>
          <div className={styles.checkout__left}>
            <h2 className={styles.checkout__title}>Shopping Cart</h2>
            <div className={styles.checkout__details}>
              <p className={styles.checkout__heading}>
                {cartState.totalQuantity} ITEMS
              </p>

              {cartState.items.map((item) => (
                <CartItem key={item.id} item={item} />
              ))}
            </div>
          </div>
          <div className={styles.checkout__right}>
            <Subtotal />
          </div>
        </>
      )}
    </div>
  );
}

export default Checkout;
