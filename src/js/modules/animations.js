// Animation utilities
export class AnimationUtils {
  static fadeIn(element, duration = 300) {
    element.style.opacity = '0';
    element.style.display = 'block';
    
    const start = performance.now();
    
    function fade(timestamp) {
      const elapsed = timestamp - start;
      const progress = elapsed / duration;
      
      if (progress < 1) {
        element.style.opacity = progress;
        requestAnimationFrame(fade);
      } else {
        element.style.opacity = '1';
      }
    }
    
    requestAnimationFrame(fade);
  }
  
  static slideUp(element, duration = 300) {
    element.style.transform = 'translateY(20px)';
    element.style.opacity = '0';
    element.style.display = 'block';
    
    const start = performance.now();
    
    function slide(timestamp) {
      const elapsed = timestamp - start;
      const progress = elapsed / duration;
      
      if (progress < 1) {
        const translateY = 20 * (1 - progress);
        element.style.transform = `translateY(${translateY}px)`;
        element.style.opacity = progress;
        requestAnimationFrame(slide);
      } else {
        element.style.transform = 'translateY(0)';
        element.style.opacity = '1';
      }
    }
    
    requestAnimationFrame(slide);
  }
}

// Intersection Observer for scroll animations
document.addEventListener('DOMContentLoaded', function() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate-fade-in');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);
  
  // Observe elements with animation classes
  document.querySelectorAll('.animate-on-scroll').forEach(el => {
    observer.observe(el);
  });
});