import styles from "../../sass/components/Error.module.scss";

function Error({ children }) {
  return <p className={styles.error}>{children}</p>;
}

export default Error;
