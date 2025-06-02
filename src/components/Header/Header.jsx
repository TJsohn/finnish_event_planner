import { NavLink, Link } from "react-router";
import styles from "./Header.module.css";

import flower from "../../assets/images/logo-flower.svg";
import textLogo from "../../assets/images/text-logo-static.svg";

const Header = () => {
  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <Link to="/" className={styles.logoLink}>
          <img
            src={flower}
            alt="Freydis flower"
            className={styles.logoFlower}
          />
          <img
            src={textLogo}
            alt="Freydis text"
            className={styles.logoText}
          />
        </Link>
      </div>

      <nav className={styles.centerNav}>
        <ul className={styles.navList}>
          <li>
            <NavLink to="/">Home</NavLink>
          </li>
          <li>
            <NavLink to="/events">Events</NavLink>
          </li>
          <li>
            <NavLink to="/add">Add Event</NavLink>
          </li>
          <li>
            <NavLink to="/about">About</NavLink>
          </li>
        </ul>
      </nav>

      <div className={styles.authButtons}>
        <Link to="/login">Login</Link>
        <Link to="/signup" className={styles.signup}>
          Sign Up
        </Link>
      </div>
    </header>
  );
};

export default Header;
