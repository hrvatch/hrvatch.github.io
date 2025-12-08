document.addEventListener('DOMContentLoaded', function() {
  const searchToggle = document.querySelector('.search-toggle');
  const searchOverlay = document.getElementById('search-overlay');
  const searchClose = document.getElementById('search-close');
  const searchBox = document.getElementById('search-box');
  
  // Detect if mobile
  const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
  
  // Open search overlay
  searchToggle.addEventListener('click', function(e) {
    e.preventDefault();
    searchOverlay.classList.add('active');
    
    // Clear the search box
    searchBox.value = '';
    
    // Prevent body scroll on mobile
    document.body.style.overflow = 'hidden';
    
    // Delay autofocus on mobile to avoid keyboard jump
    if (isMobile) {
      setTimeout(() => searchBox.focus(), 300);
    } else {
      setTimeout(() => searchBox.focus(), 100);
    }
  });
  
  // Close search overlay
  function closeSearch() {
    searchOverlay.classList.remove('active');
    document.body.style.overflow = ''; // Restore body scroll
    searchBox.blur(); // Hide keyboard on mobile
  }
  
  searchClose.addEventListener('click', closeSearch);
  
  // Close on overlay click (outside search box)
  searchOverlay.addEventListener('click', function(e) {
    if (e.target === searchOverlay) {
      closeSearch();
    }
  });
  
  // Close on Escape key
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && searchOverlay.classList.contains('active')) {
      closeSearch();
    }
  });
  
  // Handle iOS viewport resize when keyboard appears
  if (isMobile) {
    let initialHeight = window.innerHeight;
    window.addEventListener('resize', function() {
      // If height decreased significantly, keyboard probably opened
      if (window.innerHeight < initialHeight - 150) {
        searchOverlay.style.paddingTop = '5vh';
      } else {
        searchOverlay.style.paddingTop = '10vh';
      }
    });
  }
});
