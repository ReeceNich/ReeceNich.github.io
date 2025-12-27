(function() {
  try {
    const storedTheme = localStorage.getItem('theme');
    const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    
    const theme = storedTheme || systemTheme;
    
    document.documentElement.setAttribute('data-bs-theme', theme);
  } catch (e) {}
})();
