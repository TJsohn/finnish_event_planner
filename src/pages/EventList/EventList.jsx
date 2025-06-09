import React, { useState } from "react";
import CategoryItem from "../../components/CategoryItem/CategoryItem";
import styles from "./EventList.module.css";
import EventCard from "../../components/EventCard/EventCard";
import { supportedCategory } from "../../data/categories";

function EventList({ eventsData }) {  
  const [searchValue, setSearchValue] = useState("");
  const [selectedCategoryId, setSelectedCategoryId] = useState("all");

  const handleSearch = (e) => {
    setSearchValue(e.target.value);
  };

  const filteredEvents = eventsData.filter((event) => {
    const search = searchValue.toLowerCase();

    const matchesSearch =
      (event.title?.toLowerCase().includes(search) ||
        event.location?.toLowerCase().includes(search)) &&
      (selectedCategoryId === "all"
        ? true
        : event.category === selectedCategoryId);

    return matchesSearch;
  });

  return (
    <>
      <div className={styles.heroBannerWrapper}>
        <h1>Do not miss out!</h1>
        <p>Explore vibrant event happening in Helsinki area.</p>

        <div>
          <input
            type="text"
            name="search"
            value={searchValue}
            onChange={handleSearch}
          />
        </div>
      </div>
      <div>
        <h2>Categories</h2>
        <div className={styles.categoryListContainer}>
          {Object.entries(supportedCategory).map(([id, label]) => (
            <CategoryItem
              key={id}
              category={label}
              onCategoryClick={() => {
                setSelectedCategoryId(id);
              }}
            />
          ))}
        </div>

        <div>
          <h2>Events</h2>
          <div className={styles.eventCardContainer}>
            {filteredEvents.length > 0 ? (
              filteredEvents.map((event) => (
                <EventCard key={event.id} {...event} />
              ))
            ) : (
              <p>
                Event not found! Looks like it ghosted us 👻! Try different
                keywords 🔍
              </p>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default EventList;