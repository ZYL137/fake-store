import { useEffect } from "react";
import { useParams } from "react-router-dom";
import useHttp from "../hooks/use-http";
import ProductItem from "../components/Product/ProductItem";
import ProductItemSkeleton from "../components/UI/ProductItemSkeleton";
import styles from "../sass/pages/Products.module.scss";

function Products() {
  const { selectedCategory } = useParams();
  const { httpState, sendRequest } = useHttp();

  useEffect(() => {
    sendRequest(`/products/category/${selectedCategory}`);
  }, [sendRequest, selectedCategory]);

  return (
    <div className={styles.products}>
      {httpState.error && <p>Something went wrong.</p>}
      <h1>{selectedCategory.toUpperCase()}</h1>
      <div className={styles.products__container}>
        {httpState.loading &&
          [1, 2, 3, 4].map((i) => {
            return <ProductItemSkeleton key={i} />;
          })}

        {httpState.data &&
          httpState.data.map((product) => (
            <ProductItem product={product} key={product.id} />
          ))}
      </div>
    </div>
  );
}

export default Products;
