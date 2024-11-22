const validator = new JSONValidator("json-input", "file-name");
let testInstance;

function initiateTest() {
    if (validator.testReady) {
        testInstance = new RunTest(validator.jsonData);
    }
}

async function loadPreset(filePath) {
    let fileInput = document.getElementById("json-input");

    const response = await fetch(filePath);
    const file = new File([await response.text()], filePath.split("/").pop(), {
        type: "application/json",
    });

    const dataTransfer = new DataTransfer().items.add(file);
    fileInput.files = dataTransfer.files;

    fileInput.dispatchEvent(new Event("change"));
    displayDiv("preset-modal");
}

function submitAnswer(event) {
    testInstance.checkAnswer(event.target.textContent);
}

document.getElementById(
    "copyright"
).textContent = `© ${getYear()} Bobby Elmore, Tester. No warranties expressed or implied.`;
