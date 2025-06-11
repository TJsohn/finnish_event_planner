import styles from './Footer.module.css';
import appleLogo from '../../assets/images/logo-apple.svg';
import googleLogo from '../../assets/images/logo-google.svg';

const Footer = ({ year = new Date().getFullYear() }) => {
  return (
    <footer className={styles.footer}>
      <div className={styles.content}>
        <div className={styles.columns}>
          <div>
            <h4>Discover</h4>
            <a
              href="https://www.hel.fi/fi"
              className={styles.footerLink}
              target="_blank"
              rel="noopener noreferrer"
            >
              Helsinki
            </a>
            <a
              href="https://www.infofinland.fi/"
              className={styles.footerLink}
              target="_blank"
              rel="noopener noreferrer"
            >
              Finland
            </a>
          </div>

          <div>
            <h4>Follow Us</h4>
            <a
              href="https://www.facebook.com/"
              className={styles.footerText}
              target="_blank"
              rel="noopener noreferrer"
            >
              Facebook
            </a>
            <a
              href="https://x.com/"
              className={styles.footerText}
              target="_blank"
              rel="noopener noreferrer"
            >
              X (Twitter)
            </a>
            <a
              href="https://www.instagram.com/"
              className={styles.footerText}
              target="_blank"
              rel="noopener noreferrer"
            >
              Instagram
            </a>
            <a
              href="https://www.youtube.com/"
              className={styles.footerText}
              target="_blank"
              rel="noopener noreferrer"
            >
              YouTube
            </a>
            <a
              href="https://www.tiktok.com/en/"
              className={styles.footerText}
              target="_blank"
              rel="noopener noreferrer"
            >
              TikTok
            </a>
            <a
              href="https://www.linkedin.com/"
              className={styles.footerText}
              target="_blank"
              rel="noopener noreferrer"
            >
              LinkedIn
            </a>
          </div>

          <div>
            <h4>About</h4>
            <p className={styles.footerText}>Open Application</p>
            <p className={styles.footerText}>Help desk</p>
            <p className={styles.footerText}>Gift Card</p>
          </div>

          <div className={styles.mobileApp}>
            <h3>Freydis application</h3>
            <p className={styles.appText}>Still do not have our mobile app?</p>
            <p className={styles.appText}>
              Help yourself and download Freydis application and be in touch with your favorite events!
            </p>
            <div className={styles.storeButtons}>
              <img src={appleLogo} alt="Download on the App Store" />
              <img src={googleLogo} alt="Get it on Google Play" />
            </div>
          </div>
        </div>
      </div>

      <hr className={styles.fullWidthLine} />

      <div className={styles.content}>
        <div className={styles.bottomBar}>
        <p className={styles.footerNote}>
          <span className={styles.footerHover}>Terms of Use</span>
          <span className={styles.divider}> | </span>
          <span className={styles.footerHover}>Privacy Policy</span>
          <span className={styles.divider}> | </span>
          <span className={styles.footerHover}>Cookies Management</span>
        </p>

          <p className={styles.footerNote}>&copy; {year} FREYDIS EVENT PLANNER</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;