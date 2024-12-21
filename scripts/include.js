/*

    Add this at the top of a page:
    <script src="scripts/include.js"></script>

    Add this in the body before and after main for header and footer:
    <div data-include="header.html"></div>

*/
document.addEventListener("DOMContentLoaded", async () => {
    const elements = document.querySelectorAll("[data-include]");
    for (let element of elements) {
        const file = element.getAttribute("data-include");
        try {
            const response = await fetch(file);
            if (response.ok) {
                element.innerHTML = await response.text();
            } else {
                console.error(`Error loading ${file}: ${response.status} :(`);
            }
        } catch (error) {
            console.error(`Fetch error: ${error.message} :(((`);
        }
    }
});