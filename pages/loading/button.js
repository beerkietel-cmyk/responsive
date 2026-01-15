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
        const button = document.getElementById("button");


        if (!button) return;
        button.addEventListener("click", debounce(() => {
            window.location.href = "/index.html";

        }, 1));
        button.addEventListener("mouseenter", debounce(() => {
            // button.style.backgroundColor = `rgb(${randomInt(0, 255)}, ${randomInt(0, 255)}, ${randomInt(0, 255)})`;
            button.style.transform = `translate(${randomInt(0, visualViewport.width)}px, ${randomInt(0, visualViewport.height)}px)`;

        }, 10));
    }
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();