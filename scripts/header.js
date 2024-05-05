document.addEventListener('DOMContentLoaded', function() {
    const headerHTML = `
        <div class="header">
            <div>
                <button class="button" onclick="window.location='index.html';">
                    <img src="../icons/home.png" alt="Home">
                </button>
                <button class="button" onclick="window.location='projects.html';">Projects</button>
            </div>
            <button class="theme-switcher" onclick="toggleTheme();" id="theme-toggle-btn"></button>
        </div>
    `;

    document.getElementById('global-header').innerHTML = headerHTML;
    updateThemeToggleIcon(); // Set the correct theme icon on load
});

function toggleTheme() {
    document.body.classList.toggle('light-mode');
    document.body.classList.toggle('dark-mode');
    updateThemeToggleIcon();
}

function updateThemeToggleIcon() {
    const themeBtn = document.getElementById('theme-toggle-btn');
    if (document.body.classList.contains('dark-mode')) {
        themeBtn.style.backgroundImage = "../icons/sun.png";
    } else {
        themeBtn.style.backgroundImage = "../icons.moon.png";
    }
}
