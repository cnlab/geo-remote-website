// Protocol page navigation highlighting
document.addEventListener('DOMContentLoaded', function() {
  const sections = document.querySelectorAll('h2[id]');
  const navLinks = document.querySelectorAll('.protocol-nav a[data-section]');
  
  if (sections.length === 0 || navLinks.length === 0) {
    return; // Exit if elements don't exist
  }
  
  function highlightSection() {
    let currentSection = '';
    const scrollPos = window.scrollY + 150; // Offset for better detection
    
    // Find which section we're currently in
    sections.forEach(function(section, index) {
      const sectionTop = section.offsetTop;
      const nextSection = sections[index + 1];
      const sectionBottom = nextSection ? nextSection.offsetTop : document.body.scrollHeight;
      
      if (scrollPos >= sectionTop && scrollPos < sectionBottom) {
        currentSection = section.id;
      }
    });
    
    // If we're at the very top, highlight the first section
    if (scrollPos < sections[0].offsetTop + 150) {
      currentSection = sections[0].id;
    }
    
    // Update navigation highlights
    navLinks.forEach(function(link) {
      link.classList.remove('active');
      if (link.dataset.section === currentSection) {
        link.classList.add('active');
      }
    });
  }
  
  // Initial highlight
  highlightSection();
  
  // Highlight on scroll
  window.addEventListener('scroll', highlightSection);
  
  // Optional: Throttle scroll events for better performance
  let ticking = false;
  function throttledHighlight() {
    if (!ticking) {
      requestAnimationFrame(function() {
        highlightSection();
        ticking = false;
      });
      ticking = true;
    }
  }
  
  window.addEventListener('scroll', throttledHighlight);
});