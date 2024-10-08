const validator = new JSONValidator("json-input");

function initiateTest() {
    if (validator.testReady) {
        console.log("Test is ready to start.");
    } else {
        console.log("Test is not ready to start.");
    }
}
