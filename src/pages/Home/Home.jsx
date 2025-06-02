import React from 'react';
import { useNavigate } from 'react-router';
import styles from './Home.module.css';

function Home() {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/events');
  };

  return (
    <div className={styles.home}>
      <video
        className={styles.video}
        autoPlay
        muted
        loop
        playsInline
        src="/video-background.mp4"
      />

      <div className={styles.overlay}>
        <button className={styles.ctaButton} onClick={handleClick}>
          Explore Events
        </button>
      </div>
    </div>
  );
}

export default Home;