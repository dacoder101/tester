function displayDiv(divId) {
    let div = document.getElementById(divId);
    if (div.style.display === "none" || div.style.display === "") {
        div.style.display = "flex";
    } else {
        div.style.display = "none";
    }
}

function presetDisplayDiv() {
    if (isHTMLLocal()) {
        displayDiv("local-preset-modal");
    } else {
        displayDiv("preset-modal");
    }
}

function getYear() {
    return new Date().getFullYear();
}

function randomizeArray(arr) {
    return arr.sort(() => Math.random() - 0.5);
}

function getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function isHTMLLocal() {
    if (window.location.protocol === "file:") {
        return true;
    }

    return false;
}
