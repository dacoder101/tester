function displayDiv(divId) {
    let div = document.getElementById(divId);
    if (div.style.display === "none" || div.style.display === "") {
        div.style.display = "flex";
    } else {
        div.style.display = "none";
    }
}

function getYear() {
    return new Date().getFullYear();
}

function randomizeArray(arr) {
    return arr.sort(() => Math.random() - 0.5);
}
