(() => {
    const debounce = (fn, wait = 150) => {
        let t;
        return (...args) => {
            clearTimeout(t);
            t = setTimeout(() => fn.apply(null, args), wait);
        };
    };

    const randomInt = (min, max) => {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    function init() {
        let totalCashInt = 0;
        let cashNeeded = 100000;
        let luck = 0.01;
        const cash = document.getElementById("cash");
        const totalCash = document.getElementById("totalCash");
        const homePage = document.getElementById("homepage")
        const buyLuck = document.getElementById("buyluck")
        const totalLuck = document.getElementById("linkLuck")
        const stone = document.getElementById("stone")
        totalLuck.textContent = "Link Luck: " + luck;

        if (!stone) return;
        stone.addEventListener("click", debounce(() => {
            stone.style.transform = "translateY(7px)";
            stone.style.transition = "transform 0.1s";
            setTimeout(() => {
                stone.style.transform = "";
            }, 100);
            if (Math.random() < 0.8) {
                const wrapper = document.createElement('span');
                wrapper.style.display = 'inline-flex';
                wrapper.style.alignItems = 'center';
                wrapper.style.gap = '8px';
                wrapper.style.marginLeft = '10px';
                wrapper.style.color = '#900';
                wrapper.style.userSelect = 'none';

                const text = document.createElement('span');
                text.textContent = 'earned nothing';

                wrapper.appendChild(text);
                cash.parentNode.appendChild(wrapper);

                const delay = 1000;
                setTimeout(() => {
                    wrapper.remove();
                }, delay);
            } else {
                const earned = randomInt(1, 10) * 1000;
                totalCash.textContent = "$" + (parseInt(totalCash.textContent.slice(1)) + earned);
                cash.textContent = "You earned $" + earned + "!";
                totalCashInt += earned
            }
            button.disabled = true;
            setTimeout(() => {
                button.disabled = false;
                cash.textContent = "...";
            }, 1000);
        }, 150));

        if (!homePage) return;
        homePage.addEventListener("click", debounce(() => {
            if (totalCashInt >= cashNeeded) {
                window.location.href = "/index.html";
            } else {
                const wrapper = document.createElement('span');
                wrapper.style.display = 'inline-flex';
                wrapper.style.alignItems = 'center';
                wrapper.style.gap = '8px';
                wrapper.style.marginLeft = '10px';
                wrapper.style.color = '#900';
                wrapper.style.userSelect = 'none';

                const img = document.createElement('img');
                img.src = '/resources/Neggativity GIF.gif';
                img.alt = '';
                img.width = 100;
                img.height = 100;
                img.setAttribute('aria-hidden', 'true');

                const text = document.createElement('span');
                text.textContent = 'not enough cash dumbass';

                wrapper.appendChild(img);
                wrapper.appendChild(text);
                homePage.parentNode.appendChild(wrapper);

                const delay = 3000;
                homePage.disabled = true;
                setTimeout(() => {
                    wrapper.remove();
                    homePage.disabled = false;
                }, delay);
            }
        }, 150));
        if (!buyLuck) return;
        buyLuck.addEventListener("click", debounce(() => {
            if (totalCashInt >= 25000) {
                totalCashInt -= 25000;
                totalCash.textContent = "$" + totalCashInt;
                luck += randomInt(0.05, 0.01);
                totalLuck.textContent = "Link Luck: " + luck;
            }
        }, 150));

        const link = document.getElementById('risky-back');
        if (!link) return;

        // helper to set link disabled state
        function setDisabled(on) {
            if (on) {
                link.dataset.busy = '1';
                link.setAttribute('aria-disabled', 'true');
                link.style.pointerEvents = 'none';
                link.style.opacity = '0.6';
            } else {
                delete link.dataset.busy;
                link.removeAttribute('aria-disabled');
                link.style.pointerEvents = '';
                link.style.opacity = '';
            }
        }

        link.addEventListener('click', function (e) {
            if (link.dataset.busy === '1') {
                e.preventDefault();
                return;
            }

            e.preventDefault();

            if (Math.random() < luck) {
                window.location.href = link.getAttribute('href');
                return;
            }
            setDisabled(true);

            const wrapper = document.createElement('span');
            wrapper.style.display = 'inline-flex';
            wrapper.style.alignItems = 'center';
            wrapper.style.gap = '8px';
            wrapper.style.marginLeft = '10px';
            wrapper.style.color = '#900';
            wrapper.style.userSelect = 'none';

            const img = document.createElement('img');
            img.src = '/resources/idiotlaugh.png';
            img.alt = '';
            img.width = 100;
            img.height = 100;
            img.setAttribute('aria-hidden', 'true');

            const text = document.createElement('span');
            text.textContent = 'idiot';

            wrapper.appendChild(img);
            wrapper.appendChild(text);
            link.parentNode.appendChild(wrapper);

            const delay = 700;
            setTimeout(() => {
                wrapper.remove();
                setDisabled(false);
            }, delay);
        });
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();