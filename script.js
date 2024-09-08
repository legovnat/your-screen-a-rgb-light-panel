document.addEventListener("DOMContentLoaded", () => {
    const canvas = document.getElementById("canvas");
    const ctx = canvas.getContext("2d");

    const fullscreenButton = document.getElementById("fullscreen-button");

    const inputColor = document.getElementById("inputColor");
    let currentColor = "FF0000";

    const inputError = document.getElementById("inputError");

    function isHexGood(hex) {
        return /^([0-9A-Fa-f]{6})$/.test(hex);
    }

    inputColor.addEventListener("input", () => {
        if (inputColor.value.includes("#")) {
            inputColor.value = inputColor.value.replace("#", "");

            currentColor = inputColor.value;
            drawColor();
        } else if (inputColor.value.length > 6) {
            inputColor.value = inputColor.value.slice(0, 6);

            currentColor = inputColor.value;
            drawColor();
        } else {
            currentColor = inputColor.value;
            drawColor();
        }
    });

    function drawColor() {
        if (isHexGood(currentColor)) {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.fillStyle = "#" + currentColor;
            ctx.fillRect(0, 0, canvas.width, canvas.height)
            inputError.textContent = "";
        } else {
            inputError.textContent = "Sorry! Doesn't seem like a real 6-digit hex code.";
        }
    }

    fullscreenButton.addEventListener("click", () => {
        canvas.requestFullscreen();
    });

    document.addEventListener("fullscreenchange", () => {
        if (document.fullscreenElement) {
            canvas.classList.remove("w-full", "h-full");
            canvas.classList.add("w-screen", "h-screen");
            canvas.classList.remove("border-4");
            drawColor();
        } else {
            canvas.classList.remove("w-screen", "h-screen");
            canvas.classList.add("w-full", "h-full");
            canvas.classList.add("border-4");
            drawColor();
        }
    })

    drawColor();
});

