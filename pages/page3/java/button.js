(() => {
    let max = 9;

    const debounce = (fn, wait = 150) => {
        let t;
        return (...args) => {
            clearTimeout(t);
            t = setTimeout(() => fn.apply(null, args), wait);
        };
    };

    function init() {
        const gambleButton = document.getElementsByClassName("shopbutton")[0];
        const shop = document.getElementsByClassName("shop")[0];

        if (!gambleButton) returnn;
        gambleButton.addEventListener("click", debounce(() => {
            gambleButton.style.transform = "scale(0.9)";
            shop.style.display = shop.style.display === "block" ? "none" : "block";
            setTimeout(() => {
                gambleButton.style.transform = "";
            }, 100);
        }));
    }
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();