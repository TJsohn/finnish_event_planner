import React from "react";
import CategoryItem from "../../components/CategoryItem/CategoryItem";
import styles from "./EventList.module.css";
import EventCard from "../../components/EventCard/EventCard";

function EventList() {
  // filtering

  return (
    <>
      <div className={styles.heroBannerWrapper}>
        <h1>Do not miss out!</h1>
        <p>Explore vibrant event happening in Helsinki area.</p>

        <div>
          <input type="text" name="search" />
        </div>
      </div>
      <div>
        <h2>Categories</h2>
        <div className={styles.categoryListContainer}>
          <CategoryItem category="Culture" />
          <CategoryItem category="Education" />
          <CategoryItem category="Sport" />
          <CategoryItem category="Technology" />
          <CategoryItem category="Entertainment" />
          <CategoryItem category="Travel" />
        </div>

        <div>
          <h2>Events</h2>
          <div className={styles.eventCardContainer}>
            <EventCard
              location="Espoo"
              title="Event1"
              date="2020-01-10"
              category="education"
            />
            <EventCard
              location="helsinki"
              title="Event2"
              date="2020-01-10"
              category="sport"
            />
            <EventCard
              location="Espoo"
              title="Event3"
              date="2020-01-10"
              category="travel"
            />
            <EventCard
              location="vantaa"
              title="Event4"
              date="2020-01-10"
              category="technology"
            />
            <EventCard
              location="vantaa"
              title="Event5"
              category="entertainment"
              date="2020-01-10"
            />
            <EventCard
              location="espoo"
              title="Event6"
              date="2020-01-10"
              category="culture"
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default EventList;

// const events = [
//   {
//     id: "",
//     title: "",
//     date: "",
//     location: "",
//     category: "",
//   },
// ];
