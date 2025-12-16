(() => {
    let max = 9;

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

    function rollingAnimation(display, finalValues, rolls = 20, interval = 100) {
        for (let i = 0; i < rolls; i++) {
            setTimeout(() => {
                const a = randomInt(1, max);
                const b = randomInt(1, max);
                const c = randomInt(1, max);
                const d = randomInt(1, max);
                const e = randomInt(1, max);
                display.textContent = `${a} - ${b} - ${c} - ${d} - ${e}`;
            }, i * interval);
        };
        setTimeout(() => {
            display.textContent = finalValues.join(' - ');
        }, rolls * interval);
    }

    function ohne(pixel) {
        pixel.classList.add('ohne-animate');
        setTimeout(() => {
            pixel.classList.remove('ohne-animate');
        }, 1000);
    }




    function payOut(a, b, c, d, e) {
        if (a === b && b === c && c === d && d === e) {
            return 100000;
        } else if (a === b && b === c && c === d || b === c && c === d && d === e) {
            return 50000;
        } else if (a === b && b === c || b === c && c === d || c === d && d === e) {
            return 10000;
        } else if (a === b || b === c || c === d || d === e) {
            return 1000;
        } else {
            return 0;
        }
    }

    function init() {
        const gambleButton = document.getElementById("gambleButton");
        const resultDisplay = document.getElementById("resultDisplay");
        const totalCash = document.getElementById("totalCash");
        const earnings = document.getElementById("earnings");
        const homePage = document.getElementById("homepage");
        const amount = document.getElementById("amount");
        const ohnepixel = document.getElementById("ohne");
        const moneyiscalling = document.getElementById("moneyiscalling");

        const button = document.getElementById("LuckButton");
        let cashNeeded = 100000;
        let totalCashInt = 5000;
        let a = 0
        let b = 0
        let c = 0
        let d = 0
        let e = 0
        let luck = 0.01;

        let MoneyNeeded = 5000;
        let MaxPurchases = 6;
        let purchases = 0;

        if (!gambleButton) returnn;
        gambleButton.addEventListener("click", debounce(() => {
            gambleButton.disabled = true;
            totalCashInt -= 100;
            totalCash.textContent = `$${totalCashInt}`;
            setTimeout(() => {
                gambleButton.disabled = false;
            }, 2000);
            gambleButton.style.transform = "translateY(7px)";
            gambleButton.style.transition = "transform 0.1s";
            a = randomInt(1, max);
            b = randomInt(1, max);
            c = randomInt(1, max);
            d = randomInt(1, max);
            e = randomInt(1, max);
            rollingAnimation(resultDisplay, [a, b, c, d, e]);
            const payout = payOut(a, b, c, d, e);
            setTimeout(() => {
                if (payout > 0) {
                    amount.textContent = `You won $${payout}!`;
                    totalCashInt += payout;
                    totalCash.textContent = `$${totalCashInt}`;
                    const br = document.createElement('br');
                    const wrapper = document.createElement('span');
                    if (payout >= 10000) {
                        wrapper.classList.add('rainbow');
                    } else {
                        wrapper.classList.add('earningtext');
                    }
                    ohne(ohnepixel);

                    const text = document.createElement('span');
                    text.textContent = '+$' + payout + " at " + new Date().toLocaleTimeString();

                    wrapper.appendChild(text);
                    earnings.appendChild(wrapper);
                    earnings.appendChild(br);

                    const delay = 15000;
                    // setTimeout(() => {
                    //     wrapper.remove();
                    //     br.remove();
                    // }, delay);
                } else {
                    amount.textContent = "You won nothing.";
                }
            }, 2000);
            setTimeout(() => {
                gambleButton.style.transform = "";
            }, 100);
        }));

        if (!button) return;
        button.addEventListener("click", debounce(() => {
            if (totalCashInt >= MoneyNeeded) {
                if (purchases < MaxPurchases) {
                    totalCashInt -= MoneyNeeded;
                    totalCash.textContent = `$${totalCashInt}`;
                    purchases += 1;
                    max = max - 1;
                    amount.textContent = `Luck increased! Currently playing with 1 to ` + max + ` (Luck purchases: ${purchases}/${MaxPurchases})`;
                } else {
                    amount.textContent = "Maximum luck purchases reached.";
                }
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

        if (!moneyiscalling) return;
        moneyiscalling.addEventListener("click", debounce(() => {
            window.location.href = "/pages/page4/page4.html";
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