/*
    /d:/School/jaar 1/trainingen/html.css/responsive/javathing/script.js

    Simple responsive helpers:
    - mobile nav toggle (aria-friendly)
    - smooth anchor scrolling
    - responsive image swap (data-src-mobile / data-src-desktop)
    - accessible accordion
*/

(() => {
    'use strict';

    // Utility: debounce
    const debounce = (fn, wait = 150) => {
        let t;
        return (...args) => {
            clearTimeout(t);
            t = setTimeout(() => fn.apply(this, args), wait);
        };
    };

    // Mobile nav toggle: expects button#navToggle and nav#siteNav
    function setupNavToggle() {
        const btn = document.getElementById('navToggle');
        const nav = document.getElementById('siteNav');
        if (!btn || !nav) return;

        btn.addEventListener('click', () => {
            const expanded = btn.getAttribute('aria-expanded') === 'true';
            btn.setAttribute('aria-expanded', String(!expanded));
            nav.hidden = expanded;
        });

        // Close nav on Escape
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && btn.getAttribute('aria-expanded') === 'true') {
                btn.click();
                btn.focus();
            }
        });
    }

    // Smooth scroll for same-page anchors
    function setupSmoothScroll() {
        document.addEventListener('click', (e) => {
            const a = e.target.closest('a[href^="#"]');
            if (!a) return;
            const id = a.getAttribute('href').slice(1);
            const target = document.getElementById(id);
            if (!target) return;
            e.preventDefault();
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            // Update focus for accessibility
            target.tabIndex = -1;
            target.focus({ preventScroll: true });
            // remove tabindex after focus move
            setTimeout(() => target.removeAttribute('tabindex'), 1000);
        });
    }

    // Responsive image swap using data-src-mobile / data-src-desktop attributes
    function setupResponsiveImages() {
        const images = Array.from(document.querySelectorAll('img[data-src-mobile][data-src-desktop]'));
        if (!images.length) return;

        const mq = window.matchMedia('(max-width: 767px)');

        const applySrcs = () => {
            const useMobile = mq.matches;
            images.forEach(img => {
                const src = useMobile ? img.dataset.srcMobile : img.dataset.srcDesktop;
                if (src && img.src !== src) {
                    img.src = src;
                }
            });
        };

        // initial
        applySrcs();

        // listen with debounce
        const onChange = debounce(() => applySrcs(), 120);
        mq.addEventListener ? mq.addEventListener('change', onChange) : mq.addListener(onChange);
        window.addEventListener('resize', onChange);
    }

    // Simple accessible accordion: expects .accordion and .accordion-button inside each .accordion-item
    function setupAccordion() {
        document.querySelectorAll('.accordion').forEach(root => {
            root.addEventListener('click', (e) => {
                const btn = e.target.closest('.accordion-button');
                if (!btn || !root.contains(btn)) return;
                const item = btn.closest('.accordion-item');
                if (!item) return;
                const panel = item.querySelector('.accordion-panel');
                const expanded = btn.getAttribute('aria-expanded') === 'true';
                btn.setAttribute('aria-expanded', String(!expanded));
                if (panel) panel.hidden = expanded;
                // optionally close siblings (uncomment to allow only one open)
                /*
                if (!expanded) {
                    root.querySelectorAll('.accordion-item').forEach(other => {
                        if (other === item) return;
                        const obtn = other.querySelector('.accordion-button');
                        const opanel = other.querySelector('.accordion-panel');
                        if (obtn) obtn.setAttribute('aria-expanded', 'false');
                        if (opanel) opanel.hidden = true;
                    });
                }
                */
            });
        });
    }

    // Initialize on DOM ready
    document.addEventListener('DOMContentLoaded', () => {
        setupNavToggle();
        setupSmoothScroll();
        setupResponsiveImages();
        setupAccordion();
    });
})();