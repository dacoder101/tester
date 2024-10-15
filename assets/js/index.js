const validator = new JSONValidator("json-input", "file-name");

function initiateTest() {
    if (validator.testReady) {
        testInstance = new RunTest(validator.jsonData);
    }
}

document.getElementById(
    "copyright"
).textContent = `© ${getYear()} Bobby Elmore, Tester. No warranties expressed or implied.`;
