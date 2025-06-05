import { Link } from "react-router";
import styles from "./EventCard.module.css";
import { emojisMap } from "../../data/emojisMap";

const categoryLabels = {
    culture: "Culture",
    education: "Education",
    sport: "Sport",
    technology: "Technology",
    entertainment: "Entertainment",
    travel: "Travel",
};

const EventCard = ({ location, title, date, category, id }) => {
  return (
    <div className={styles.eventCard}>
        <div className={styles.categoryContainer}>
            <p className={styles.categoryEmojis}>{emojisMap[category]}</p>
            <span className={styles.categoryText}>
                {categoryLabels[category] || category}
            </span>
        </div>
      <img
        src="https://images.unsplash.com/photo-1652381210069-2e4b639b3585?q=80&w=3174&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        alt={title}
        className={styles.eventImage}
      />
      <h2>{title}</h2>
      <p>{date}</p>
      <p>{location}</p>
      <Link className={styles.button} to={`/events/details/${id}`}>
      See details
      </Link>
    </div>
  );
};

export default EventCard;
