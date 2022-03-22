import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Loader from "../components/UI/Loader";
import useHttp from "../hooks/use-http";
import ProductItem from "../components/Product/ProductItem";
import styles from "../sass/pages/Products.module.scss";

function Products() {
  const { selectedCategory } = useParams();
  const { httpState, sendRequest } = useHttp();

  useEffect(() => {
    sendRequest(`/products/category/${selectedCategory}`);
  }, [sendRequest, selectedCategory]);

  return (
    <div className={styles.products}>
      <h1>{selectedCategory.toUpperCase()}</h1>
      <div className={styles.products__container}>
        {httpState.loading && <Loader />}
        {httpState.error && <p>Something went wrong.</p>}
        {httpState.data &&
          httpState.data.map((product) => (
            <ProductItem product={product} key={product.id} />
          ))}
      </div>
    </div>
  );
}

export default Products;
