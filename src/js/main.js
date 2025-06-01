// Import styles
import '../scss/main.scss';

// Import modules
import './modules/navigation';
import './modules/animations';

// Initialize app
document.addEventListener('DOMContentLoaded', function() {
    console.log('App initialized');
    
    // Add smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
});