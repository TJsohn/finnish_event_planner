import { Link } from "react-router";
import styles from "./EventCard.module.css";
import { emojisMap } from "../../data/emojisMap";
import { supportedCategory } from "../../data/categories";

const defaultImageUrl =
  "https://cdn.pixabay.com/photo/2017/07/27/12/31/party-2545168_1280.jpg";

function formatDate(dateStr) {
  if (!dateStr) return "";
  const date = new Date(dateStr);
  return `${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear()}`;
}

function formatEventDate(startDate, endDate) {
  if (!startDate) return "";
  const formattedStart = formatDate(startDate);
  const formattedEnd = formatDate(endDate);
  if (!endDate || startDate === endDate) return formattedStart;;
  return `${formattedStart} - ${formattedEnd}`;
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
        src={imageUrl? imageUrl : defaultImageUrl}
        alt={title}
        className={styles.eventImage}
      />
      <h2>{title}</h2>
      <div className={styles.eventInfo}>
       <span className={styles.eventInfoIcon}>📅</span>
        <span>{formatEventDate(startDate, endDate)}</span>
      </div>
      <div className={styles.locationInfo}>
        <span className={styles.eventInfoIcon}>📍</span>
        <span>{location}</span>
      </div>
      <div className={styles.footer}>
      <Link className={styles.button} to={`/events/details/${id}`}>
        See details
      </Link>
      </div>
    </div>
  );
};

export default EventCard;