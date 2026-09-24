function getSystemTheme() {
    return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

function getStoredTheme() {
    try {
        const stored = localStorage.getItem('theme');
        return stored === 'dark' || stored === 'light' ? stored : null;
    } catch (e) {
        return null;
    }
}

function updateThemeUI(theme) {
    const htmlElement = document.documentElement;
    htmlElement.setAttribute('data-bs-theme', theme);

    const meta = document.querySelector('meta[name="color-scheme"]');
    if (meta) {
        meta.setAttribute('content', theme);
    }

    const themeBtn = document.getElementById('theme-btn');
    if (themeBtn) {
        const isDark = theme === 'dark';
        themeBtn.setAttribute('aria-label', isDark ? 'Switch to light mode' : 'Switch to dark mode');
        themeBtn.setAttribute('title', isDark ? 'Switch to light mode' : 'Switch to dark mode');
        
        const icon = themeBtn.querySelector('i');
        if (icon) {
            icon.className = isDark ? 'bi bi-sun-fill' : 'bi bi-moon-stars-fill';
        }
    }
}

function applyTheme(theme, persist = false) {
    updateThemeUI(theme);
    if (persist) {
        try {
            localStorage.setItem('theme', theme);
        } catch (e) {}
    }
}

function toggleTheme() {
    const currentTheme = document.documentElement.getAttribute('data-bs-theme') || getSystemTheme();
    const nextTheme = currentTheme === 'dark' ? 'light' : 'dark';
    applyTheme(nextTheme, true);
}

// Initial sync once DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    const stored = getStoredTheme();
    const currentTheme = stored || getSystemTheme();
    applyTheme(currentTheme, false);

    // Auto-update footer copyright year
    const yearEl = document.getElementById('copyright-year');
    if (yearEl) {
        yearEl.textContent = new Date().getFullYear();
    }

    // Auto-close mobile navbar on anchor link click
    const navCollapse = document.getElementById('navbarNav');
    if (navCollapse) {
        const navLinks = navCollapse.querySelectorAll('.nav-link');
        navLinks.forEach(function(link) {
            link.addEventListener('click', function() {
                if (navCollapse.classList.contains('show') && window.bootstrap) {
                    const bsCollapse = bootstrap.Collapse.getInstance(navCollapse) || new bootstrap.Collapse(navCollapse);
                    bsCollapse.hide();
                }
            });
        });
    }
});

// React live to OS device theme changes
if (window.matchMedia) {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleSystemThemeChange = function(e) {
        // Only react to OS changes if user hasn't explicitly set a preference
        if (!getStoredTheme()) {
            const newSystemTheme = e.matches ? 'dark' : 'light';
            applyTheme(newSystemTheme, false);
        }
    };

    if (mediaQuery.addEventListener) {
        mediaQuery.addEventListener('change', handleSystemThemeChange);
    } else if (mediaQuery.addListener) {
        mediaQuery.addListener(handleSystemThemeChange);
    }
}