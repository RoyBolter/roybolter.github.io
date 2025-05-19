// <div id="global-header"></div>               // Use this at top of page
// <script src="scripts/header.js"></script>    // Use this where scripts go

document.addEventListener('DOMContentLoaded', function () {
    const headerHTML = `
        <div class="header">
            <div>
                <button class="button" onclick="window.location='index.html';">Home</button>
                <!--<button class="button" onclick="window.location='projects.html';">Projects</button>-->
                <!--<button class="button" onclick="window.location='games.html';">Games</button>-->
            </div>
            <!--<button class="theme-switcher" onclick="toggleTheme();" id="theme-toggle-btn"></button>-->
            
        </div>
    `;

    document.getElementById('global-header').innerHTML = headerHTML;
});
