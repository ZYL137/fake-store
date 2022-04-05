import styles from "../../sass/components/UI/SuccessMsg.module.scss";

function SuccessMsg({ children }) {
  return <div className={styles.success}>{children}</div>;
}

export default SuccessMsg;
