import { useRef, useState } from "react";
import { auth } from "../firebase";
import useInput from "../hooks/use-input";
import ErrorMsg from "../components/UI/ErrorMsg";
import { useHistory } from "react-router-dom";
import SuccessMsg from "../components/UI/SuccessMsg";
import styles from "../sass/pages/Profile.module.scss";

function Profile() {
  const [error, setError] = useState(null);
  const [succeeded, setSucceeded] = useState(false);
  const history = useHistory();
  const nameRef = useRef();
  const emailRef = useRef();

  const {
    value: enteredName,
    isValid: enteredNameIsValid,
    valueChangeHandler: nameChangeHandler,
  } = useInput((value) => value.trim() !== "");

  const {
    value: enteredEmail,
    isValid: enteredEmailIsValid,
    valueChangeHandler: emailChangeHandler,
  } = useInput((value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value));

  const updateProfileHandler = (e) => {
    e.preventDefault();
    setSucceeded(false);

    if (enteredNameIsValid) {
      auth.currentUser
        .updateProfile({ displayName: enteredName })
        .then(() => {
          // Update successful
          setError(null);
          setSucceeded(true);
          nameRef.current.value = "";
        })
        .catch((error) => {
          // Update fail
          setSucceeded(false);
          setError(error.message);
        });
    }

    if (enteredEmailIsValid) {
      auth.currentUser
        .updateEmail(enteredEmail)
        .then(() => {
          // Update successful
          setError(null);
          setSucceeded(true);
          emailRef.current.value = "";
        })
        .catch((error) => {
          // Update fail
          setSucceeded(false);
          if (error.code === "auth/requires-recent-login") {
            history.push("/login");
          } else {
            setError(error.message);
          }
        });
    }
    return;
  };

  return (
    <div className={styles.profile}>
      <h1 className={styles.profile__heading}>Profile</h1>

      {auth.currentUser && (
        <>
          <form className={styles.profile__form}>
            {error && <ErrorMsg>{error}</ErrorMsg>}
            {succeeded && (
              <SuccessMsg>Profile updated successfully.</SuccessMsg>
            )}
            <div className={styles["profile__form-group"]}>
              <label htmlFor="name">Name</label>
              <span>{auth.currentUser.displayName}</span>
              <input
                type="text"
                id="name"
                name="name"
                onChange={nameChangeHandler}
                placeholder="New name"
                ref={nameRef}
              />
            </div>

            <div className={styles["profile__form-group"]}>
              <label htmlFor="email">E-mail</label>
              <span>{auth.currentUser.email}</span>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="New email"
                onChange={emailChangeHandler}
                ref={emailRef}
              />
            </div>
            <div className={styles["profile__form-group"]}>
              <label htmlFor="birthday">Birthday</label>
              <span>1970/01/01</span>
            </div>
            <div className={styles["profile__form-group"]}>
              <label htmlFor="address">Address</label>
              <span>410 Terry Ave N, Seattle 98109, WA.</span>
            </div>

            <button
              className={styles["profile__actions-btn"]}
              onClick={updateProfileHandler}
            >
              Update
            </button>
          </form>
        </>
      )}
    </div>
  );
}

export default Profile;
