import { useEffect, useState, useMemo } from 'react';

export function useAnimatedText(phrases, delay = 50, visibleDuration = 4000) {
  const [visibilityMap, setVisibilityMap] = useState([]);
  const [currentPhraseIndex, setCurrentPhraseIndex] = useState(0);

  const phraseList = useMemo(() => (
    Array.isArray(phrases) ? phrases : [phrases]
  ), [phrases]);

  const text = phraseList[currentPhraseIndex] || "";
  const chars = useMemo(() => text.split(""), [text]);

  useEffect(() => {
    if (!text) return;
    
    setVisibilityMap(Array(text.length).fill(false));

    const timeouts = [];
    const totalAppearTime = chars.length * delay;
    const fullCycleTime = totalAppearTime * 2 + visibleDuration;

    chars.forEach((_, i) => {
      timeouts.push(setTimeout(() => {
        setVisibilityMap(prev => {
          const updated = [...prev];
          updated[i] = true;
          return updated;
        });
      }, i * delay));
    });

    chars.forEach((_, i) => {
      timeouts.push(setTimeout(() => {
        setVisibilityMap(prev => {
          const updated = [...prev];
          updated[i] = false;
          return updated;
        });
      }, totalAppearTime + visibleDuration + i * delay));
    });

    timeouts.push(setTimeout(() => {
      setCurrentPhraseIndex(prev => (prev + 1) % phraseList.length);
    }, fullCycleTime));

    return () => timeouts.forEach(clearTimeout);
  }, [text, delay, visibleDuration, currentPhraseIndex, phraseList.length]);

  const animatedChars = chars.map((char, i) => ({
    char,
    id: `${currentPhraseIndex}-${i}`,
    visible: visibilityMap[i] || false,
  }));

  return {
    animatedChars,
    currentPhraseIndex,
    phraseList
  };
}