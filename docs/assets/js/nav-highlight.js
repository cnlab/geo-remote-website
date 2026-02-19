(function() {
  'use strict';
  
  function initSecondaryNav() {
    var navLinks = document.querySelectorAll('.secondary-nav a[href^="#"]');
    
    if (!navLinks.length) return;
    
    // Get only the section IDs that are actually in the nav
    var navSectionIds = [];
    for (var i = 0; i < navLinks.length; i++) {
      var href = navLinks[i].getAttribute('href');
      if (href && href.length > 1) {
        navSectionIds.push(href.substring(1)); // Remove the # to get just the ID
      }
    }
    
    // Get only sections that have nav links
    var sections = [];
    for (var j = 0; j < navSectionIds.length; j++) {
      var section = document.getElementById(navSectionIds[j]);
      if (section) {
        sections.push(section);
      }
    }
    
    if (!sections.length) return;
    
    function highlightCurrentSection() {
      var scrollY = window.pageYOffset;
      var current = '';
      
      // Find the current section (only among sections in nav)
      for (var i = 0; i < sections.length; i++) {
        var section = sections[i];
        var sectionTop = section.offsetTop - 200;
        
        if (scrollY >= sectionTop) {
          current = section.getAttribute('id');
        }
      }
      
      // Update nav link highlighting
      for (var j = 0; j < navLinks.length; j++) {
        var link = navLinks[j];
        var href = link.getAttribute('href');
        
        link.classList.remove('active');
        
        if (href === '#' + current) {
          link.classList.add('active');
        }
      }
    }
    
    // Run on load
    highlightCurrentSection();
    
    // Run on scroll (throttled for performance)
    var scrollTimer;
    window.addEventListener('scroll', function() {
      if (scrollTimer) {
        window.cancelAnimationFrame(scrollTimer);
      }
      
      scrollTimer = window.requestAnimationFrame(function() {
        highlightCurrentSection();
      });
    });
  }
  
  // Initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initSecondaryNav);
  } else {
    initSecondaryNav();
  }
})();