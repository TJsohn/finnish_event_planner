import styles from "./CategoryItem.module.css";

const CategoryItem = ({ category, onCategoryClick }) => {
  return (
    <span className={styles.categoryItem} onClick={onCategoryClick}>
      {category}
    </span>
  );
};

export default CategoryItem;
