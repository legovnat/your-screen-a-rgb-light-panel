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
    let mobileFullscreen = false;

    function fakeFullscreen() {
        mobileFullscreen = true
        document.querySelectorAll('*').forEach(element => {
            element.classList.add("hidden")
        })
        const background = document.getElementById("background");
        background.classList.remove("bg-gradient-to-t", "from-zinc-950", "to-zinc-900");
        background.style.backgroundColor = "#" + currentColor;
    };

    function exitfakeFullscreen() {
        mobileFullscreen = false;
        document.querySelectorAll('*').forEach(element => {
            element.classList.remove("hidden")
        })
        const background = document.getElementById("background");
        background.style.backgroundColor = "";
        background.classList.add("bg-gradient-to-t", "from-zinc-950", "to-zinc-900");
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

    /* inputColor.addEventListener("click", () => {
        inputText.value = inputColor.value.replace("#", "");
        currentColor = inputColor.value.replace("#", "");
        userHasInteracted(drawColor);
    }); */


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
            const stream = canvas.captureStream(30);
            video.srcObject = stream;

            inputError.textContent = "";
        } else {
            inputError.textContent = "Sorry! Doesn't seem like a 6-digit hex code.";
        }
    };

    function playVideo() {
        if (isHexGood(currentColor)) {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.fillStyle = "#" + currentColor;
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            const stream = canvas.captureStream(30);
            video.srcObject = stream;
            /// video.play();
        }
    }

    fullscreenButton.addEventListener("click", () => {
        if (video.webkitEnterFullscreen) {
            fakeFullscreen();
            /// inputError.textContent = "Condition works - it does!"
            /// video.webkitEnterFullscreen();
            /// playVideo();
        } else if (video.requestFullscreen) {
            video.requestFullscreen();
            video.play();
            /// playVideo();
        }
    });

    /* fullscreenButton.addEventListener("click", () => {
        if (video.webkitEnterFullscreen && /iPod|iPad|iPhone/.test(navigator.userAgent)) {
            video.webkitEnterFullscreen();
            playVideo();
        } else if (video.requestFullscreen) {
            video.requestFullscreen();
            playVideo();
        } else if (video.webkitRequestFullscreen) {
            video.webkitRequestFullscreen();
            playVideo();
        }
    });

    fullscreenButton.addEventListener("touchstart", () => {
        if (video.webkitEnterFullscreen && /iPod|iPad|iPhone/.test(navigator.userAgent)) {
            video.webkitEnterFullscreen();
            playVideo();
        } else if (video.requestFullscreen) {
            video.requestFullscreen();
            playVideo();
        } else if (video.webkitRequestFullscreen) {
            video.webkitRequestFullscreen();
            playVideo();
        }
    }); */

    document.addEventListener("click", userInteraction);
    document.addEventListener("keydown", userInteraction);
    document.addEventListener("touchstart", userInteraction);

    function userInteraction() {
        if (!globalInteraction) {
            globalInteraction = true;
            /// videoTwo.webkitEnterFullscreen();
            /// playVideo();
            console.log("interaction alright")
        }

        if (mobileFullscreen) {
            exitfakeFullscreen();
        }
    };

    function userHasInteracted(callback) {
        if (userHasInteracted) {
            callback();
        }
    }

    drawColor();
    /// playVideo();

    const videoTwo = document.getElementById("video-two");
});