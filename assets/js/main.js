/* Main Apps Trust — behaviour: theme, language, nav, reveal, lightbox. */
(function () {
  'use strict';

  var STORE_THEME = 'mat:theme';
  var STORE_LANG = 'mat:lang';
  var DEFAULT_LANG = 'ca';
  var root = document.documentElement;

  /* ---------------------------------------------------------------- theme */
  function applyTheme(theme) {
    root.setAttribute('data-theme', theme);
    var btn = document.querySelector('[data-theme-toggle]');
    if (btn) {
      btn.setAttribute('aria-pressed', String(theme === 'light'));
      btn.setAttribute('aria-label', theme === 'light' ? 'Tema fosc' : 'Tema clar');
    }
  }

  function initTheme() {
    var saved = null;
    try {
      saved = localStorage.getItem(STORE_THEME);
    } catch (e) {}
    applyTheme(saved === 'light' ? 'light' : 'dark');

    document.querySelectorAll('[data-theme-toggle]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var next = root.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
        applyTheme(next);
        try {
          localStorage.setItem(STORE_THEME, next);
        } catch (e) {}
      });
    });
  }

  /* ------------------------------------------------------------- language */
  function getLang() {
    var saved = null;
    try {
      saved = localStorage.getItem(STORE_LANG);
    } catch (e) {}
    if (saved && window.LOCALES[saved]) return saved;
    var nav = (navigator.language || DEFAULT_LANG).slice(0, 2).toLowerCase();
    return window.LOCALES[nav] ? nav : DEFAULT_LANG;
  }

  function t(lang, key) {
    var dict = window.LOCALES[lang] || {};
    return dict[key] != null ? dict[key] : key;
  }

  function memberMarkup(text) {
    var lines = text.split('\n').map(function (l) {
      return l.trim();
    }).filter(Boolean);
    var nick = lines.shift() || '';
    var items = lines.map(function (l) {
      return l.replace(/^[-•]\s*/, '');
    });
    var role = items.shift() || '';
    return (
      '<span class="member__nick">' + nick + '</span>' +
      '<p class="member__role">' + role + '</p>' +
      '<ul class="member__list">' +
      items.map(function (i) {
        return '<li>' + i + '</li>';
      }).join('') +
      '</ul>'
    );
  }

  function paragraphs(text) {
    return text.split(/\n{2,}/).map(function (p) {
      return '<p>' + p.replace(/\n/g, '<br>') + '</p>';
    }).join('');
  }

  function applyLanguage(lang) {
    var dict = window.LOCALES[lang] || window.LOCALES[DEFAULT_LANG];
    root.setAttribute('lang', (window.LOCALE_META[lang] || {}).htmlLang || lang);

    document.querySelectorAll('[data-i18n]').forEach(function (el) {
      var key = el.getAttribute('data-i18n');
      var value = dict[key];
      if (value == null) return;
      var format = el.getAttribute('data-i18n-format');

      if (format === 'member') {
        el.innerHTML = memberMarkup(value);
      } else if (format === 'blocks') {
        el.innerHTML = paragraphs(value);
      } else if (format === 'lines') {
        el.innerHTML = value.split('\n').map(function (l) {
          return '<p>' + l.replace(/^[-•]\s*/, '') + '</p>';
        }).join('');
      } else {
        el.textContent = value;
      }
    });

    document.querySelectorAll('[data-i18n-attr]').forEach(function (el) {
      var spec = el.getAttribute('data-i18n-attr').split(':');
      var value = dict[spec[1]];
      if (value != null) el.setAttribute(spec[0], value);
    });

    document.querySelectorAll('[data-lang], [data-lang-link]').forEach(function (btn) {
      var code = btn.getAttribute('data-lang') || btn.getAttribute('data-lang-link');
      btn.setAttribute('aria-checked', String(code === lang));
    });

    document.querySelectorAll('[data-lang-label]').forEach(function (el) {
      el.textContent = (window.LOCALE_META[lang] || {}).label || lang.toUpperCase();
    });

    try {
      localStorage.setItem(STORE_LANG, lang);
    } catch (e) {}
  }

  function syncLangState(lang) {
    document.querySelectorAll('[data-lang], [data-lang-link]').forEach(function (btn) {
      var code = btn.getAttribute('data-lang') || btn.getAttribute('data-lang-link');
      btn.setAttribute('aria-checked', String(code === lang));
    });
  }

  function initLanguage() {
    // Pages that are statically translated (/es/) carry data-lang-lock and must
    // not be overwritten by the client-side switcher on load.
    var locked = root.getAttribute('data-lang-lock');
    if (locked) {
      syncLangState(locked);
    } else {
      applyLanguage(getLang());
    }

    document.querySelectorAll('[data-lang]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var next = btn.getAttribute('data-lang');
        applyLanguage(next);
        document.querySelectorAll('.lang').forEach(function (l) {
          l.classList.remove('is-open');
        });
      });
    });

    document.querySelectorAll('[data-lang-toggle]').forEach(function (btn) {
      btn.addEventListener('click', function (e) {
        e.stopPropagation();
        var box = btn.closest('.lang');
        if (box) box.classList.toggle('is-open');
      });
    });

    document.addEventListener('click', function (e) {
      if (!e.target.closest('.lang')) {
        document.querySelectorAll('.lang').forEach(function (l) {
          l.classList.remove('is-open');
        });
      }
    });
  }

  /* ----------------------------------------------------------------- nav */
  function initHeader() {
    var header = document.querySelector('.site-header');
    if (header) {
      var onScroll = function () {
        header.classList.toggle('is-stuck', window.scrollY > 8);
      };
      onScroll();
      window.addEventListener('scroll', onScroll, { passive: true });
    }

    var burger = document.querySelector('[data-burger]');
    var drawer = document.querySelector('.drawer');
    if (burger && drawer) {
      burger.addEventListener('click', function () {
        var open = drawer.classList.toggle('is-open');
        burger.setAttribute('aria-expanded', String(open));
      });
      drawer.querySelectorAll('a').forEach(function (a) {
        a.addEventListener('click', function () {
          drawer.classList.remove('is-open');
          burger.setAttribute('aria-expanded', 'false');
        });
      });
    }
  }

  function initActiveNav() {
    var links = document.querySelectorAll('.nav__link[href^="#"], .subnav .nav__link[href^="#"]');
    if (!links.length) return;

    var map = {};
    links.forEach(function (link) {
      map[link.getAttribute('href').slice(1)] = link;
    });

    var sections = Object.keys(map)
      .map(function (id) {
        return document.getElementById(id);
      })
      .filter(Boolean);

    if (!sections.length) return;

    var active = new Set();
    var order = Object.keys(map);

    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) active.add(entry.target.id);
          else active.delete(entry.target.id);
        });

        links.forEach(function (l) {
          l.removeAttribute('aria-current');
        });

        // first visible section in nav order, else back to the first link
        var id = order.filter(function (key) {
          return active.has(key);
        })[0];
        var link = map[id] || map[order[0]];
        if (link) link.setAttribute('aria-current', 'true');
      },
      { rootMargin: '-45% 0px -50% 0px' }
    );

    sections.forEach(function (s) {
      observer.observe(s);
    });
  }

  /* -------------------------------------------------------------- reveal */
  function initReveal() {
    var items = document.querySelectorAll('.reveal');
    if (!items.length) return;

    if (!('IntersectionObserver' in window)) {
      items.forEach(function (el) {
        el.classList.add('is-visible');
      });
      return;
    }

    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { rootMargin: '0px 0px -12% 0px', threshold: 0.12 }
    );

    items.forEach(function (el, i) {
      el.style.transitionDelay = Math.min(i % 3, 2) * 70 + 'ms';
      observer.observe(el);
    });

    // Safety net: never leave content invisible if the observer misses it.
    setTimeout(function () {
      items.forEach(function (el) {
        if (el.getBoundingClientRect().top < window.innerHeight * 2.5) {
          el.classList.add('is-visible');
        }
      });
    }, 1400);
  }

  /* ------------------------------------------------------------ to top */
  function initToTop() {
    var btn = document.querySelector('.to-top');
    if (!btn) return;
    var onScroll = function () {
      btn.classList.toggle('is-visible', window.scrollY > 640);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    btn.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  /* ----------------------------------------------------------- lightbox */
  function initLightbox() {
    var box = document.querySelector('.lightbox');
    if (!box) return;
    var img = box.querySelector('img');
    var close = box.querySelector('.lightbox__close');

    document.querySelectorAll('.shot').forEach(function (shot) {
      shot.addEventListener('click', function () {
        var source = shot.querySelector('img');
        if (!source) return;
        img.src = source.getAttribute('src');
        img.alt = source.getAttribute('alt') || '';
        box.classList.add('is-open');
        document.body.style.overflow = 'hidden';
      });
    });

    function hide() {
      box.classList.remove('is-open');
      document.body.style.overflow = '';
    }

    close.addEventListener('click', hide);
    box.addEventListener('click', function (e) {
      if (e.target === box) hide();
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && box.classList.contains('is-open')) hide();
    });
  }

  /* --------------------------------------------------------- app cards */
  function paintAppCards() {
    document.querySelectorAll('[data-app]').forEach(function (card) {
      var app = (window.APPS || []).find(function (a) {
        return a.id === card.getAttribute('data-app');
      });
      if (!app) return;
      card.style.setProperty('--accent', app.accent);
      card.style.setProperty('--accent-2', app.accent2);
      card.style.setProperty('--card-ink', app.ink);
    });
  }

  function initYear() {
    document.querySelectorAll('[data-year]').forEach(function (el) {
      el.textContent = new Date().getFullYear();
    });
  }

  document.addEventListener('DOMContentLoaded', function () {
    initTheme();
    initLanguage();
    initHeader();
    initActiveNav();
    initReveal();
    initToTop();
    initLightbox();
    paintAppCards();
    initYear();
  });
})();
