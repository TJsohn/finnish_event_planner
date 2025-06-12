import { useState, useEffect } from "react";
import styles from "./BackToTopBtn.module.css";

const BackToTopBtn = ({ showAfter = 200, className = "" }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      return window.scrollY > showAfter
        ? setIsVisible(true)
        : setIsVisible(false);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [showAfter]);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <button
      className={`${styles.backToTop} ${
        isVisible ? styles.show : ""
      } ${className}`}
      onClick={scrollToTop}
      title="Back to top"
      aria-label="Scroll back to top"
    >
      ↑
    </button>
  );
};

export default BackToTopBtn;
