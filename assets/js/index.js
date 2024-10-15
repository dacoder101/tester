const validator = new JSONValidator("json-input");

function initiateTest() {
    if (validator.testReady) {
        console.log("Test is ready to start.");
    } else {
        console.log("Test is not ready to start.");
    }
}

document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("json-input").value = ""; // Solves a weird issue upon reloading the page
});

document.getElementById(
    "copyright"
).textContent = `© ${getYear()} Bobby Elmore, Tester. No warranties expressed or implied.`;
