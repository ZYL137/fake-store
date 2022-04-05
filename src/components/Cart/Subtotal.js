import CurrencyFormat from "react-currency-format";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import styles from "../../sass/components/cart/Subtotal.module.scss";

function Subtotal() {
  const cartState = useSelector((state) => state.cart);
  const histroy = useHistory();

  const checkoutHandler = (e) => {
    const isDisabled = e.target.getAttribute("aria-disabled") === "true";
    if (isDisabled) return;

    histroy.push("/payment");
  };

  return (
    <div className={styles.subtotal}>
      <h4 className={styles.subtotal__heading}>ORDER SUMMARY</h4>

      <div className={styles.subtotal__details}>
        <CurrencyFormat
          decimalScale={2}
          value={cartState?.totalAmount}
          displayType={"text"}
          thousandSeparator={true}
          prefix={"$"}
          renderText={(value) => (
            <p className={styles["subtotal__details-row"]}>
              <span>Subtotal ({cartState.totalQuantity} items)</span>
              <strong>{value}</strong>
            </p>
          )}
        />
        <p className={styles["subtotal__details-row"]}>
          <span>Shipping</span>
          <strong>$0</strong>
        </p>
      </div>

      <button
        className={styles.subtotal__btn}
        aria-disabled={cartState.totalQuantity < 1 ? true : false}
        onClick={checkoutHandler}
      >
        Proceed to checkout
      </button>
    </div>
  );
}

export default Subtotal;
