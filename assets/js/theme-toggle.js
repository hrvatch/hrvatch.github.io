(function() {
  const toggle = document.getElementById('theme-toggle');
  if (!toggle) return; // Exit if toggle doesn't exist yet
  
  const icon = toggle.querySelector('i');
  const html = document.documentElement;
  
  // Get current theme (already set by inline script)
  function getCurrentTheme() {
    return html.getAttribute('data-theme') || 'light';
  }
  
  // Set theme
  function setTheme(newTheme) {
    html.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
  }
  
  // Toggle on click
  toggle.addEventListener('click', function(e) {
    e.preventDefault();
    const currentTheme = getCurrentTheme();
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
  });
})();
