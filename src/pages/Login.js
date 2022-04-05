import { useRef, useState } from "react";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";
import { auth } from "../firebase";
import styles from "../sass/pages/Login.module.scss";
import ErrorMsg from "../components/UI/ErrorMsg";

function Login() {
  const history = useHistory();
  const emailInputRef = useRef();
  const passwordInputRef = useRef();
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(null);

  const formSubmitHandler = (e) => {
    e.preventDefault();
    if (isLoading) return;
    setIsLoading(true);
    const email = emailInputRef.current.value;
    const password = passwordInputRef.current.value;

    auth
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        setIsLoading(false);
        history.goBack();
      })
      .catch((err) => {
        setIsLoading(false);
        const errorCode = err.code;
        let errorMessage;
        if (errorCode === "auth/user-not-found" || "auth/invalid-email") {
          errorMessage = "Incorrect email. Please try again.";
        } else if (errorCode === "auth/wrong-password") {
          errorMessage = "Incorrect password. Please try again.";
        }
        setIsError(errorMessage);
        alert(errorMessage);
      });
  };

  return (
    <div className={styles.login}>
      <Link to="/">
        <img
          src="../../assets/logo.avif"
          alt="Fake store logo"
          className={styles.login__logo}
        />
      </Link>
      <div className={styles.login__content}>
        <div className={styles.login__title}>
          <h1>Log in</h1>
          <p>Welcome back</p>
        </div>
        {isError && <ErrorMsg>{isError}</ErrorMsg>}
        <form className={styles.login__form} onSubmit={formSubmitHandler}>
          <div className={styles["login__form-group"]}>
            <label htmlFor="email">E-mail</label>
            <input
              ref={emailInputRef}
              type="text"
              id="email"
              name="email"
              required
            />
          </div>
          <div className={styles["login__form-group"]}>
            <label htmlFor="password">Password</label>
            <input
              ref={passwordInputRef}
              type="password"
              id="password"
              name="password"
              required
            />
          </div>
          <button
            className={styles.login__btn}
            aria-disabled={isLoading && true}
          >
            Log in
          </button>
        </form>
        <p className={styles.login__text}>
          By continuing, you agree to you agree to the Terms and Privacy Policy.
        </p>
      </div>

      <div className={styles.login__divider}>
        <h5>New to Fake Store?</h5>
      </div>
      <Link to="/register" className={styles.login__link}>
        Create your account
      </Link>
    </div>
  );
}

export default Login;
