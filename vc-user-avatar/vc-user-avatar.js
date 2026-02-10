/**
 * vc-user-avatar
 * Enhances .vc-avatar elements with:
 *   – Two-letter monospace bold initials
 *   – Seeded two-color gradient background
 *   – Profile-picture override when an <img> child is present
 *
 * Usage:
 *   <div class="vc-avatar" data-name="Isaiah Church"></div>
 *   <div class="vc-avatar" data-name="John Doe">
 *     <img src="profile.jpg" alt="">
 *   </div>
 */

(function () {
  'use strict';

  // ── Gradient color palette ──────────────────────────────────
  // Curated pairs-friendly palette; any two look good together.
  var PALETTE = [
    '#6C5CE7', // purple
    '#0984E3', // blue
    '#00B894', // teal
    '#E17055', // coral
    '#D63031', // red
    '#E84393', // pink
    '#FDCB6E', // gold
    '#00CEC9', // cyan
    '#55EFC4', // mint
    '#A29BFE', // lavender
    '#FF7675', // salmon
    '#74B9FF', // sky
    '#2D3436', // charcoal
    '#636E72', // slate
    '#81ECEC', // aqua
    '#FAB1A0', // peach
  ];

  // Gradient directions to add variety
  var DIRECTIONS = [
    '135deg',
    '160deg',
    '200deg',
    '315deg',
    '45deg',
  ];

  // ── Simple seeded hash from a string ────────────────────────
  function hashStr(str) {
    var h = 0;
    for (var i = 0; i < str.length; i++) {
      h = ((h << 5) - h + str.charCodeAt(i)) | 0;
    }
    return Math.abs(h);
  }

  // ── Extract two-letter initials from a name ─────────────────
  function getInitials(name) {
    var parts = name.trim().split(/\s+/);
    if (parts.length >= 2) {
      return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
    }
    return (name.trim().slice(0, 2)).toUpperCase();
  }

  // ── Pick two distinct palette colors + direction ────────────
  function pickGradient(name) {
    var h = hashStr(name);
    var idx1 = h % PALETTE.length;
    var idx2 = (h * 7 + 13) % PALETTE.length;

    // Guarantee the two colors are different
    if (idx2 === idx1) {
      idx2 = (idx1 + 1) % PALETTE.length;
    }

    var dir = DIRECTIONS[h % DIRECTIONS.length];
    return 'linear-gradient(' + dir + ', ' + PALETTE[idx1] + ', ' + PALETTE[idx2] + ')';
  }

  // ── Enhance a single .vc-avatar element ─────────────────────
  function enhanceAvatar(el) {
    if (el.dataset.vcReady) return; // already processed
    el.dataset.vcReady = '1';

    var name = (el.getAttribute('data-name') || '').trim();
    if (!name) return;

    // Build initials span
    var initials = document.createElement('span');
    initials.className = 'vc-avatar__initials';
    initials.textContent = getInitials(name);
    initials.style.background = pickGradient(name);

    // Insert initials as first child (behind any img)
    el.insertBefore(initials, el.firstChild);

    // Tag existing <img> children for override layer
    var imgs = el.querySelectorAll('img');
    for (var i = 0; i < imgs.length; i++) {
      imgs[i].classList.add('vc-avatar__img');
    }
  }

  // ── Bootstrap ───────────────────────────────────────────────
  function init() {
    document.querySelectorAll('.vc-avatar').forEach(enhanceAvatar);

    // Watch for dynamically added avatars
    var mo = new MutationObserver(function () {
      document.querySelectorAll('.vc-avatar').forEach(enhanceAvatar);
    });
    mo.observe(document.body, { childList: true, subtree: true });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
