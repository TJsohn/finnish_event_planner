import { useEffect, useRef } from 'react';

export function useBlinkEffect({
  triggerPhrase,
  phraseList,
  currentPhraseIndex,
  setHighlight,
  blinks = 3,
  duration = 600
}) {
  const timeoutRefs = useRef([]);

  useEffect(() => {
    return () => {
      timeoutRefs.current.forEach(clearTimeout);
      timeoutRefs.current = [];
    };
  }, []);

  useEffect(() => {
    if (phraseList[currentPhraseIndex] !== triggerPhrase) return;

    timeoutRefs.current.forEach(clearTimeout);
    timeoutRefs.current = [];

    let count = 0;
    const blink = () => {
      setHighlight(true);
      const offTimeout = setTimeout(() => {
        setHighlight(false);
        count++;
        if (count < blinks) {
          const onTimeout = setTimeout(blink, duration);
          timeoutRefs.current.push(onTimeout);
        }
      }, duration);
      timeoutRefs.current.push(offTimeout);
    };

    blink();
  }, [currentPhraseIndex, phraseList, triggerPhrase, setHighlight, blinks, duration]);
}
