import { Link } from "react-router";
import styles from "./EventCard.module.css";
import { emojisMap } from "../../data/emojisMap";

const EventCard = ({ location, title, date, category, id }) => {
  return (
    <div className={styles.eventCard}>
      <img
        src="https://via.placeholder.com/150"
        alt={title}
        className={styles.eventImage}
      />
      <h2>{title}</h2>
      <p className={styles.categoryEmojis}>{emojisMap[category]}</p>
      <p>{date}</p>
      <p>{location}</p>
      <Link className={styles.button} to="/events/details">
        See details
      </Link>
    </div>
  );
};

export default EventCard;
