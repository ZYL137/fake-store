import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import useHttp from "../hooks/use-http";
import ProductItem from "../components/Product/ProductItem";
import ProductItemSkeleton from "../components/UI/ProductItemSkeleton";
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
            <img
              srcSet="../../assets/jewelery-1200.webp 1200w, ../../assets/jewelery-800.webp 800w"
              sizes="(max-width:75em) 60vw, (max-width:43.75em) 95vw, 1050px"
              src="../../assets/jewelery-1200.webp"
              alt="A diamond ring"
            />
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

        <section className={styles.home__products}>
          <h3 className={styles.home__heading}>NEW ARRIVALS</h3>
          {httpState.loading &&
            [1, 2, 3, 4].map((i) => {
              return <ProductItemSkeleton key={i} />;
            })}
          {!httpState.loding && (
            <div className={styles["home__products-container"]}>
              {httpState.data &&
                httpState.data.map((product) => (
                  <ProductItem product={product} key={product.id} />
                ))}
            </div>
          )}
        </section>

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
              srcSet="../../assets/men-1200.webp 1200w, ../../assets/men-800.webp 800w"
              sizes="(max-width:75em) 60vw, (max-width:43.75em) 95vw, 1050px"
              src="../../assets/men-1200.webp"
              alt="Clothes, boots and accessories"
            />
          </div>
        </section>
      </div>
    </div>
  );
}

export default Home;
