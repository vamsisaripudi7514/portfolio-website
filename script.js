// Modern Portfolio - Vamsi Saripudi
// Enhanced JavaScript for smooth interactions and animations

document.addEventListener('DOMContentLoaded', () => {
  // Update footer year dynamically
  const yearElement = document.getElementById('year');
  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }

  // Smooth scroll for navigation links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        const headerOffset = 80;
        const elementPosition = target.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });

        // Close mobile menu after clicking
        const navToggle = document.getElementById('nav-toggle');
        if (navToggle && navToggle.checked) {
          navToggle.checked = false;
        }
      }
    });
  });

  // Header scroll effect
  let lastScroll = 0;
  const header = document.querySelector('header');

  window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    // Add shadow on scroll
    if (currentScroll > 10) {
      header.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.1)';
    } else {
      header.style.boxShadow = 'none';
    }

    lastScroll = currentScroll;
  });

  // Intersection Observer for fade-in animations
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, observerOptions);

  // Observe all section elements
  document.querySelectorAll('.section').forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(30px)';
    section.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
    observer.observe(section);
  });

  // Card hover effect with 3D tilt
  const cards = document.querySelectorAll('.project-card, .cert-card, .education-card, .contact-card');
  
  cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      
      const rotateX = (y - centerY) / 20;
      const rotateY = (centerX - x) / 20;
      
      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
    });
    
    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
  });

  // Typing effect for hero subtitle (optional enhancement)
  const subtitle = document.querySelector('.hero-subtitle');
  if (subtitle && subtitle.dataset.type === 'true') {
    const text = subtitle.textContent;
    subtitle.textContent = '';
    let i = 0;
    
    const typeWriter = () => {
      if (i < text.length) {
        subtitle.textContent += text.charAt(i);
        i++;
        setTimeout(typeWriter, 50);
      }
    };
    
    setTimeout(typeWriter, 500);
  }

  // Parallax effect for hero background
  const heroBg = document.querySelector('.hero-bg');
  if (heroBg) {
    window.addEventListener('scroll', () => {
      const scrolled = window.pageYOffset;
      heroBg.style.transform = `translateY(${scrolled * 0.5}px)`;
    });
  }

  // Add active state to navigation links based on scroll position
  const sections = document.querySelectorAll('.section[id]');
  const navLinks = document.querySelectorAll('.nav-links a[href^="#"]');

  const setActiveNav = () => {
    const scrollY = window.pageYOffset;

    sections.forEach(section => {
      const sectionHeight = section.offsetHeight;
      const sectionTop = section.offsetTop - 100;
      const sectionId = section.getAttribute('id');

      if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
        navLinks.forEach(link => {
          link.style.color = '';
          link.style.backgroundColor = '';
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.style.color = 'var(--color-text)';
            link.style.backgroundColor = 'rgba(99, 102, 241, 0.1)';
          }
        });
      }
    });
  };

  window.addEventListener('scroll', setActiveNav);

  // Skill tags animation on hover
  const skillTags = document.querySelectorAll('.skill-tag');
  skillTags.forEach(tag => {
    tag.addEventListener('mouseenter', function() {
      this.style.transform = 'translateY(-2px) scale(1.05)';
    });
    tag.addEventListener('mouseleave', function() {
      this.style.transform = '';
    });
  });

  // Stats counter animation
  const stats = document.querySelectorAll('.stat-number');
  const animateCount = (element, target) => {
    const duration = 2000;
    const increment = target / (duration / 16);
    let current = 0;
    
    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        element.textContent = target;
        clearInterval(timer);
      } else {
        element.textContent = Math.floor(current);
      }
    }, 16);
  };

  const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !entry.target.dataset.animated) {
        const target = parseFloat(entry.target.textContent);
        if (!isNaN(target)) {
          entry.target.dataset.animated = 'true';
          animateCount(entry.target, target);
        }
      }
    });
  }, { threshold: 0.5 });

  stats.forEach(stat => statsObserver.observe(stat));

  // Add copy email functionality
  const emailLinks = document.querySelectorAll('a[href^="mailto:"]');
  emailLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      const email = this.getAttribute('href').replace('mailto:', '');
      
      if (navigator.clipboard) {
        navigator.clipboard.writeText(email).then(() => {
          // Show toast notification (you can implement a toast component)
          console.log('Email copied to clipboard!');
        });
      }
    });
  });

  // Preload images for better performance
  const images = document.querySelectorAll('img[data-src]');
  const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src;
        img.removeAttribute('data-src');
        imageObserver.unobserve(img);
      }
    });
  });

  images.forEach(img => imageObserver.observe(img));

  // Easter egg: Konami code
  const konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
  let konamiIndex = 0;

  document.addEventListener('keydown', (e) => {
    if (e.key === konamiCode[konamiIndex]) {
      konamiIndex++;
      if (konamiIndex === konamiCode.length) {
        // Activate easter egg
        document.body.style.animation = 'rainbow 2s infinite';
        setTimeout(() => {
          document.body.style.animation = '';
        }, 5000);
        konamiIndex = 0;
      }
    } else {
      konamiIndex = 0;
    }
  });

  // Add loading animation complete
  setTimeout(() => {
    document.body.classList.add('loaded');
  }, 100);

  // Performance: Debounce scroll events
  function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  }

  // Apply debounce to scroll-heavy operations
  const debouncedScroll = debounce(() => {
    // Add any additional scroll-based operations here
  }, 10);

  window.addEventListener('scroll', debouncedScroll);

  // Console message for recruiters
  console.log(
    '%cHello there! 👋',
    'font-size: 24px; font-weight: bold; color: #6366f1;'
  );
  console.log(
    '%cI see you\'re checking out the console. Feel free to explore the code!',
    'font-size: 14px; color: #a1a1aa;'
  );
  console.log(
    '%cInterested in working together? Reach out at vamsi7514us@gmail.com',
    'font-size: 14px; color: #22d3ee;'
  );
});

// Service Worker registration for PWA (optional)
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    // Uncomment to enable service worker
    // navigator.serviceWorker.register('/sw.js').then(
    //   registration => console.log('ServiceWorker registered'),
    //   err => console.log('ServiceWorker registration failed')
    // );
  });
}

// Add rainbow animation for easter egg
const style = document.createElement('style');
style.textContent = `
  @keyframes rainbow {
    0% { filter: hue-rotate(0deg); }
    100% { filter: hue-rotate(360deg); }
  }
`;
document.head.appendChild(style);
