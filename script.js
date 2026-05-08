/* ═══════════════════════════════════════════════════════════════════
   KKMP KORPRI RAYA — script.js
   Koperasi Kelurahan Merah Putih, Kopri Raya, Sukarame, Bandar Lampung
═══════════════════════════════════════════════════════════════════ */

(function () {
  'use strict';

  /* ──────────────────────────────────────────
     1. NAVBAR — efek blur & border saat scroll
  ────────────────────────────────────────── */
  var navbar = document.getElementById('navbar');

  window.addEventListener('scroll', function () {
    navbar.classList.toggle('scrolled', window.scrollY > 20);
  }, { passive: true });


  /* ──────────────────────────────────────────
     2. HAMBURGER MENU — buka/tutup mobile menu
  ────────────────────────────────────────── */
  var hamburgerBtn = document.getElementById('hamburgerBtn');
  var mobileMenu   = document.getElementById('mobileMenu');

  hamburgerBtn.addEventListener('click', function () {
    var isOpen = mobileMenu.classList.toggle('open');
    hamburgerBtn.classList.toggle('active', isOpen);
    hamburgerBtn.setAttribute('aria-expanded', String(isOpen));
    // Cegah scroll body saat menu terbuka (opsional, nonaktif jika tidak diinginkan)
    document.body.style.overflow = isOpen ? 'hidden' : '';
  });

  // Tutup menu saat link diklik
  mobileMenu.querySelectorAll('.mobile-nav-link').forEach(function (link) {
    link.addEventListener('click', function () {
      mobileMenu.classList.remove('open');
      hamburgerBtn.classList.remove('active');
      hamburgerBtn.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    });
  });

  // Tutup menu saat klik di luar area menu
  document.addEventListener('click', function (e) {
    if (
      mobileMenu.classList.contains('open') &&
      !mobileMenu.contains(e.target) &&
      !hamburgerBtn.contains(e.target)
    ) {
      mobileMenu.classList.remove('open');
      hamburgerBtn.classList.remove('active');
      hamburgerBtn.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    }
  });


  /* ──────────────────────────────────────────
     3. SCROLL REVEAL — animasi muncul saat masuk viewport
  ────────────────────────────────────────── */
  var revealElements = document.querySelectorAll('.reveal, .reveal-stagger');

  if ('IntersectionObserver' in window) {
    var revealObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          revealObserver.unobserve(entry.target); // hanya trigger sekali
        }
      });
    }, {
      threshold: 0.12,
      rootMargin: '0px 0px -40px 0px'
    });

    revealElements.forEach(function (el) {
      revealObserver.observe(el);
    });
  } else {
    // Fallback untuk browser lama — langsung tampilkan semua
    revealElements.forEach(function (el) {
      el.classList.add('visible');
    });
  }


  /* ──────────────────────────────────────────
     4. ACTIVE NAV LINK — highlight menu sesuai section aktif
  ────────────────────────────────────────── */
  var sections  = document.querySelectorAll('section[id], footer[id]');
  var navLinks  = document.querySelectorAll('.nav-links a');

  function updateActiveLink() {
    var scrollY = window.scrollY + 90;

    sections.forEach(function (sec) {
      var top    = sec.offsetTop;
      var bottom = top + sec.offsetHeight;

      if (scrollY >= top && scrollY < bottom) {
        var targetHref = '#' + sec.id;

        navLinks.forEach(function (a) {
          // Reset semua (kecuali tombol CTA bergabung)
          if (!a.classList.contains('nav-cta')) {
            a.classList.remove('active');
          }
          if (a.getAttribute('href') === targetHref && !a.classList.contains('nav-cta')) {
            a.classList.add('active');
          }
        });
      }
    });
  }

  window.addEventListener('scroll', updateActiveLink, { passive: true });
  updateActiveLink(); // jalankan sekali saat halaman pertama dimuat


  /* ──────────────────────────────────────────
     5. LOGO FALLBACK — jika logo-kkmp.png tidak ada
        Tampilkan SVG ikon sebagai pengganti
  ────────────────────────────────────────── */
  var logoImgs = document.querySelectorAll('.logo-badge img, .emblem-logo-wrap img');

  logoImgs.forEach(function (img) {
    img.addEventListener('error', function () {
      // Sembunyikan gambar yang gagal
      this.style.display = 'none';

      // Tampilkan elemen fallback (SVG/emoji) dalam container yang sama
      var parent = this.parentElement;

      // Jika container adalah .logo-badge (navbar)
      if (parent.classList.contains('logo-badge')) {
        parent.style.background = 'var(--green)';
        var fallback = parent.querySelector('.logo-fallback-svg');
        if (fallback) {
          fallback.style.display = 'flex';
        }
      }

      // Jika container adalah .emblem-logo-wrap (hero panel)
      if (parent.classList.contains('emblem-logo-wrap')) {
        var emojiIcon = parent.querySelector('.emblem-icon-fallback');
        if (emojiIcon) {
          emojiIcon.style.display = 'flex';
        }
      }
    });
  });


  /* ──────────────────────────────────────────
     6. SMOOTH SCROLL — untuk browser yang belum
        mendukung scroll-behavior: smooth di CSS
  ────────────────────────────────────────── */
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      var targetId = this.getAttribute('href');
      if (targetId === '#') return;

      var target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        var offsetTop = target.getBoundingClientRect().top + window.scrollY - 72;
        window.scrollTo({ top: offsetTop, behavior: 'smooth' });
      }
    });
  });

})();