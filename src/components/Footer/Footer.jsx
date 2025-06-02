import styles from './Footer.module.css';
import appleLogo from '../../assets/images/logo-apple.svg';
import googleLogo from '../../assets/images/logo-google.svg';

const Footer = ({ year }) => {
  return (
    <footer className={styles.footer}>
      <div className={styles.content}>
        <div className={styles.columns}>
          <div>
            <h4>Discover</h4>
            <p>Helsinki</p>
            <p>Finland</p>
          </div>

          <div>
            <h4>Follow Us</h4>
            <p>Facebook</p>
            <p>X (Twitter)</p>
            <p>Instagram</p>
            <p>YouTube</p>
            <p>TikTok</p>
            <p>LinkedIn</p>
          </div>

          <div>
            <h4>About</h4>
            <p>Open Application</p>
            <p>Help desk</p>
            <p>Gift Card</p>
          </div>

          <div className={styles.mobileApp}>
            <h3>FREYDIS EVENT PLANER</h3>
            <p>Still do not have our mobile app?</p>
            <p>Help yourself and download Freydis application and be in touch with your favorite events!</p>
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
          <p>Terms of Use | Privacy Policy | Cookies Management</p>
          <p>&copy; {year} FREYDIS EVENT PLANER</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;