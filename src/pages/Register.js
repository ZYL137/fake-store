import { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { auth, db } from "../firebase";
import useInput from "../hooks/use-input";
import Loader from "../components/UI/Loader";
import Error from "../components/UI/Error";
import styles from "../sass/pages/Register.module.scss";

function Register() {
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(null);

  let formIsValid = false;
  const history = useHistory();
  const {
    value: enteredName,
    isValid: enteredNameIsValid,
    hasError: nameHasError,
    valueChangeHandler: nameChangeHandler,
    inputBlurHandler: nameBlurHandler,
  } = useInput((value) => value.trim() !== "");

  const {
    value: enteredEmail,
    isValid: enteredEmailIsValid,
    hasError: emailHasError,
    valueChangeHandler: emailChangeHandler,
    inputBlurHandler: emailBlurHandler,
  } = useInput((value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value));

  const {
    value: enteredPassword,
    isValid: enteredPasswordIsValid,
    hasError: passwordHasError,
    valueChangeHandler: passwordChangeHandler,
    inputBlurHandler: passwordBlurHandler,
  } = useInput((value) => value.trim().length >= 6);

  const {
    isValid: confirmPasswordIsValid,
    hasError: confirmPasswordHasError,
    valueChangeHandler: confirmPasswordChangeHandler,
    inputBlurHandler: confirmPasswordBlurHandler,
  } = useInput((value) => value === enteredPassword);

  if (
    enteredNameIsValid &&
    enteredEmailIsValid &&
    enteredPasswordIsValid &&
    confirmPasswordIsValid
  ) {
    formIsValid = true;
  }

  const formSubmitHandler = (e) => {
    e.preventDefault();
    if (!formIsValid) return;
    setIsLoading(true);
    auth
      .createUserWithEmailAndPassword(enteredEmail, enteredPassword)
      .then((user) => {
        window.confirm("Successfully registered. Welcome to Fake Store!");

        user.user
          .updateProfile({ displayName: enteredName })
          .then(() => {})
          .catch((err) => alert(err));

        setIsLoading(false);
        history.push("/");
        // Add new user to firestore
        db.collection("users").doc(user.user.uid).set({
          uid: user.user.uid,
          username: enteredName,
          email: enteredEmail,
        });
      })
      .catch((err) => {
        setIsLoading(false);
        setIsError(err.message);
        alert(err.message);
      });
  };

  return (
    <div className={styles.register}>
      <div className={styles.register__container}>
        <Link to="/">
          <img
            src="../assets/logo.png"
            alt="Fake store logo"
            className={styles.register__logo}
          />
        </Link>
        <form className={styles.register__form} onSubmit={formSubmitHandler}>
          <h1 className={styles.register__title}>Create account</h1>
          {isLoading && <Loader />}
          {isError && <Error>{isError}</Error>}
          <div className={styles["register__form-group"]}>
            <label htmlFor="name">Your name</label>
            <input
              className={`${styles["register__input"]}  ${
                nameHasError ? styles["register__input--invalid"] : ""
              }`}
              type="text"
              id="name"
              name="name"
              required
              onBlur={nameBlurHandler}
              onChange={nameChangeHandler}
            />
            {nameHasError && (
              <p className={styles["register__text--error"]}>
                Please enter your name
              </p>
            )}
          </div>

          <div className={styles["register__form-group"]}>
            <label htmlFor="email">E-mail</label>
            <input
              className={`${styles["register__input"]}  ${
                emailHasError ? styles["register__input--invalid"] : ""
              }`}
              type="email"
              id="email"
              name="email"
              required
              onBlur={emailBlurHandler}
              onChange={emailChangeHandler}
            />
            {emailHasError && (
              <p className={styles["register__text--error"]}>
                Please enter a valid email address
              </p>
            )}
          </div>

          <div className={styles["register__form-group"]}>
            <label htmlFor="password">Password</label>
            <input
              className={`${styles["register__input"]}  ${
                passwordHasError ? styles["register__input--invalid"] : ""
              }`}
              type="password"
              id="password"
              name="password"
              placeholder="At least 6 characters"
              required
              onBlur={passwordBlurHandler}
              onChange={passwordChangeHandler}
            />
            {!passwordHasError && (
              <p className={styles["register__text--sm"]}>
                Passwords must be at least 6 characters.
              </p>
            )}
            {passwordHasError && (
              <p className={styles["register__text--error"]}>
                Minimum 6 characters required
              </p>
            )}
          </div>
          <div className={styles["register__form-group"]}>
            <label htmlFor="confirm_password">Re-enter password</label>
            <input
              className={`${styles["register__input"]}  ${
                confirmPasswordHasError
                  ? styles["register__input--invalid"]
                  : ""
              }`}
              type="password"
              id="confirm_password"
              name="confirm_password"
              required
              onBlur={confirmPasswordBlurHandler}
              onChange={confirmPasswordChangeHandler}
            />
            {confirmPasswordHasError && (
              <p className={styles["register__text--error"]}>
                Passwords must match
              </p>
            )}
          </div>

          {!isLoading && (
            <button className={styles.register__btn}>Submit</button>
          )}

          <p className={styles.register__text}>
            By creating an account, you agree to the Terms and Privacy Policy.
          </p>
        </form>
        <p className={styles.register__text}>
          Already have an account?
          <Link to="/login" className={styles.register__link}>
            Sign-In &rarr;
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Register;
