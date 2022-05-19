import { useState } from "react";
import { Link, NavLink, useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import { UserIcon, ShoppingCartIcon } from "@heroicons/react/outline";
import { auth } from "../../firebase";
import SearchBar from "../Search/SearchBar";
import styles from "../../sass/layout/Header.module.scss";

function Header() {
  const { user } = useSelector((state) => state.user);
  const { totalQuantity } = useSelector((state) => state.cart);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [popupShown, setPopupShown] = useState(false);
  const history = useHistory();

  const logoutHandler = () => {
    if (user) {
      auth.signOut();
      history.push("/");
    }
  };

  const showPopupHandler = () => {
    setPopupShown(true);
  };

  const hidePopupHandler = () => {
    setPopupShown(false);
  };

  const setMobileMenuHandler = () => {
    setMobileMenuOpen((prevState) => setMobileMenuOpen(!prevState));
  };

  return (
    <>
      <header className={styles.header}>
        <nav
          className={`${styles.header__nav} ${
            mobileMenuOpen ? styles["header__menu--open"] : ""
          }`}
        >
          <Link to="/">
            <img
              className={styles.header__logo}
              src="../../assets/logo.avif"
              alt="Fake store logo"
            />
          </Link>

          <div>
            <ul className={styles["header__nav-links"]}>
              <li>
                <NavLink
                  to="/products/category/women's clothing"
                  className={styles["header__nav-link"]}
                  onClick={setMobileMenuHandler}
                >
                  Women
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/products/category/men's clothing"
                  className={styles["header__nav-link"]}
                  onClick={setMobileMenuHandler}
                >
                  Men
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/products/category/jewelery"
                  className={styles["header__nav-link"]}
                  onClick={setMobileMenuHandler}
                >
                  Jewelery
                </NavLink>
              </li>
            </ul>
          </div>

          <div className={styles["header__option"]}>
            <SearchBar />

            <div className={styles["header__option-user"]}>
              <Link
                to={!user ? "/login" : "/account"}
                className={styles["header__option-link"]}
              >
                <UserIcon
                  className={styles.header__icon}
                  onMouseOver={showPopupHandler}
                  onClick={showPopupHandler}
                />
              </Link>
            </div>

            <Link to="/cart" className={styles["header__option-link"]}>
              <div className={styles["header__option-cart"]}>
                <ShoppingCartIcon className={styles.header__icon} />
                <span className={styles["header__option-cart-count"]}>
                  ({totalQuantity})
                </span>
              </div>
            </Link>
            <button
              className={styles["header__menu-btn"]}
              onClick={setMobileMenuHandler}
            >
              <span className={styles["header__menu-icon"]}>&nbsp;</span>
            </button>
          </div>
        </nav>
      </header>

      <div
        className={`${styles["header__option-popup"]} ${
          popupShown && styles["header__option-popup--show"]
        }`}
        onMouseLeave={hidePopupHandler}
      >
        {user && (
          <>
            <Link
              to="/account"
              className={styles["header__option-popup-link"]}
              onClick={hidePopupHandler}
            >
              Account
            </Link>
            <button
              className={styles["header__option-popup-btn"]}
              onClick={logoutHandler}
            >
              Logout
            </button>
          </>
        )}
      </div>
    </>
  );
}

export default Header;
