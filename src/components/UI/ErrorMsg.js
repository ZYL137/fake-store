import styles from "../../sass/components/UI/ErrorMsg.module.scss";

function ErrorMsg({ children }) {
  return <p className={styles.error}>{children}</p>;
}

export default ErrorMsg;
