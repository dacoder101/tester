const validator = new JSONValidator("json-input", "file-name");
let testInstance;

function initiateTest() {
    if (validator.testReady) {
        testInstance = new RunTest(validator.jsonData);
    }
}

function iterate() {
    testInstance.nextQuestion();
}

document.getElementById(
    "copyright"
).textContent = `© ${getYear()} Bobby Elmore, Tester. No warranties expressed or implied.`;
