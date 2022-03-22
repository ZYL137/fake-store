import { useEffect } from "react";
import { useParams } from "react-router-dom";
import useHttp from "../hooks/use-http";
import Loader from "../components/UI/Loader";
import ProductItem from "../components/Product/ProductItem";
import { useDispatch, useSelector } from "react-redux";
import { searchActions } from "../store/search-slice";
import styles from "../sass/pages/SearchResults.module.scss";

function SearchResults() {
  const { httpState, sendRequest } = useHttp();
  const { query } = useParams();
  const dispatch = useDispatch();
  const searchData = useSelector((state) => state.search);

  useEffect(() => {
    sendRequest("/products");
  }, [sendRequest]);

  useEffect(() => {
    if (httpState.data) {
      const filteredProducts = httpState.data.filter((product) =>
        product.title.toLowerCase().includes(query.toLowerCase())
      );

      dispatch(
        searchActions.getSearchData({
          query,
          results: filteredProducts,
        })
      );
    }
  }, [query, httpState.data, dispatch]);

  return (
    <div className={styles["sarch-results"]}>
      {!httpState.data && <Loader />}
      {searchData.results !== null && searchData.results.length === 0 && (
        <h1 className={styles["sarch-results__not-found"]}>
          We're sorry! We couldn't find any results for <span>"{query}"</span>
          .
          <br />
          Please try again
        </h1>
      )}
      {searchData.results && searchData.results.length >= 1 && (
        <div>
          <div className={styles["sarch-results__counts"]}>
            <p>
              {searchData.results.length} results for
              <span> "{searchData.query}"</span>
            </p>
          </div>
          <div className={styles["sarch-results__content"]}>
            {searchData.results.map((result) => (
              <ProductItem product={result} key={result.id} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default SearchResults;
