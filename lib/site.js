function saveThemeToLocalStorage(theme) {
    localStorage.setItem('theme', theme);
}
  
function getThemeFromLocalStorage() {
    var theme = localStorage.getItem('theme');
    return theme ? theme : null;
}

document.addEventListener("DOMContentLoaded", function() {
    const theme = getThemeFromLocalStorage();

    if (theme === "light" || theme === "dark") {
        setTheme(theme);
    } else {
        setTheme("light");
    }
});

function setTheme(theme) {
    const themeBtnIcon = document.querySelector('#theme-btn i');
    const htmlElement = document.documentElement;

    themeBtnIcon.classList.remove(...themeBtnIcon.classList);
    if (theme === "light") {
        htmlElement.setAttribute("data-bs-theme", "light");
        themeBtnIcon.classList.add('bi', 'bi-moon-stars');
    } else {
        htmlElement.setAttribute("data-bs-theme", "dark");
        themeBtnIcon.classList.add('bi', 'bi-brightness-high');
    }

    saveThemeToLocalStorage(theme);
}

function toggleTheme() {
    const currentTheme = document.documentElement.getAttribute("data-bs-theme");
    if (currentTheme === "dark") {
        setTheme("light");
    } else {
        setTheme("dark");
    }
}

if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
    setTheme("dark");
}
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', ({ matches }) => {
    if (matches) {
        setTheme("dark");
    } else {
        setTheme("light");
    }
});