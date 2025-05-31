import React from "react";
import CategoryItem from "../../components/CategoryItem/CategoryItem";
import styles from "./EventList.module.css";

function EventList() {
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
          <CategoryItem imgUrl="" altText="" category="Culture" />
          <CategoryItem imgUrl="" altText="" category="Education" />
          <CategoryItem imgUrl="" altText="" category="Sport" />
          <CategoryItem imgUrl="" altText="" category="Technology" />
          <CategoryItem imgUrl="" altText="" category="Entertainment" />
          <CategoryItem imgUrl="" altText="" category="Travel" />
        </div>

        <div>
          <h2>Events</h2>
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
