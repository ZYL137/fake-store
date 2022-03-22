import { useRef, useState } from "react";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";
import { auth } from "../firebase";
import Loader from "../components/UI/Loader";
import styles from "../sass/pages/Login.module.scss";
import Error from "../components/UI/Error";

function Login() {
  const history = useHistory();
  const emailInputRef = useRef();
  const passwordInputRef = useRef();
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(null);

  const formSubmitHandler = (e) => {
    e.preventDefault();
    setIsLoading(true);
    const email = emailInputRef.current.value;
    const password = passwordInputRef.current.value;

    auth
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        history.push("/");
        setIsLoading(false);
      })
      .catch((err) => {
        const errorCode = err.code;
        let errorMessage;
        if (errorCode === "auth/user-not-found" || "auth/invalid-email") {
          errorMessage = "Incorrect email. Please try again.";
        } else if (errorCode === "auth/wrong-password") {
          errorMessage = "Incorrect password. Please try again.";
        } else if (errorCode === "auth/invalid-email") setIsLoading(false);
        setIsError(errorMessage);
        alert(errorMessage);
      });
  };

  return (
    <div className={styles.login}>
      <Link to="/">
        <img
          src="../assets/logo.png"
          alt="Fake store logo"
          className={styles.login__logo}
        />
      </Link>
      <div className={styles.login__content}>
        <div className={styles.login__title}>
          <h1>Log in</h1>
          <p>Welcome back</p>
        </div>
        {isError && <Error>{isError}</Error>}
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
          {!isLoading && <button className={styles.login__btn}>Log in</button>}
          {isLoading && <Loader />}
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
