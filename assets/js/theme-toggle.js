(function() {
  const toggle = document.getElementById('theme-toggle');
  if (!toggle) return;
  
  const html = document.documentElement;
  
  // Get current theme
  function getCurrentTheme() {
    return html.getAttribute('data-theme') || 'light';
  }
  
  // Apply theme
  function applyTheme(theme) {
    html.setAttribute('data-theme', theme);
  }
  
  // Listen for system color scheme changes
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
    // When system preference changes, clear manual override and follow system
    localStorage.removeItem('theme');
    applyTheme(e.matches ? 'dark' : 'light');
  });
  
  // Toggle between light and dark on click
  toggle.addEventListener('click', function(e) {
    e.preventDefault();
    const currentTheme = getCurrentTheme();
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    applyTheme(newTheme);
    localStorage.setItem('theme', newTheme);
  });
})();
