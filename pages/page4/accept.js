(() => {
    const randomInt = (min, max) => {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    const debounce = (fn, wait = 150) => {
        let t;
        return (...args) => {
            clearTimeout(t);
            t = setTimeout(() => fn.apply(null, args), wait);
        };
    };

    function init() {
        const button = document.getElementById("accept");
        const gif1 = document.getElementById("gif1")
        const body = document.body;


        if (!button) return;
        button.addEventListener("click", debounce(() => {
            const gif = document.createElement("img");
            gif.src = "/resources/BEST_OF_OHNEPIXEL_GOLD_GOLD_GOLD.gif";
            gif.style.position = "fixed";
            gif.style.top = "550px";
            gif.style.left = "50px";
            gif.style.zIndex = "1000";
            body.appendChild(gif);
            const delay = 7000;
            setTimeout(() => {
                gif.remove();
            }, delay);
        }, 1));
    }
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();