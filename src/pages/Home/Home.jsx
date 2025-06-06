import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router';
import { useAnimatedText } from '../../hooks/useAnimatedText';
import { useBlinkEffect } from '../../hooks/useBlinkEffect';
import styles from './Home.module.css';
import AnimatedQuote from '../../components/AnimatedQuote/AnimatedQuote';

function Home() {
  const navigate = useNavigate();
  const [isPulsing, setIsPulsing] = useState(false);

  const phrases = useMemo(() => [
    "All our dreams can come true, if we have the courage to pursue them.",
    "Love",
    "Passion",
    "Happiness",
    "Explore!"
  ], []);

  const { animatedChars, currentPhraseIndex, phraseList } = useAnimatedText(phrases, 40, 3000);

  useBlinkEffect({
    triggerPhrase: "Explore!",
    phraseList,
    currentPhraseIndex,
    setHighlight: setIsPulsing, 
    blinks: 3,
    duration: 600
  });

  const handleClick = () => navigate('/events');

  return (
    <div className={styles.home}>
      <video
        className={styles.video}
        autoPlay
        muted
        loop
        playsInline
        src="/video-background.mp4"
        alt="video background"
      />
      
      <AnimatedQuote animatedChars={animatedChars} />

      <div className={styles.overlay}>
        <button
          className={`${styles.ctaButton} ${isPulsing ? styles.pulse : ''}`}
          onClick={handleClick}
        >
          Explore
        </button>
      </div>
    </div>
  );
}

export default Home;