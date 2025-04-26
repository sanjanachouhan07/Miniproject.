document.addEventListener('DOMContentLoaded', function() {
    // Mobile Menu Toggle
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    
    if (hamburger) {
      hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navLinks.classList.toggle('active');
      });
    }
    
    // FAQ Accordion
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
      const question = item.querySelector('.faq-question');
      
      if (question) {
        question.addEventListener('click', () => {
          // Close other items
          faqItems.forEach(otherItem => {
            if (otherItem !== item) {
              otherItem.classList.remove('active');
              otherItem.querySelector('.faq-question').classList.remove('active');
            }
          });
          
          // Toggle current item
          item.classList.toggle('active');
          question.classList.toggle('active');
        });
      }
    });
    
    // Newsletter Form
    const newsletterForm = document.getElementById('newsletter-form');
    
    if (newsletterForm) {
      newsletterForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const emailInput = this.querySelector('input[type="email"]');
        
        if (emailInput && emailInput.value) {
          alert(`Thank you for subscribing with ${emailInput.value}! You'll receive updates about Ludhiana soon.`);
          emailInput.value = '';
        }
      });
    }
    
    // Contact Form
    const contactForm = document.getElementById('contact-form');
    
    if (contactForm) {
      contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const nameInput = document.getElementById('name');
        const emailInput = document.getElementById('email');
        const messageInput = document.getElementById('message');
        
        if (nameInput && emailInput && messageInput) {
          alert(`Thank you ${nameInput.value} for your message! We'll get back to you at ${emailInput.value} as soon as possible.`);
          contactForm.reset();
        }
      });
    }
    
    // Attractions Filter
    const filterBtns = document.querySelectorAll('.filter-btn');
    const attractionCards = document.querySelectorAll('.attraction-card');
    const searchInput = document.getElementById('search-attractions');
    
    // Filter by category
    if (filterBtns.length > 0 && attractionCards.length > 0) {
      filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
          // Remove active class from all buttons
          filterBtns.forEach(btn => btn.classList.remove('active'));
          
          // Add active class to clicked button
          btn.classList.add('active');
          
          const filterValue = btn.getAttribute('data-filter');
          
          attractionCards.forEach(card => {
            if (filterValue === 'all') {
              card.style.display = 'block';
            } else {
              if (card.getAttribute('data-category') === filterValue) {
                card.style.display = 'block';
              } else {
                card.style.display = 'none';
              }
            }
          });
        });
      });
    }
    
    // Search functionality
    if (searchInput && attractionCards.length > 0) {
      searchInput.addEventListener('keyup', function() {
        const searchTerm = this.value.toLowerCase();
        
        attractionCards.forEach(card => {
          const title = card.querySelector('h3').textContent.toLowerCase();
          const description = card.querySelector('p').textContent.toLowerCase();
          
          if (title.includes(searchTerm) || description.includes(searchTerm)) {
            card.style.display = 'block';
          } else {
            card.style.display = 'none';
          }
        });
        
        // Reset category filter when searching
        filterBtns.forEach(btn => btn.classList.remove('active'));
        document.querySelector('.filter-btn[data-filter="all"]').classList.add('active');
      });
    }
    
    // Testimonials scrolling (auto-scroll after a few seconds)
    const testimonialSlider = document.querySelector('.testimonials-slider');
    let scrollInterval;
    
    if (testimonialSlider) {
      const startAutoScroll = () => {
        scrollInterval = setInterval(() => {
          testimonialSlider.scrollLeft += 1;
          
          if (testimonialSlider.scrollLeft >= (testimonialSlider.scrollWidth - testimonialSlider.clientWidth)) {
            testimonialSlider.scrollLeft = 0;
          }
        }, 30);
      };
      
      // Start auto-scroll after 3 seconds
      setTimeout(startAutoScroll, 3000);
      
      // Pause auto-scroll when user interacts with the slider
      testimonialSlider.addEventListener('mouseenter', () => {
        clearInterval(scrollInterval);
      });
      
      testimonialSlider.addEventListener('mouseleave', () => {
        startAutoScroll();
      });
    }
    
    // Lazy load images for better performance
    const lazyLoadImages = () => {
      const images = document.querySelectorAll('img[data-src]');
      
      images.forEach(img => {
        img.setAttribute('src', img.getAttribute('data-src'));
        img.onload = () => {
          img.removeAttribute('data-src');
        };
      });
    };
    
    if ('IntersectionObserver' in window) {
      const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const image = entry.target;
            image.src = image.dataset.src;
            observer.unobserve(image);
          }
        });
      });
      
      const lazyImages = document.querySelectorAll('img[data-src]');
      lazyImages.forEach(img => imageObserver.observe(img));
    } else {
      lazyLoadImages();
    }
  });
  