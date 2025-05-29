import styles from './Footer.module.css';

const Footer = ({ year }) => {
  return (
    <footer className={styles.footer}>
      <p>&copy; {year} Finnish Event Planner</p>
      <nav className={styles.navRight}>
        <ul>
          <li><a href="/">Home</a></li>
          <li><a href="/events">Events</a></li>
          <li><a href="/add">Add Event</a></li>
          <li><a href="/about">About</a></li>
        </ul>
      </nav>
    </footer>
  );
};

export default Footer;
