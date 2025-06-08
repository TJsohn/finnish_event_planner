import styles from "./CategoryItem.module.css";

const CategoryItem = ({ category, onCategoryClick, isActive }) => {
  const containerClassname = isActive
    ? `${styles.categoryItem} ${styles.active}`
    : `${styles.categoryItem}`;

  return (
    <span className={containerClassname} onClick={onCategoryClick}>
      {category}
    </span>
  );
};

export default CategoryItem;
