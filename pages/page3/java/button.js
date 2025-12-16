// This is a Self-Executing Anonymous Function (IIFE - Immediately Invoked Function Expression).
// It runs the code inside immediately and keeps all the variables private, 
// preventing them from interfering with other scripts on the page.
(() => {

    /**
     * 🛠️ UTILITY FUNCTION 1: debounce
     * Prevents a function (like a button click handler) from being called too many times in a row quickly.
     * This is useful for stopping "spam clicking" a button, ensuring the game logic only runs once 
     * every 150ms (or whatever 'wait' time is set).
     * * @param {function} fn - The function to be debounced (the code to run).
     * @param {number} wait - The delay in milliseconds (defaults to 150ms).
     */
    const debounce = (fn, wait = 150) => {
        let t; // 't' will hold the ID of the timer (from setTimeout).
        // This inner function is what actually replaces the original function in the event listener.
        return (...args) => {
            clearTimeout(t); // 1. If a timer exists, cancel the previous waiting call.
            // 2. Set a new timer. The 'fn' will only run if this timer expires without being reset.
            t = setTimeout(() => fn.apply(null, args), wait);
        };
    };

    /**
     * 🛠️ UTILITY FUNCTION 2: randomInt
     * Generates a random whole number between 'min' and 'max', inclusive.
     * * @param {number} min - The smallest possible number.
     * @param {number} max - The largest possible number.
     */
    const randomInt = (min, max) => {
        // Math.random() gives a float between 0 (inclusive) and 1 (exclusive).
        // The formula calculates the correct integer result.
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    /**
     * 🎰 GAME LOGIC 1: rollingAnimation
     * Creates a visual "rolling" effect by rapidly changing the numbers displayed 
     * before settling on the final result.
     * * @param {HTMLElement} display - The HTML element (e.g., a <span> or <div>) to update.
     * @param {number[]} finalValues - The actual winning numbers (e.g., [7, 7, 1, 3, 5]).
     * @param {number} rolls - How many times the numbers should change (defaults to 20).
     * @param {number} interval - The delay between each change in milliseconds (defaults to 100ms).
     */
    function rollingAnimation(display, finalValues, rolls = 20, interval = 100) {
        // The total animation time will be rolls * interval = 20 * 100ms = 2000ms (2 seconds).

        // This loop schedules a series of random number changes.
        for (let i = 0; i < rolls; i++) {
            // setTimeout delays the execution of the function.
            // i * interval makes each call wait a little longer than the last.
            setTimeout(() => {
                // Generate 5 random numbers for the 'roll' display (1 to 9).
                const a = randomInt(1, 9);
                const b = randomInt(1, 9);
                const c = randomInt(1, 9);
                const d = randomInt(1, 9);
                const e = randomInt(1, 9);
                // Update the display element's text content.
                display.textContent = `${a} - ${b} - ${c} - ${d} - ${e}`;
            }, i * interval);
        };

        // After the loop finishes scheduling all the random rolls, 
        // schedule one final update to show the *actual* result.
        setTimeout(() => {
            // Use the finalValues array, joined by ' - '.
            display.textContent = finalValues.join(' - ');
        }, rolls * interval); // This runs exactly when the last roll is complete (after 2000ms).
    }

    /**
     * 💸 GAME LOGIC 2: payOut
     * Calculates the winning amount based on the 5 final numbers.
     * This establishes the game's reward structure (like slot machine rules).
     */
    function payOut(a, b, c, d, e) {
        // 5-of-a-kind (All five are the same)
        if (a === b && b === c && c === d && d === e) {
            return 100000;
            // 4-of-a-kind (First four are the same OR last four are the same)
        } else if (a === b && b === c && c === d || b === c && c === d && d === e) {
            return 50000;
            // 3-of-a-kind (Any three consecutive numbers are the same)
        } else if (a === b && b === c || b === c && c === d || c === d && d === e) {
            return 10000;
            // 2-of-a-kind (Any two consecutive numbers are the same)
        } else if (a === b || b === c || c === d || d === e) {
            return 1000;
            // No win
        } else {
            return 0;
        }
    }

    /**
     * 🖱️ MAIN INITIALIZATION: init
     * This function runs once the HTML page is loaded and sets up the whole application.
     */
    function init() {
        // 1. Get references to the HTML elements using their IDs.
        const gambleButton = document.getElementById("gambleButton");
        const resultDisplay = document.getElementById("resultDisplay");
        const totalCash = document.getElementById("totalCash");
        const earnings = document.getElementById("earnings");
        const homePage = document.getElementById("homepage")
        const link = document.getElementById('risky-back');

        // 2. Initialize State Variables (The money, target, and luck).
        let cashNeeded = 100000; // Target cash needed to successfully use the homepage link.
        let totalCashInt = 1000; // The player's starting money.
        // Variables to hold the result of the roll. They are declared here but assigned later.
        let a = 0;
        let b = 0;
        let c = 0;
        let d = 0;
        let e = 0;
        let luck = 0.01; // 1% chance used in the 'risky-back' link logic.

        // Fix a potential typo: 'returnn' should be 'return'.
        // If the main button isn't found, stop the function.
        if (!gambleButton) return;

        // 3. GAMBLE BUTTON Listener
        // When the button is clicked, run the game logic, wrapped in 'debounce' to prevent fast clicks.
        gambleButton.addEventListener("click", debounce(() => {
            // Start of a game round:
            gambleButton.disabled = true; // Disable the button to prevent double-clicking during the game.
            totalCashInt -= 100; // Deduct the cost of the gamble (bet amount).
            totalCash.textContent = `$${totalCashInt}`; // Update the money display.

            // Re-enable the button after 2000ms (2 seconds), which is the length of the animation.
            setTimeout(() => {
                gambleButton.disabled = false;
            }, 2000);

            // Add a quick visual effect to the button using CSS styles.
            gambleButton.style.transform = "translateY(7px)";
            gambleButton.style.transition = "transform 0.1s";

            // Determine the final winning numbers (1 to 9).
            a = randomInt(1, 9);
            b = randomInt(1, 9);
            c = randomInt(1, 9);
            d = randomInt(1, 9);
            e = randomInt(1, 9);

            // Start the visual rolling animation.
            rollingAnimation(resultDisplay, [a, b, c, d, e]);

            // Calculate the payout immediately, but the result isn't shown yet.
            const payout = payOut(a, b, c, d, e);

            // Wait 2000ms (until the animation is finished) to display the win/loss message.
            setTimeout(() => {
                if (payout > 0) {
                    // Winning logic
                    resultDisplay.textContent += ` - You won $${payout}!`;
                    totalCashInt += payout; // Add winnings to the total cash.
                    totalCash.textContent = `$${totalCashInt}`; // Update cash display.

                    // --- Displaying Earning History (DOM manipulation) ---
                    const br = document.createElement('br');
                    const wrapper = document.createElement('span');

                    // Apply special styling (like a rainbow) for big wins.
                    if (payout >= 10000) {
                        wrapper.classList.add('rainbow');
                    } else {
                        wrapper.classList.add('earningtext');
                    }

                    const text = document.createElement('span');
                    text.textContent = '+$' + payout + " at " + new Date().toLocaleTimeString();

                    wrapper.appendChild(text);
                    earnings.appendChild(wrapper);
                    earnings.appendChild(br);

                    // A commented-out section that would remove the earning message after 15 seconds.
                    // const delay = 15000;
                    // setTimeout(() => {
                    //     wrapper.remove();
                    //     br.remove();
                    // }, delay);
                } else {
                    // Losing logic
                    resultDisplay.textContent += " - You won nothing.";
                }
            }, 2000);

            // Reset the button's visual effect after a very short delay (100ms).
            setTimeout(() => {
                gambleButton.style.transform = "";
            }, 100);
        }));

        // 4. HOMEPAGE BUTTON Listener (Requires a lot of cash to proceed)
        if (!homePage) return; // Stop if element is missing.

        homePage.addEventListener("click", debounce(() => {
            if (totalCashInt >= cashNeeded) {
                // Success: Navigate to the homepage if the cash goal is met.
                window.location.href = "/index.html";
            } else {
                // Failure: Display a custom, explicit error message in the DOM.

                // --- Creating the Error Message (DOM manipulation) ---
                const wrapper = document.createElement('span');
                // Apply inline styles for the look of the error message.
                wrapper.style.display = 'inline-flex';
                wrapper.style.alignItems = 'center';
                wrapper.style.gap = '8px';
                wrapper.style.marginLeft = '10px';
                wrapper.style.color = '#900'; // Dark red color
                wrapper.style.userSelect = 'none';

                const img = document.createElement('img');
                img.src = '/resources/Neggativity GIF.gif'; // Image for the error message.
                // ... set other image properties

                const text = document.createElement('span');
                text.textContent = 'not enough cash dumbass'; // The blunt error text.

                wrapper.appendChild(img);
                wrapper.appendChild(text);
                homePage.parentNode.appendChild(wrapper); // Add the message next to the button.

                const delay = 3000; // Message duration (3 seconds).
                homePage.disabled = true; // Disable the button while the message is showing.
                setTimeout(() => {
                    wrapper.remove(); // Remove the error message.
                    homePage.disabled = false; // Re-enable the button.
                }, delay);
            }
        }, 150));

        // 5. RISKY-BACK LINK Listener (A navigation link with a chance element)
        if (!link) return; // Stop if element is missing.

        // Helper function to manage the disabled state of the link (visually and functionally).
        function setDisabled(on) {
            if (on) {
                // Set data attributes and CSS styles to visually and functionally disable the link.
                link.dataset.busy = '1';
                link.setAttribute('aria-disabled', 'true');
                link.style.pointerEvents = 'none'; // Prevents clicks.
                link.style.opacity = '0.6';
            } else {
                // Remove disabled state.
                delete link.dataset.busy;
                link.removeAttribute('aria-disabled');
                link.style.pointerEvents = '';
                link.style.opacity = '';
            }
        }

        link.addEventListener('click', function (e) {
            // Check if the link is already busy from a previous click.
            if (link.dataset.busy === '1') {
                e.preventDefault(); // Stop the link from navigating.
                return;
            }

            e.preventDefault(); // Stop the default navigation behavior for the link.

            // Check if the player is lucky (luck is 0.01, so a 1% chance).
            if (Math.random() < luck) {
                // Success: If lucky, allow navigation to the link's href.
                window.location.href = link.getAttribute('href');
                return;
            }

            // Failure: Not lucky, display the error message.
            setDisabled(true); // Disable the link during the message display.

            // --- Creating the Failure Message (Similar DOM manipulation as above) ---
            const wrapper = document.createElement('span');
            // ... (Styling is set here)
            // ...
            const img = document.createElement('img');
            img.src = '/resources/idiotlaugh.png';
            // ... (Image properties)
            const text = document.createElement('span');
            text.textContent = 'idiot'; // The error text.
            // ... (Appending elements)

            link.parentNode.appendChild(wrapper);

            const delay = 700; // Message duration (0.7 seconds).
            setTimeout(() => {
                wrapper.remove();
                setDisabled(false); // Re-enable the link.
            }, delay);
        });
    }


    // 6. INITIALIZATION CALL
    // Check if the HTML content is already loaded.
    if (document.readyState === 'loading') {
        // If not loaded yet, wait for the 'DOMContentLoaded' event to fire, then run init().
        document.addEventListener('DOMContentLoaded', init);
    } else {
        // If it's already loaded, run init() immediately.
        init();
    }
})();