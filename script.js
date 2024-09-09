document.addEventListener("DOMContentLoaded", () => {
    const canvas = document.getElementById("canvas");
    const ctx = canvas.getContext("2d");

    const fullscreenButton = document.getElementById("fullscreen-button");

    const inputText = document.getElementById("inputText");
    const inputColor = document.getElementById("inputColor");
    let currentColor = "ff0000";

    const inputError = document.getElementById("inputError");

    const video = document.getElementById("video");
    const divVideo = document.getElementById("divVideo");

    let globalInteraction = false;

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

    /* inputColor.addEventListener("click", () => {
        if (inputColor.value) {
            inputText.value = inputColor.value.replace("#", "");
            currentColor = inputColor.value.replace("#", "");
            drawColor();
        }
    }); */


    inputColor.addEventListener("input", () => {
        inputText.value = inputColor.value.replace("#", "");
        currentColor = inputColor.value.replace("#", "");
        userHasInteracted(drawColor);
    });

    function drawColor() {
        if (isHexGood(currentColor)) {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.fillStyle = "#" + currentColor;
            ctx.fillRect(0, 0, canvas.width, canvas.height)

            /* const stream = canvas.captureStream(30);
            video.srcObject = stream;
            video.play(); */
            divVideo.style.backgroundColor = "#" + currentColor;

            inputError.textContent = "";
        } else {
            inputError.textContent = "Sorry! Doesn't seem like a real 6-digit hex code.";
        }
    }

    fullscreenButton.addEventListener("click", () => {
        divVideo.requestFullscreen();
    });

    document.addEventListener("fullscreenchange", () => {
        if (document.fullscreenElement) {
            video.classList.remove("h-1/2");
            video.classList.add("h-full");
        } else {
            video.classList.remove("h-full");
            video.classList.add("h-1/2");
        }
    })

    document.addEventListener("click", userInteraction);
    document.addEventListener("keydown", userInteraction);
    document.addEventListener("touchstart", userInteraction);

    function userInteraction() {
        if (!globalInteraction) {
            globalInteraction = true;
            console.log("interaction alright")
        }
    };

    function userHasInteracted(callback) {
        if (userHasInteracted) {
            callback();
        }
    }

    drawColor();
});

