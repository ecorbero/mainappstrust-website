/* Cookie consent — inert until switched on.
 *
 * When you add analytics, set ENABLED = true below and wire the loader:
 *
 *   MainAppsConsent.loadIfConsented('analytics', function () {
 *     // inject your GA / Plausible / pixel snippet here
 *   });
 *
 * The site itself uses no cookies; only the theme preference is stored locally
 * and it needs no consent. Until ENABLED is true this file does nothing except
 * expose the API, so nothing is shown and nothing is stored.
 */
(function () {
  'use strict';

  var CONFIG = {
    ENABLED: false,          // <-- flip to true when you add trackers
    VERSION: '1',            // bump when you change categories or vendors
    STORAGE_KEY: 'mat:consent',
    CATEGORIES: ['analytics', 'marketing'],
  };

  var T = {
    en: {
      title: 'Cookies and privacy',
      body: 'We do not use cookies today. If we add analytics later, it will only run with your permission. You can change your choice whenever you like.',
      accept: 'Accept all', reject: 'Reject all', prefs: 'Preferences',
      save: 'Save choices', settings: 'Cookie settings', close: 'Close',
      necessary: 'Necessary',
      necessaryDesc: 'Required for the site to work (theme, language). Always on.',
      analytics: 'Analytics', analyticsDesc: 'Anonymous statistics about how the site is used.',
      marketing: 'Marketing', marketingDesc: 'Measuring campaigns and ads.',
      legal: 'More in the legal notice',
    },
    ca: {
      title: 'Galetes i privacitat',
      body: 'Avui no fem servir galetes. Si més endavant afegim analítica, només funcionarà amb el teu permís. Pots canviar la tria quan vulguis.',
      accept: 'Accepta-ho tot', reject: 'Rebutja-ho tot', prefs: 'Preferències',
      save: 'Desa la tria', settings: 'Configuració de galetes', close: 'Tanca',
      necessary: 'Necessàries',
      necessaryDesc: 'Imprescindibles perquè el lloc funcioni (tema, idioma). Sempre actives.',
      analytics: 'Analítica', analyticsDesc: "Estadístiques anònimes sobre com s'utilitza el lloc.",
      marketing: 'Màrqueting', marketingDesc: 'Mesura de campanyes i anuncis.',
      legal: "Més informació a l'avís legal",
    },
    es: {
      title: 'Cookies y privacidad',
      body: 'Hoy no usamos cookies. Si más adelante añadimos analítica, solo funcionará con tu permiso. Puedes cambiar tu elección cuando quieras.',
      accept: 'Aceptar todo', reject: 'Rechazar todo', prefs: 'Preferencias',
      save: 'Guardar elección', settings: 'Configuración de cookies', close: 'Cerrar',
      necessary: 'Necesarias',
      necessaryDesc: 'Imprescindibles para que el sitio funcione (tema, idioma). Siempre activas.',
      analytics: 'Analítica', analyticsDesc: 'Estadísticas anónimas sobre cómo se usa el sitio.',
      marketing: 'Marketing', marketingDesc: 'Medición de campañas y anuncios.',
      legal: 'Más información en el aviso legal',
    },
    de: {
      title: 'Cookies und Datenschutz',
      body: 'Derzeit verwenden wir keine Cookies. Sollten wir später Analytics einsetzen, läuft es nur mit deiner Erlaubnis. Du kannst deine Wahl jederzeit ändern.',
      accept: 'Alle akzeptieren', reject: 'Alle ablehnen', prefs: 'Einstellungen',
      save: 'Auswahl speichern', settings: 'Cookie-Einstellungen', close: 'Schließen',
      necessary: 'Notwendig',
      necessaryDesc: 'Erforderlich, damit die Website funktioniert (Design, Sprache). Immer aktiv.',
      analytics: 'Analyse', analyticsDesc: 'Anonyme Statistiken zur Nutzung der Website.',
      marketing: 'Marketing', marketingDesc: 'Messung von Kampagnen und Anzeigen.',
      legal: 'Mehr im Impressum',
    },
    fr: {
      title: 'Cookies et confidentialité',
      body: "Nous n'utilisons pas de cookies aujourd'hui. Si nous ajoutons une mesure d'audience, elle ne s'activera qu'avec votre accord. Vous pouvez changer d'avis à tout moment.",
      accept: 'Tout accepter', reject: 'Tout refuser', prefs: 'Préférences',
      save: 'Enregistrer', settings: 'Paramètres des cookies', close: 'Fermer',
      necessary: 'Nécessaires',
      necessaryDesc: 'Indispensables au fonctionnement du site (thème, langue). Toujours actifs.',
      analytics: "Mesure d'audience", analyticsDesc: "Statistiques anonymes sur l'utilisation du site.",
      marketing: 'Marketing', marketingDesc: 'Mesure des campagnes et publicités.',
      legal: 'En savoir plus dans les mentions légales',
    },
    it: {
      title: 'Cookie e privacy',
      body: 'Oggi non usiamo cookie. Se in futuro aggiungeremo analitiche, funzioneranno solo con il tuo consenso. Puoi cambiare scelta in qualsiasi momento.',
      accept: 'Accetta tutto', reject: 'Rifiuta tutto', prefs: 'Preferenze',
      save: 'Salva scelta', settings: 'Impostazioni cookie', close: 'Chiudi',
      necessary: 'Necessari',
      necessaryDesc: 'Indispensabili al funzionamento del sito (tema, lingua). Sempre attivi.',
      analytics: 'Analitica', analyticsDesc: "Statistiche anonime sull'uso del sito.",
      marketing: 'Marketing', marketingDesc: 'Misurazione di campagne e annunci.',
      legal: 'Maggiori informazioni nelle note legali',
    },
  };

  var listeners = [];
  var root = document.documentElement;
  // ?consent=1 previews the banner on any page without enabling it or saving a choice.
  var preview = /[?&]consent=1\b/.test(location.search);

  function lang() {
    var l = (root.getAttribute('lang') || 'en').slice(0, 2).toLowerCase();
    return T[l] ? l : 'en';
  }

  function dict() {
    return T[lang()];
  }

  function read() {
    try {
      var raw = localStorage.getItem(CONFIG.STORAGE_KEY);
      if (!raw) return null;
      var data = JSON.parse(raw);
      if (!data || data.v !== CONFIG.VERSION) return null;
      return data;
    } catch (e) {
      return null;
    }
  }

  function write(state) {
    try {
      localStorage.setItem(CONFIG.STORAGE_KEY, JSON.stringify(state));
    } catch (e) {}
  }

  function state(categories) {
    var out = { v: CONFIG.VERSION, ts: new Date().toISOString() };
    CONFIG.CATEGORIES.forEach(function (c) {
      out[c] = !!(categories && categories[c]);
    });
    return out;
  }

  function notify() {
    var current = read() || state({});
    listeners.forEach(function (fn) {
      try { fn(current); } catch (e) {}
    });
  }

  function legalHref() {
    var a = document.querySelector('a[data-legal="legal"]');
    return a ? a.getAttribute('href') : 'legal.html';
  }

  /* --------------------------------------------------------------- markup */
  function bannerHTML(t) {
    return '' +
      '<div class="consent" role="dialog" aria-modal="false" aria-labelledby="consent-title">' +
      '<div class="consent__inner">' +
      '<h2 class="consent__title" id="consent-title">' + t.title + '</h2>' +
      '<p class="consent__body">' + t.body + ' <a class="consent__legal" href="' + legalHref() + '">' + t.legal + '</a></p>' +
      '<div class="consent__actions">' +
      '<button class="btn btn--ghost" type="button" data-consent-accept>' + t.accept + '</button>' +
      '<button class="btn btn--ghost" type="button" data-consent-reject>' + t.reject + '</button>' +
      '<button class="consent__link" type="button" data-consent-prefs>' + t.prefs + '</button>' +
      '</div></div></div>';
  }

  function prefsHTML(t, current) {
    function row(id, name, desc, checked) {
      return '' +
        '<div class="consent-row">' +
        '<label class="consent-row__label" for="consent-' + id + '">' + name +
        '<span class="consent-row__desc">' + desc + '</span></label>' +
        '<input class="consent-row__check" type="checkbox" id="consent-' + id + '" data-consent-cat="' + id + '"' +
        (checked ? ' checked' : '') + '>' +
        '</div>';
    }
    return '' +
      '<div class="consent-modal" role="dialog" aria-modal="true" aria-labelledby="consent-modal-title">' +
      '<div class="consent-modal__panel">' +
      '<h2 id="consent-modal-title">' + t.settings + '</h2>' +
      '<div class="consent-row consent-row--locked">' +
      '<span class="consent-row__label">' + t.necessary +
      '<span class="consent-row__desc">' + t.necessaryDesc + '</span></span>' +
      '<input class="consent-row__check" type="checkbox" checked disabled>' +
      '</div>' +
      row('analytics', t.analytics, t.analyticsDesc, current.analytics) +
      row('marketing', t.marketing, t.marketingDesc, current.marketing) +
      '<div class="consent-modal__actions">' +
      '<button class="btn btn--primary" type="button" data-consent-save>' + t.save + '</button>' +
      '<button class="btn btn--ghost" type="button" data-consent-close>' + t.close + '</button>' +
      '</div></div></div>';
  }

  /* ------------------------------------------------------------- behaviour */
  var host = null;
  var modal = null;

  function mount(html) {
    if (!host) {
      host = document.createElement('div');
      host.className = 'consent-host';
      document.body.appendChild(host);
    }
    host.innerHTML = html;
  }

  function closeBanner() {
    if (host) host.innerHTML = '';
  }

  function acceptAll() {
    if (preview) { closeBanner(); return; }
    write(state({ analytics: true, marketing: true }));
    closeBanner();
    notify();
  }

  function rejectAll() {
    if (preview) { closeBanner(); return; }
    write(state({ analytics: false, marketing: false }));
    closeBanner();
    notify();
  }

  function openPrefs() {
    var t = dict();
    var current = read() || state({});
    mount(prefsHTML(t, current));
    modal = host.querySelector('.consent-modal');
    var close = host.querySelector('[data-consent-close]');
    var save = host.querySelector('[data-consent-save]');

    close.addEventListener('click', function () { host.innerHTML = ''; });
    modal.addEventListener('click', function (e) {
      if (e.target === modal) host.innerHTML = '';
    });
    document.addEventListener('keydown', onEsc);
    save.addEventListener('click', function () {
      var next = {};
      CONFIG.CATEGORIES.forEach(function (c) {
        var box = host.querySelector('[data-consent-cat="' + c + '"]');
        next[c] = !!(box && box.checked);
      });
      if (!preview) write(state(next));
      host.innerHTML = '';
      notify();
    });
    var first = host.querySelector('input[data-consent-cat]');
    if (first) first.focus();
  }

  function onEsc(e) {
    if (e.key === 'Escape' && host && host.innerHTML) {
      host.innerHTML = '';
      document.removeEventListener('keydown', onEsc);
    }
  }

  function bindBanner() {
    var t = dict();
    mount(bannerHTML(t));
    host.querySelector('[data-consent-accept]').addEventListener('click', acceptAll);
    host.querySelector('[data-consent-reject]').addEventListener('click', rejectAll);
    host.querySelector('[data-consent-prefs]').addEventListener('click', openPrefs);
  }

  function wireSettingsButton() {
    document.querySelectorAll('[data-consent-open]').forEach(function (btn) {
      btn.textContent = dict().settings;
      btn.hidden = false;
      btn.addEventListener('click', function (e) {
        e.preventDefault();
        openPrefs();
      });
    });
  }

  /* ------------------------------------------------------------------- api */
  var api = {
    enabled: CONFIG.ENABLED,
    get: function () { return read() || state({}); },
    open: openPrefs,
    onChange: function (fn) {
      listeners.push(fn);
      try { fn(api.get()); } catch (e) {}
      return function () {
        listeners = listeners.filter(function (f) { return f !== fn; });
      };
    },
    loadIfConsented: function (category, loader) {
      var run = false;
      api.onChange(function (s) {
        if (s[category] && !run) {
          run = true;
          try { loader(); } catch (e) {}
        }
      });
    },
  };
  window.MainAppsConsent = api;

  /* ---------------------------------------------------------------- startup */
  function init() {
    if (!CONFIG.ENABLED && !preview) return;
    wireSettingsButton();
    var stored = read();
    if (!stored || preview) bindBanner();
    notify();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
