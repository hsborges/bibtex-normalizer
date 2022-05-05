import React, { useEffect } from 'react';

const useEscape = (onEscape: () => any) => {
  useEffect(() => {
    const handleEsc = (event) => {
      if (event.keyCode === 27) onEscape();
    };
    window.addEventListener('keydown', handleEsc);

    return () => {
      window.removeEventListener('keydown', handleEsc);
    };
  }, []);
};

export default useEscape;
