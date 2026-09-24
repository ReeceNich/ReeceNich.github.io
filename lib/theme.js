(function() {
  try {
    const stored = localStorage.getItem('theme');
    const validStored = stored === 'dark' || stored === 'light' ? stored : null;
    const systemTheme = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    const theme = validStored || systemTheme;
    document.documentElement.setAttribute('data-bs-theme', theme);
    const meta = document.querySelector('meta[name="color-scheme"]');
    if (meta) {
      meta.setAttribute('content', theme);
    }
  } catch (e) {
    // Fallback to light if localStorage or matchMedia fails
  }
})();
