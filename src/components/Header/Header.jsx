import { useState } from "react";
import { NavLink, Link } from "react-router";
import styles from "./Header.module.css";
import AuthModal from "../AuthModal/AuthModal";

import flower from "../../assets/images/logo-flower.svg";
import textLogo from "../../assets/images/text-logo-static.svg";
import { ThemeContext } from "../../ThemeContext";
import { useContext } from "react";


const Header = () => {
  const [modalType, setModalType] = useState(null);
   const { lightMode, toggleTheme } = useContext(ThemeContext);

  return (
    <>
      <header className={styles.headerWrapper}>
        <div className={styles.headerLogo}>
          <Link to="/" className={styles.logoLink}>
            <img src={flower} alt="Freydis flower" className={styles.logoFlower} />
            <img src={textLogo} alt="Freydis text" className={styles.logoText} />
          </Link>
        </div>

        <nav className={styles.headerNav}>
          <ul className={styles.navList}>
            <li className={styles.navItem}>
              <NavLink to="/" className={styles.navLink}>Home</NavLink>
            </li>
            <li className={styles.navItem}>
              <NavLink to="/events" className={styles.navLink}>Events</NavLink>
            </li>
            <li className={styles.navItem}>
              <NavLink to="/add" className={styles.navLink}>Add Event</NavLink>
            </li>
            <li className={styles.navItem}>
              <NavLink to="/about" className={styles.navLink}>About</NavLink>
            </li>
          </ul>
        </nav>

        <div className={styles.headerAuth}>
          <button
            onClick={() => setModalType("login")}
            className={styles.authButton}
          >
            Login
          </button>
          <button
            onClick={() => setModalType("signup")}
            className={`${styles.authButton} ${styles.authButtonSignup}`}
          >
            Sign Up
          </button>
        </div>
        <div>
        <button className={styles.moodBtn} onClick={toggleTheme}>
          {lightMode ? "🌙 " : "🔆"}
        </button>
      </div>
      </header>

      {modalType && (
        <AuthModal type={modalType} onClose={() => setModalType(null)} />
      )}
    </>
  );
};

export default Header;