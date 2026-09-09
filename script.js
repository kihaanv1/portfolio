/**
 * Bruce Leeo C. Gemilga - Portfolio Website Scripts
 * Features: Dark/Light Mode, Mobile Navigation, Project Filter, Form Validation, Smooth Scroll
 */

document.addEventListener('DOMContentLoaded', () => {
  // --------------------------------------------------------------------------
  // 1. Dark / Light Theme Toggle & Persistence
  // --------------------------------------------------------------------------
  const themeToggle = document.getElementById('themeToggle');
  const root = document.documentElement;

  // Retrieve saved theme or default to system preference (or dark)
  const savedTheme = localStorage.getItem('portfolio-theme');
  const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const initialTheme = savedTheme || (systemPrefersDark ? 'dark' : 'light');

  root.setAttribute('data-theme', initialTheme);

  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const currentTheme = root.getAttribute('data-theme');
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
      
      root.setAttribute('data-theme', newTheme);
      localStorage.setItem('portfolio-theme', newTheme);
    });
  }

  // --------------------------------------------------------------------------
  // 2. Mobile Hamburger Navigation
  // --------------------------------------------------------------------------
  const mobileMenuBtn = document.getElementById('mobileMenuBtn');
  const navMenu = document.getElementById('navMenu');
  const navLinks = document.querySelectorAll('.nav-item, .nav-btn');

  if (mobileMenuBtn && navMenu) {
    mobileMenuBtn.addEventListener('click', () => {
      mobileMenuBtn.classList.toggle('active');
      navMenu.classList.toggle('open');
    });

    // Close mobile menu when clicking any navigation link
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        mobileMenuBtn.classList.remove('active');
        navMenu.classList.remove('open');
      });
    });

    // Close when clicking outside of the navbar
    document.addEventListener('click', (e) => {
      if (!e.target.closest('#header') && navMenu.classList.contains('open')) {
        mobileMenuBtn.classList.remove('active');
        navMenu.classList.remove('open');
      }
    });
  }

  // --------------------------------------------------------------------------
  // 3. Active Nav Link on Scroll
  // --------------------------------------------------------------------------
  const sections = document.querySelectorAll('section[id]');

  const highlightNavOnScroll = () => {
    const scrollY = window.pageYOffset || document.documentElement.scrollTop;

    sections.forEach(current => {
      const sectionHeight = current.offsetHeight;
      const sectionTop = current.offsetTop - 120;
      const sectionId = current.getAttribute('id');
      const targetNav = document.querySelector(`.nav-links a[href*="${sectionId}"]`);

      if (targetNav) {
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
          targetNav.classList.add('active');
        } else {
          targetNav.classList.remove('active');
        }
      }
    });
  };

  window.addEventListener('scroll', highlightNavOnScroll, { passive: true });

  // --------------------------------------------------------------------------
  // 4. Project Category Filtering
  // --------------------------------------------------------------------------
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      // Toggle active class on filter buttons
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterValue = btn.getAttribute('data-filter');

      projectCards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filterValue === 'all' || category === filterValue) {
          card.style.display = 'flex';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          }, 10);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'translateY(10px)';
          setTimeout(() => {
            card.style.display = 'none';
          }, 200);
        }
      });
    });
  });

  // --------------------------------------------------------------------------
  // 5. Contact Form Validation & Submission Feedback
  // --------------------------------------------------------------------------
  const contactForm = document.getElementById('contactForm');
  const formToast = document.getElementById('formSuccessToast');
  const submitBtn = document.getElementById('submitBtn');

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const nameInput = document.getElementById('name');
      const emailInput = document.getElementById('email');
      const subjectInput = document.getElementById('subject');
      const messageInput = document.getElementById('message');

      const nameError = document.getElementById('nameError');
      const emailError = document.getElementById('emailError');
      const subjectError = document.getElementById('subjectError');
      const messageError = document.getElementById('messageError');

      let isValid = true;

      // Validate Name
      if (!nameInput.value.trim()) {
        nameError.textContent = 'Please enter your name.';
        isValid = false;
      } else {
        nameError.textContent = '';
      }

      // Validate Email
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailInput.value.trim()) {
        emailError.textContent = 'Please enter your email address.';
        isValid = false;
      } else if (!emailPattern.test(emailInput.value.trim())) {
        emailError.textContent = 'Please enter a valid email address.';
        isValid = false;
      } else {
        emailError.textContent = '';
      }

      // Validate Subject
      if (!subjectInput.value.trim()) {
        subjectError.textContent = 'Please provide a subject.';
        isValid = false;
      } else {
        subjectError.textContent = '';
      }

      // Validate Message
      if (!messageInput.value.trim()) {
        messageError.textContent = 'Please enter your message.';
        isValid = false;
      } else if (messageInput.value.trim().length < 10) {
        messageError.textContent = 'Message should be at least 10 characters long.';
        isValid = false;
      } else {
        messageError.textContent = '';
      }

      if (!isValid) return;

      // Update button to sending state
      const originalBtnText = submitBtn.innerHTML;
      submitBtn.disabled = true;
      submitBtn.innerHTML = `<span>Sending directly to Bruce...</span>`;

      // Send message payload directly to Bruce's email via FormSubmit API
      fetch('https://formsubmit.co/ajax/bruceleeogemilga@gmail.com', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          name: nameInput.value.trim(),
          email: emailInput.value.trim(),
          subject: subjectInput.value.trim(),
          message: messageInput.value.trim(),
          _template: 'table'
        })
      })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(() => {
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalBtnText;

        // Display success toast notification
        if (formToast) {
          formToast.classList.remove('hidden');
          setTimeout(() => {
            formToast.classList.add('hidden');
          }, 6000);
        }

        // Reset form fields
        contactForm.reset();
      })
      .catch(error => {
        console.warn('FormSubmit AJAX fallback:', error);
        // Fallback: submit natively via form or mailto
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalBtnText;

        const fallbackMailto = `mailto:bruceleeogemilga@gmail.com?subject=${encodeURIComponent(subjectInput.value)}&body=${encodeURIComponent("Name: " + nameInput.value + "\nEmail: " + emailInput.value + "\n\nMessage:\n" + messageInput.value)}`;
        window.location.href = fallbackMailto;

        if (formToast) {
          formToast.classList.remove('hidden');
          setTimeout(() => {
            formToast.classList.add('hidden');
          }, 6000);
        }
        contactForm.reset();
      });
    });
  }

  // --------------------------------------------------------------------------
  // 6. Back to Top Button
  // --------------------------------------------------------------------------
  const backToTopBtn = document.getElementById('backToTop');

  if (backToTopBtn) {
    window.addEventListener('scroll', () => {
      if (window.pageYOffset > 300) {
        backToTopBtn.style.opacity = '1';
        backToTopBtn.style.pointerEvents = 'auto';
      } else {
        backToTopBtn.style.opacity = '0.5';
      }
    }, { passive: true });

    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

  // --------------------------------------------------------------------------
  // 7. Dynamic Footer Year
  // --------------------------------------------------------------------------
  const yearElement = document.getElementById('currentYear');
  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }
});
