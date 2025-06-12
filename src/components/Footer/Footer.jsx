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
              className={styles.footerText}
              target="_blank"
              rel="noopener noreferrer"
            >
              Helsinki
            </a>
            <a
              href="https://www.infofinland.fi/"
              className={styles.footerText}
              target="_blank"
              rel="noopener noreferrer"
            >
              Finland
            </a>
          </div>

          <div>
            <h4>Follow Us</h4>
            {[
              { label: 'Facebook', url: 'https://www.facebook.com/' },
              { label: 'X (Twitter)', url: 'https://x.com/' },
              { label: 'Instagram', url: 'https://www.instagram.com/' },
              { label: 'YouTube', url: 'https://www.youtube.com/' },
              { label: 'TikTok', url: 'https://www.tiktok.com/en/' },
              { label: 'LinkedIn', url: 'https://www.linkedin.com/' },
            ].map(({ label, url }) => (
              <a
                key={label}
                href={url}
                className={styles.footerText}
                target="_blank"
                rel="noopener noreferrer"
              >
                {label}
              </a>
            ))}
          </div>

          <div>
            <h4>About</h4>
            {['Open Application', 'Help desk', 'Gift Card'].map((item) => (
              <p key={item} className={styles.footerText}>
                {item}
              </p>
            ))}
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