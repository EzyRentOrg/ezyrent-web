import { useState } from 'react';

export const useCharacterCounter = (maxLength: number) => {
  const [count, setCount] = useState(0);
  const [text, setText] = useState('');

  const updateText = (newText: string) => {
    setText(newText);
    setCount(newText.length);
  };

  const getStyledText = () => {
    if (text.length <= maxLength) {
      return { normal: text, overflow: '' };
    }
    return {
      normal: text.slice(0, maxLength),
      overflow: text.slice(maxLength)
    };
  };

  return {
    count,
    text,
    updateText,
    getStyledText,
    isExceeded: count > maxLength
  };
};
