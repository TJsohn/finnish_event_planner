import { Link } from "react-router";
import styles from "./EventCard.module.css";
import { emojisMap } from "../../data/emojisMap";
import { supportedCategory } from "../../data/categories";

const defaultImageUrl =
  "https://cdn.pixabay.com/photo/2016/11/23/15/48/audience-1853662_1280.jpg";

function formatEventDate(startDate, endDate) {
  if (!startDate) return "";
  if (!endDate || startDate === endDate) return startDate;
  return `${startDate} - ${endDate}`;
}

const EventCard = ({
  location,
  title,
  startDate,
  endDate,
  category,
  id,
  imageUrl,
}) => {
  return (
    <div className={styles.eventCard}>
      <div className={styles.categoryContainer}>
        <p className={styles.categoryEmojis}>{emojisMap[category]}</p>
        <span className={styles.categoryText}>
          {supportedCategory[category] || category}
        </span>
      </div>
      <img
        src={imageUrl || defaultImageUrl}
        alt={title}
        className={styles.eventImage}
      />
      <h2>{title}</h2>
      <p>{formatEventDate(startDate, endDate)}</p>
      <p>{location}</p>
      <Link className={styles.button} to={`/events/details/${id}`}>
        See details
      </Link>
    </div>
  );
};

export default EventCard;
