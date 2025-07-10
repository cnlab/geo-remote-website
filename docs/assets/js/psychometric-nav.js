// Simple psychometric navigation highlighting for GitHub Pages
(function() {
  'use strict';
  
  function initPsychometricNav() {
    var sections = document.querySelectorAll('h2[id]');
    var navLinks = document.querySelectorAll('.psychometric-nav a[data-section]');
    
    if (!sections.length || !navLinks.length) return;
    
    function highlightCurrentSection() {
      var scrollY = window.pageYOffset;
      var current = '';
      
      for (var i = 0; i < sections.length; i++) {
        var section = sections[i];
        var sectionTop = section.offsetTop - 200;
        
        if (scrollY >= sectionTop) {
          current = section.getAttribute('id');
        }
      }
      
      for (var j = 0; j < navLinks.length; j++) {
        var link = navLinks[j];
        link.classList.remove('active');
        
        if (link.getAttribute('data-section') === current) {
          link.classList.add('active');
        }
      }
    }
    
    // Run on load
    highlightCurrentSection();
    
    // Run on scroll
    window.addEventListener('scroll', function() {
      highlightCurrentSection();
    });
  }
  
  // Initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initPsychometricNav);
  } else {
    initPsychometricNav();
  }
})();