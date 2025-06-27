import React, { useEffect, useState } from 'react';

const ThemeToggle = () => {
  const [dark, setDark] = useState(false);

  // Load saved theme on component mount
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      setDark(true);
    }
  }, []);

  // Apply theme and save to localStorage
  useEffect(() => {
    document.body.style.background = dark ? '#121212' : '#ffffff';
    document.body.style.color = dark ? '#ffffff' : '#000000';
    localStorage.setItem('theme', dark ? 'dark' : 'light');
  }, [dark]);

  return (
    <button onClick={() => setDark(!dark)}>
      {dark ? '☀ Light Mode' : '🌙 Dark Mode'}
    </button>
  );
};

export default ThemeToggle;
