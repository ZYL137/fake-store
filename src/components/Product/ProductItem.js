import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { cartActions } from "../../store/cart-slice";

import styles from "../../sass/components/ProductItem.module.scss";

function ProductItem({ product }) {
  const dispatch = useDispatch();

  const addToCartHandler = () => {
    dispatch(
      cartActions.addItemToCart({
        ...product,
        price: product.price * 1,
        quantity: 1,
      })
    );
  };

  return (
    <div className={styles.product}>
      <div className={styles["product__img-box"]}>
        <Link to={`/products/${product.id}`}>
          <img src={product.image} alt={product.title} />
        </Link>
      </div>
      <div className={styles.product__info}>
        <Link to={`/products/${product.id}`} className={styles.product__link}>
          <h2 className={styles.product__title}>{product.title}</h2>
        </Link>
        <p className={styles.product__price}>${product.price}</p>
      </div>
      <button onClick={addToCartHandler} className={styles.product__btn}>
        Add to Cart
      </button>
    </div>
  );
}

export default ProductItem;
