import styles from "./CategoryItem.module.css";

const CategoryItem = ({ imgUrl, category, altText }) => {
  return (
    <div className={styles.categoryContainer}>
      <img src={imgUrl} alt={altText} />
      <span>{category}</span>
    </div>
  );
};

export default CategoryItem;
