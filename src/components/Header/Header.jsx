import { useState, useContext, useRef, useEffect } from "react";
import { NavLink, Link, useLocation } from "react-router";
import styles from "./Header.module.css";
import AuthModal from "../AuthModal/AuthModal";
import flower from "../../assets/images/logo-flower.svg";
import textLogo from "../../assets/images/text-logo-static.svg";
import { ThemeContext } from "../../ThemeContext";
import { useGlowPosition } from "../../hooks/updateGlowPosition";

const navLinks = [
  { to: "/", label: "Home" },
  { to: "/events", label: "Events" },
  { to: "/add", label: "Add Event" },
  { to: "/about", label: "About" },
];

const Header = () => {
  const [modalType, setModalType] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { lightMode, toggleTheme } = useContext(ThemeContext);
  const location = useLocation();

  const navRefs = useRef({});
  const glowRef = useRef(null);
  const wrapperRef = useRef(null);

  useGlowPosition({
    navRefs,
    glowRef,
    wrapperRef,
    pathname: location.pathname,
  });

useEffect(() => {
  const handleResize = () => {
    if (window.innerWidth > 768) {
      setIsMenuOpen(false);
    }
  };

  window.addEventListener("resize", handleResize);
  return () => window.removeEventListener("resize", handleResize);
}, []);


  const handleAuth = (type) => {
    setModalType(type);
    setIsMenuOpen(false);
  };

  const renderNavLinks = (mobile = false) =>
    navLinks.map(({ to, label }) => (
      <li key={to} className={mobile ? undefined : styles.navItem}>
        <NavLink
          to={to}
          className={({ isActive }) =>
            isActive
              ? `${mobile ? styles.mobileNavLink : styles.navLink} ${styles.activeLink}`
              : mobile
              ? styles.mobileNavLink
              : styles.navLink
          }
          onClick={() => mobile && setIsMenuOpen(false)}
          ref={(el) => (navRefs.current[to] = el)}
        >
          {label}
        </NavLink>
      </li>
    ));

  return (
    <>
      <header className={styles.headerWrapper} ref={wrapperRef}>
        <div className={styles.headerLogo}>
          <Link to="/" className={styles.logoLink}>
            <img src={flower} alt="Freydis flower" className={styles.logoFlower} />
            <img src={textLogo} alt="Freydis text" className={styles.logoText} />
          </Link>
        </div>

        <nav className={styles.headerNav}>
          <ul className={styles.navList}>{renderNavLinks()}</ul>
        </nav>

        <span className={styles.glowBar} ref={glowRef}></span>

        <div className={styles.headerAuth}>
          <button onClick={() => handleAuth("login")} className={styles.authButton}>
            Login
          </button>
          <button
            onClick={() => handleAuth("signup")}
            className={`${styles.authButton} ${styles.authButtonSignup}`}
          >
            Sign Up
          </button>
        </div>

        <div className={styles.moodDesktopOnly}>
          <button className={styles.moodBtn} onClick={toggleTheme}>
            {lightMode ? "🌙" : "🔆"}
          </button>
        </div>

        <button
          className={styles.hamburger}
          onClick={() => setIsMenuOpen((prev) => !prev)}
          aria-label="Toggle menu"
        >
          <span className={styles.hamburgerLine} />
          <span className={styles.hamburgerLine} />
          <span className={styles.hamburgerLine} />
        </button>

        {isMenuOpen && (
          <div className={styles.mobileMenu}>
            <ul className={styles.mobileNavList}>{renderNavLinks(true)}</ul>
            <div className={styles.mobileAuth}>
              <button onClick={() => handleAuth("login")} className={styles.authButton}>
                Login
              </button>
              <button
                onClick={() => handleAuth("signup")}
                className={`${styles.authButton} ${styles.authButtonSignup}`}
              >
                Sign Up
              </button>
              <button onClick={toggleTheme} className={styles.moodBtn}>
                {lightMode ? "🌙" : "🔆"}
              </button>
            </div>
          </div>
        )}
      </header>

      {modalType && <AuthModal type={modalType} onClose={() => setModalType(null)} />}
    </>
  );
};

export default Header;