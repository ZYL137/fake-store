import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useEffect, useRef, useState } from "react";
import CurrencyFormat from "react-currency-format";
import CartItem from "../components/Cart/CartItem";
import { firebaseAxios } from "../axios";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { cartActions } from "../store/cart-slice";
import { sendUserOrdersData } from "../store/user-slice";
import styles from "../sass/pages/Payment.module.scss";
import { Link } from "react-router-dom/cjs/react-router-dom.min";

function Payment() {
  const elements = useElements();
  const stripe = useStripe();
  const [disabled, setDisabled] = useState(true);
  const [error, setError] = useState(null);
  const [processing, setProcessing] = useState("");
  const [succeeded, setSucceeded] = useState(false);
  const [clientSecret, setClientSecret] = useState("");
  const dispatch = useDispatch();
  const { items, totalAmount, totalQuantity } = useSelector(
    (state) => state.cart
  );
  const { user } = useSelector((state) => state.user);
  const history = useHistory();
  const btnRef = useRef();

  useEffect(() => {
    // generate the special stripe secret which allow us to charge customers
    const getClientSecret = async () => {
      const res = await firebaseAxios({
        method: "POST",
        // stripe expects the total in a currencies subunits
        url: `payments/create?total=${(totalAmount * 100).toFixed(0)}`,
      });
      setClientSecret(res.data.clientSecret);
    };
    getClientSecret();
  }, [totalAmount, user, history]);

  // setting style of CardElement
  const cardStyle = {
    style: {
      base: {
        backgroundColor: "#eee",

        fontSize: "16px",
        "::placeholder": {
          fontSize: "13px",
        },
      },
    },
  };

  const cardChangeHandler = (e) => {
    // Listen for changes in the CardElement
    // and display any errors as the customer types their card details
    setDisabled(e.empty);
    setError(e.error?.message || "");
  };

  const formSubmitHandler = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) return;
    if (btnRef.current.getAttribute("aria-disabled") && (disabled || error)) {
      return setError("Please enter valid card informations");
    } else if (
      btnRef.current.getAttribute("aria-disabled" && (processing || succeeded))
    ) {
      return;
    }

    setProcessing(true);
    await stripe
      .confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
        },
      })
      .then(({ paymentIntent }) => {
        dispatch(sendUserOrdersData(user, paymentIntent, items));
        setDisabled(true);
        setSucceeded(true);
        setProcessing(false);
        setError(null);
        dispatch(cartActions.emptyCart());
        history.replace("/account/orders");
      })
      .catch(({ error: stripeError }) => {
        setError(stripeError.message);
        setProcessing(false);
      });
  };

  return (
    <div className={styles.payment}>
      <div className={styles.payment__items}>
        <Link to="/" className={styles.link}>
          <span>&larr;</span> Continue Shopping
        </Link>
        <h1 className={styles.payment__title}>Checkout</h1>

        {items.map((item) => (
          <CartItem item={item} key={item.id} hideBtn />
        ))}
      </div>
      <div className={styles.payment__details}>
        <div>
          <h3 className={styles.payment__heading}>Delivery Adress</h3>
          <p>410 Terry Ave N, Seattle 98109, WA.</p>
        </div>

        <div>
          <h3 className={styles.payment__heading}>Order Preview</h3>
          <div className={styles.payment__price}>
            <span>{totalQuantity} items</span>
            <CurrencyFormat
              decimalScale={2}
              value={totalAmount}
              displayType={"text"}
              thousandSeparator={true}
              prefix={"$"}
              renderText={(value) => <p> USD {value}</p>}
            />
          </div>
          <div className={styles.payment__price}>
            <span>Shipping</span>
            <p>USD $0.00</p>
          </div>
          <div className={styles.payment__price}>
            <span>Total</span>
            <CurrencyFormat
              decimalScale={2}
              value={totalAmount}
              displayType={"text"}
              thousandSeparator={true}
              prefix={"$"}
              renderText={(value) => (
                <p>
                  <strong> USD {value}</strong>
                </p>
              )}
            />
          </div>
        </div>
        <div>
          <h3 className={styles.payment__heading}>Payment Details</h3>
          <form className={styles.payment__form} onSubmit={formSubmitHandler}>
            <CardElement options={cardStyle} onChange={cardChangeHandler} />
            {error && <div className={styles.payment__error}>{error}</div>}
            <button
              className={styles.payment__btn}
              aria-disabled={disabled || processing || succeeded || error}
              ref={btnRef}
            >
              <span>{processing ? "Processing..." : "Buy Now"}</span>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Payment;
