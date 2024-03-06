document.addEventListener('DOMContentLoaded', function() {
    const games = document.getElementById("games");
    Array.from(document.getElementsByClassName("games-text")).forEach((item, index) => {
        item.addEventListener('mouseover', () => {
            games.setAttribute('data-active-index', index.toString());
        });
    });
});
