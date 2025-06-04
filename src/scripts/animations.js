// Header scroll effect
function handleScroll() {
  const header = document.querySelector('header');
  const scrollPosition = window.scrollY;
  
  if (scrollPosition > 50) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }
}

// Reveal sections on scroll
function revealSections() {
  const sections = document.querySelectorAll('section');
  const windowHeight = window.innerHeight;
  
  sections.forEach(section => {
    const sectionTop = section.getBoundingClientRect().top;
    if (sectionTop < windowHeight - 150) {
      section.classList.add('visible');
    }
  });
}

// Implement smooth scrolling for anchor links
function setupSmoothScrolling() {
  document.querySelectorAll('a[href^="/#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      
      // Extract the target section id from the href
      const targetId = this.getAttribute('href').split('#')[1];
      const targetElement = document.getElementById(targetId);
      
      // If we're not on the homepage, navigate there first
      if (window.location.pathname !== '/') {
        window.location.href = `/#${targetId}`;
        return;
      }
      
      // If we're already on the homepage, scroll smoothly
      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 80, // Offset for header
          behavior: 'smooth'
        });
      }
    });
  });
}

// Add page transition effects
function setupPageTransitions() {
  // Add fade-in effect to the main content when page loads
  const mainContent = document.querySelector('main');
  if (mainContent) {
    mainContent.classList.add('fade-in');
  }
  
  // Add hover effects to all interactive elements
  document.querySelectorAll('a, button, .card, .info-card, .goal-card').forEach(element => {
    element.classList.add('interactive');
  });
}

// Add scroll indicator
function addScrollIndicator() {
  const scrollIndicator = document.createElement('div');
  scrollIndicator.className = 'scroll-indicator';
  document.body.appendChild(scrollIndicator);
  
  window.addEventListener('scroll', () => {
    const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (window.scrollY / windowHeight) * 100;
    scrollIndicator.style.width = scrolled + '%';
  });
}

// Initialize animations
function initAnimations() {
  // Add scroll event listeners
  window.addEventListener('scroll', handleScroll);
  window.addEventListener('scroll', revealSections);
  
  // Setup smooth scrolling
  setupSmoothScrolling();
  
  // Setup page transitions
  setupPageTransitions();
  
  // Add scroll indicator
  addScrollIndicator();
  
  // Initial check for sections in view
  revealSections();
  
  // Add animation classes to elements
  document.querySelectorAll('.card, .info-card, .goal-card').forEach((card, index) => {
    card.style.animationDelay = `${index * 0.1}s`;
  });
}

// Run when DOM is fully loaded
document.addEventListener('DOMContentLoaded', initAnimations);