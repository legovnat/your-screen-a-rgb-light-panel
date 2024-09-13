document.addEventListener("DOMContentLoaded", () => {
    const canvas = document.getElementById("canvas");
    const ctx = canvas.getContext("2d");

    const fullscreenButton = document.getElementById("fullscreen-button");

    const inputText = document.getElementById("inputText");
    const inputColor = document.getElementById("inputColor");
    let currentColor = "ff0000";

    const inputError = document.getElementById("inputError");

    const divVideo = document.getElementById("divVideo");

    let globalInteraction = false;
    let mobileFullscreen = false;

    function fakeFullscreen() {
        mobileFullscreen = true;
        canvas.classList.replace("border-zinc-950", "border-zinc-100");
        inputError.textContent = "function called";

    };

    function exitfakeFullscreen() {
        mobileFullscreen = false;
        canvas.classList.remove("h-screen");
        canvas.classList.add("h-80");
    }

    function isHexGood(hex) {
        return /^([0-9A-Fa-f]{6})$/.test(hex);
    }

    inputText.addEventListener("input", () => {
        if (inputText.value.includes("#")) {
            inputText.value = inputText.value.replace("#", "");
            currentColor = inputText.value;
            inputColor.value = "#" + inputText.value;
            drawColor();
        } else if (inputText.value.length > 6) {
            inputText.value = inputText.value.slice(0, 6);
            currentColor = inputText.value;
            inputColor.value = "#" + inputText.value;
            drawColor();
        } else {
            currentColor = inputText.value;
            inputColor.value = "#" + inputText.value;
            drawColor();
        }
    });

    inputColor.addEventListener("input", () => {
        inputText.value = inputColor.value.replace("#", "");
        currentColor = inputColor.value.replace("#", "");
        drawColor();
    });

    function drawColor() {
        if (isHexGood(currentColor)) {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.fillStyle = "#" + currentColor;
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            divVideo.style.backgroundColor = "#" + currentColor;

            inputError.textContent = "";
        } else {
            inputError.textContent = "Sorry! Doesn't seem like a 6-digit hex code.";
        }
    };

    fullscreenButton.addEventListener("click", () => {
        if (/iPad|iPhone|iPod/.test(navigator.userAgent)) {
            inputError.textContent = "condidtional's good";
            fakeFullscreen();
        } else if (canvas.requestFullscreen) {
            canvas.requestFullscreen();
        }
    });

    document.addEventListener("click", userInteraction);
    document.addEventListener("keydown", userInteraction);
    document.addEventListener("touchstart", userInteraction);

    function userInteraction() {
        if (!globalInteraction) {
            globalInteraction = true;
        } else if (mobileFullscreen) {
            exitfakeFullscreen();
        }
    };

    function userHasInteracted(callback) {
        if (userHasInteracted) {
            callback();
        }
    }

    drawColor();
});