const validator = new JSONValidator("json-input");

document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("json-input").value = ""; // Solves a weird issue upon reloading the page
});

function initiateTest() {
    if (validator.testReady) {
        console.log("Test is ready to start.");
    } else {
        console.log("Test is not ready to start.");
    }
}
