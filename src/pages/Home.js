import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Loader from "../components/UI/Loader";
import ProductItem from "../components/Product/ProductItem";
import useHttp from "../hooks/use-http";
import styles from "../sass/pages/Home.module.scss";

function Home() {
  const { httpState, sendRequest } = useHttp();
  const [isMounted, setIsMounted] = useState(true);

  useEffect(() => {
    if (isMounted) {
      sendRequest("/products?limit=4");
    }
    return () => {
      setIsMounted(false);
    };
  }, [sendRequest, isMounted]);

  return (
    <div className={styles.home}>
      <div className={styles.home__container}>
        <section className={styles.home__hero}>
          <div className={styles["home__hero-text-box"]}>
            <p className={styles.home__subheading}>Just Arrived</p>
            <h3 className={styles.home__heading}>
              All-New Future <br />
              LifeWear Essentials
            </h3>
            <p>2222 Women's Spring/Summer Collection</p>
            <Link
              to="/products/category/women's clothing"
              className={styles.home__link}
            >
              SHOP NOW
            </Link>
          </div>
        </section>

        <section className={styles.home__row}>
          <div className={styles["home__row-img"]}>
            <img src="../../assets/jewelery1.jpg" alt="A diamond ring" />
          </div>
          <div className={styles["home__row-text"]}>
            <h3 className={styles.home__subheading}>JEWELERY</h3>
            <p className={styles.home__heading}>
              For Life’s Most Joyful Occasions
            </p>
            <p>
              Mark the moments with classic styles made to be cherished forever.
            </p>

            <Link
              to="/products/category/jewelery"
              className={styles.home__link}
            >
              SHOP NOW
            </Link>
          </div>
        </section>

        {httpState.loding && <Loader />}
        {!httpState.loding && (
          <section className={styles.home__products}>
            <h3 className={styles.home__heading}>NEW ARRIVALS</h3>
            <div className={styles["home__products-content"]}>
              {httpState.data &&
                httpState.data.map((product) => (
                  <div key={product.id} className={styles["home__product"]}>
                    <ProductItem product={product} />
                  </div>
                ))}
            </div>
          </section>
        )}

        <section className={styles.home__row}>
          <div className={styles["home__row-text"]}>
            <p className={styles.home__subheading}>Just Arrived</p>
            <h3 className={styles.home__heading}>
              All-New Future <br />
              LifeWear Essentials
            </h3>
            <p>2222 Men's Spring/Summer Collection</p>
            <Link
              to="/products/category/men's clothing"
              className={styles.home__link}
            >
              SHOP NOW
            </Link>
          </div>

          <div className={styles["home__row-img"]}>
            <img
              src="../../assets/men.jpg"
              alt="Clothes, boots and accessories"
            />
          </div>
        </section>
      </div>
    </div>
  );
}

export default Home;
