(function() {
  const toggle = document.getElementById('theme-toggle');
  if (!toggle) return; // Exit if toggle doesn't exist yet
  
  const icon = toggle.querySelector('i');
  const html = document.documentElement;
  
  // Get current theme (already set by inline script)
  function getCurrentTheme() {
    return html.getAttribute('data-theme') || 'light';
  }
  
  // Update icon to match current theme
  function updateIcon(theme) {
    icon.className = theme === 'light' ? 'fas fa-moon' : 'fas fa-sun';
  }
  
  // Set theme
  function setTheme(newTheme) {
    html.setAttribute('data-theme', newTheme);
    updateIcon(newTheme);
    localStorage.setItem('theme', newTheme);
  }
  
  // Initialize icon based on current theme
  updateIcon(getCurrentTheme());
  
  // Toggle on click
  toggle.addEventListener('click', function(e) {
    e.preventDefault();
    const currentTheme = getCurrentTheme();
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
  });
})();
