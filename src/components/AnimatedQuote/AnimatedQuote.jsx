import React from 'react';
import styles from '../../pages/Home/Home.module.css';

function AnimatedQuote({ animatedChars = [] }) {
  return (
    <div className={styles.quote}>
      {animatedChars.map(({ char, id, visible }) => (
        <span
          key={id}
          className={`${styles.letter} ${visible ? styles.visible : styles.hidden}`}
        >
          {char}
        </span>
      ))}
    </div>
  );
}

export default AnimatedQuote;