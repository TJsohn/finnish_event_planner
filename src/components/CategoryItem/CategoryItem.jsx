import styles from "./CategoryItem.module.css";

const CategoryItem = ({ imgUrl, category, altText, onCategoryClick }) => {
  return (
    <div onClick={onCategoryClick} className={styles.categoryContainer}>
      <img src={imgUrl} alt={altText} />
      <span>{category}</span>
    </div>
  );
};

export default CategoryItem;
