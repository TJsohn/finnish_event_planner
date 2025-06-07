import styles from "./CategoryItem.module.css";

const CategoryItem = ({ category, onCategoryClick }) => {
  return (
    <span onClick={onCategoryClick} className={styles.categoryItem}>
      {category}
    </span>
  );
};

export default CategoryItem;
