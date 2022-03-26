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
  const history = useHistory();

  const authenticationHandler = () => {
    if (user) {
      auth.signOut();
      history.push("/");
    }
  };

  const showUserOptionsHandler = () => {
    document.getElementById("option-user").focus();
  };

  const hideUserOptionsHandler = () => {
    document.getElementById("option-user").blur();
  };

  const setMobileMenuHandler = () => {
    setMobileMenuOpen((prevState) => setMobileMenuOpen(!prevState));
  };

  return (
    <header className={styles.header}>
      <nav
        className={`${styles.header__nav} ${
          mobileMenuOpen ? styles["header__menu--open"] : ""
        }`}
      >
        <Link to="/">
          <img
            className={styles.header__logo}
            // srcSet="../../assets/logo-1x.png 1x, ../../assets/logo-2x.png 2x"
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
          <button className={styles["header__option-btn"]} aria-label="Account">
            <UserIcon
              className={styles.header__icon}
              onClick={showUserOptionsHandler}
            />
          </button>
          {
            <div
              tabIndex="0"
              className={styles["header__option-user"]}
              id="option-user"
              onBlur={hideUserOptionsHandler}
            >
              {!user && (
                <Link
                  to="/login"
                  className={styles["header__option-link"]}
                  onMouseDown={(e) => e.preventDefault()} //prevent blur() to be called
                >
                  <p>Login</p>
                </Link>
              )}
              {user && (
                <>
                  <Link
                    to="/orders"
                    className={styles["header__option-link"]}
                    onMouseDown={(e) => e.preventDefault()} //prevent blur() to be called
                  >
                    <p>Orders</p>
                  </Link>
                  <p onClick={authenticationHandler}>Logout</p>
                </>
              )}
            </div>
          }
          <Link to="/checkout" className={styles["header__option-link"]}>
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
  );
}

export default Header;
