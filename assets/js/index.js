const validator = new JSONValidator("json-input", "file-name");

function initiateTest() {
    if (validator.testReady) {
        console.log("Test is ready to start.");
    } else {
        console.log("Test is not ready to start.");
    }
}

document.getElementById(
    "copyright"
).textContent = `© ${getYear()} Bobby Elmore, Tester. No warranties expressed or implied.`;
