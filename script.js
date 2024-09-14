document.addEventListener("DOMContentLoaded", () => {
    const canvas = document.getElementById("canvas");
    const ctx = canvas.getContext("2d");

    const fullscreenButton = document.getElementById("fullscreen-button");

    const inputText = document.getElementById("inputText");
    const inputColor = document.getElementById("inputColor");
    let currentColor = "ff0000";

    const inputError = document.getElementById("inputError");

    const divVideo = document.getElementById("divVideo");
    const mobileMessage = document.getElementById("mobileMessage");

    let globalInteraction = false;
    let mobileFullscreen = false;

    function fakeFullscreen() {
        mobileFullscreen = true;
        canvas.className = "";
        canvas.classList.remove("h-80", "rounded-xl", "border-4", "w-full");
        canvas.classList.add("fixed", "inset-0", "h-screen", "w-screen", "z-20");
        
        document.querySelector("meta[name='theme-color']").setAttribute("content", "#" + currentColor);

        mobileMessage.classList.remove("hidden");
        mobileMessage.classList.replace("opacity-100", "opacity-0");

    };

    canvas.addEventListener("click", () => {
        if (mobileFullscreen) {
            exitfakeFullscreen();
        }
    })

    canvas.addEventListener("touchstart", () => {
        if (mobileFullscreen) {
            exitfakeFullscreen();
        }
    })

    window.addEventListener("resize", () => {
        if (mobileFullscreen){
            drawColor();
        }
    })

    function exitfakeFullscreen() {
        mobileFullscreen = false;
        canvas.classList.remove("fixed", "inset-0", "h-screen", "w-screen", "z-20");
        canvas.classList.add("h-80", "rounded-xl", "border-4", "border-zinc-950", "w-full");
        mobileMessage.classList.add("hidden");
        mobileMessage.classList.replace("opacity-0", "opacity-100");
        document.querySelector("meta[name='theme-color']").setAttribute("content", "#000000");
    };

    function resizeCanvas() {
        const dpr = window.devicePixelRatio || 1;
        canvas.style.width = "";
        canvas.style.height = "";
        canvas.width = window.innerWidth * dpr;
        canvas.height = window.innerHeight * dpr;
    };

    window.addEventListener("orientationchange", () => {
        if (mobileFullscreen) {
            resizeCanvas();
            window.scrollBy(0, 200);
        }
    });

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
            /// exitfakeFullscreen();
        }
    };

    function userHasInteracted(callback) {
        if (userHasInteracted) {
            callback();
        }
    }

    drawColor();
});