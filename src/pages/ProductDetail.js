import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Rating } from "@mui/material";
import TwitterIcon from "@mui/icons-material/Twitter";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import PinterestIcon from "@mui/icons-material/Pinterest";
import LocalShippingOutlinedIcon from "@mui/icons-material/LocalShippingOutlined";
import useHttp from "../hooks/use-http";
import { cartActions } from "../store/cart-slice";
import Loader from "../components/UI/Loader";
import styles from "../sass/pages/ProductDetail.module.scss";

function ProductDetail() {
  const dispatch = useDispatch();
  const { httpState, sendRequest } = useHttp();
  const { productId } = useParams();
  const [quantity, setQuantity] = useState(1);
  const [isMounted, setIsMounted] = useState(true);

  useEffect(() => {
    if (isMounted) {
      sendRequest(`/products/${productId}`);
    }
    return () => {
      setIsMounted(false);
    };
  }, [sendRequest, productId, isMounted]);

  const decreaseProductHandler = () => {
    setQuantity((prevQuantity) => prevQuantity - 1);
  };
  const increaseProductHandler = () => {
    setQuantity((prevQuantity) => prevQuantity + 1);
  };

  const addToCartHandler = () => {
    dispatch(cartActions.addItemToCart({ ...httpState.data, quantity }));
  };

  return (
    <div className={styles["product-detail"]}>
      {httpState.loading && <Loader />}
      {!httpState.loading && httpState.data && (
        <>
          <div className={styles["product-detail__img-box"]}>
            <img src={httpState.data.image} alt={httpState.data.title} />
          </div>
          <div className={styles["product-detail__info"]}>
            <h2 className={styles["product-detail__title"]}>
              {httpState.data.title}
            </h2>

            <div className={styles["product-detail__rating"]}>
              <Rating
                name="half-rating-read"
                defaultValue={5}
                value={httpState.data.rating.rate}
                precision={0.5}
                readOnly
              />
              <span>{httpState.data.rating.count} reviews</span>
            </div>
            <div className={styles["product-detail__icons"]}>
              <TwitterIcon />
              <FacebookIcon />
              <InstagramIcon />
              <PinterestIcon />
            </div>

            <p className={styles["product-detail__price"]}>
              ${httpState.data.price}
            </p>
            <div className={styles["product-detail__shipping"]}>
              <LocalShippingOutlinedIcon />
              <span>Free Shipping</span>
            </div>

            <div className={styles["product-detail__actions"]}>
              <span
                role="button"
                className={`${styles["product-detail__actions--decrease"]} ${
                  quantity <= 1 ? styles["product-detail__actions--hide"] : ""
                }`}
                onClick={decreaseProductHandler}
              >
                -
              </span>

              <span>Quantity: {quantity}</span>
              <span
                role="button"
                className={styles["product-detail__actions--increase"]}
                onClick={increaseProductHandler}
              >
                +
              </span>
            </div>

            <button
              className={styles["product-detail__btn"]}
              onClick={addToCartHandler}
            >
              Add to Cart
            </button>

            <p className={styles["product-detail__description"]}>
              <h4>DESCRIPTION:</h4>
              {httpState.data.description}
            </p>
          </div>
        </>
      )}
    </div>
  );
}

export default ProductDetail;
