const validator = new JSONValidator("json-input", "file-name");

function initiateTest() {
    if (validator.testReady) {
        let testInstance = new RunTest(validator.jsonData);
        console.log(testInstance.test.getAnswers());
        console.log(testInstance.test.getQuestions());
    }
}

document.getElementById(
    "copyright"
).textContent = `© ${getYear()} Bobby Elmore, Tester. No warranties expressed or implied.`;
