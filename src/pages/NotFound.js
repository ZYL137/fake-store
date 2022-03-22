import { Link } from "react-router-dom";
import styles from "../sass/pages/NotFound.module.scss";

function NotFound() {
  return (
    <div className={styles["not-found"]}>
      <h1 className={styles["not-found__title"]}>
        Sorry, we couldn't found the page.
      </h1>
      <Link to="/" className={styles["not-found__link"]}>
        Go to home page
      </Link>
    </div>
  );
}

export default NotFound;
