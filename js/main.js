/* ========================================
   Triple Eight Distillery — Main JS
   Vanilla JS, no dependencies except GSAP (CDN)
   ======================================== */

(function () {
  'use strict';

  /* ----- Age Gate ----- */
  const ageGate = document.getElementById('age-gate');
  const ageContent = document.getElementById('age-gate-content');
  const ageDenied = document.getElementById('age-denied');
  const ageYes = document.getElementById('age-yes');
  const ageNo = document.getElementById('age-no');

  if (ageGate) {
    if (sessionStorage.getItem('ageVerified') === 'true') {
      ageGate.classList.add('is-hidden');
    } else {
      document.body.style.overflow = 'hidden';
    }

    if (ageYes) {
      ageYes.addEventListener('click', function () {
        sessionStorage.setItem('ageVerified', 'true');
        ageGate.classList.add('is-hidden');
        document.body.style.overflow = '';
      });
    }

    if (ageNo) {
      ageNo.addEventListener('click', function () {
        if (ageContent) ageContent.classList.add('is-hidden');
        if (ageDenied) ageDenied.classList.add('is-visible');
      });
    }
  }

  /* ----- Mobile Nav Toggle ----- */
  const hamburger = document.getElementById('hamburger');
  const navMenu = document.getElementById('nav-menu');

  if (hamburger && navMenu) {
    hamburger.addEventListener('click', function () {
      const isOpen = navMenu.classList.toggle('is-open');
      hamburger.classList.toggle('is-active');
      hamburger.setAttribute('aria-expanded', isOpen);
      document.body.style.overflow = isOpen ? 'hidden' : '';
    });

    // Close menu when clicking a nav link
    navMenu.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        navMenu.classList.remove('is-open');
        hamburger.classList.remove('is-active');
        hamburger.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      });
    });
  }

  /* ----- GSAP Scroll Animations ----- */
  if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);

    // Reveal from bottom
    gsap.utils.toArray('.reveal').forEach(function (el) {
      gsap.fromTo(el,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 85%',
            once: true
          }
        }
      );
    });

    // Reveal from left
    gsap.utils.toArray('.reveal-left').forEach(function (el) {
      gsap.fromTo(el,
        { opacity: 0, x: -30 },
        {
          opacity: 1,
          x: 0,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 85%',
            once: true
          }
        }
      );
    });

    // Reveal from right
    gsap.utils.toArray('.reveal-right').forEach(function (el) {
      gsap.fromTo(el,
        { opacity: 0, x: 30 },
        {
          opacity: 1,
          x: 0,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 85%',
            once: true
          }
        }
      );
    });

    // Awards sticky image swap (thenotch page)
    var awardBlocks = document.querySelectorAll('.award-block');
    var awardImgs = document.querySelectorAll('.awards-img-col img');

    if (awardBlocks.length && awardImgs.length) {
      awardBlocks.forEach(function (block, i) {
        ScrollTrigger.create({
          trigger: block,
          start: 'top center',
          onEnter: function () {
            awardImgs.forEach(function (img, j) {
              img.style.opacity = j === i ? '1' : '0';
              img.style.transition = 'opacity 0.5s ease';
            });
          },
          onEnterBack: function () {
            awardImgs.forEach(function (img, j) {
              img.style.opacity = j === i ? '1' : '0';
              img.style.transition = 'opacity 0.5s ease';
            });
          }
        });
      });

      // Initially show first award image
      awardImgs.forEach(function (img, j) {
        img.style.opacity = j === 0 ? '1' : '0';
      });
    }
  }

  /* ----- Contact Form (Formspree) ----- */
  document.querySelectorAll('.contact-form').forEach(function (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var formData = new FormData(form);
      var successEl = form.querySelector('.form-success');
      var errorEl = form.querySelector('.form-error');

      fetch(form.action, {
        method: 'POST',
        body: formData,
        headers: { 'Accept': 'application/json' }
      }).then(function (response) {
        if (response.ok) {
          form.reset();
          if (successEl) successEl.style.display = 'block';
          if (errorEl) errorEl.style.display = 'none';
        } else {
          if (errorEl) errorEl.style.display = 'block';
          if (successEl) successEl.style.display = 'none';
        }
      }).catch(function () {
        if (errorEl) errorEl.style.display = 'block';
        if (successEl) successEl.style.display = 'none';
      });
    });
  });

})();
