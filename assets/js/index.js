const validator = new JSONValidator("json-input", "file-name");
let testInstance;

function initiateTest() {
    if (validator.testReady) {
        testInstance = new RunTest(validator.jsonData);
    }
}

async function loadPreset(filePath) {
    let fileInput = document.getElementById("json-input");

    try {
        const response = await fetch(filePath);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const fileContent = await response.text();
        const fileName = filePath.split("/").pop();
        const file = new File([fileContent], fileName, {
            type: "application/json",
        });

        const dataTransfer = new DataTransfer();
        dataTransfer.items.add(file);
        fileInput.files = dataTransfer.files;

        const event = new Event("change");
        fileInput.dispatchEvent(event);
        displayDiv("preset-modal");
    } catch (error) {
        console.error("Error loading file:", error);
        return null;
    }
}

function submitAnswer(event) {
    testInstance.checkAnswer(event.target.textContent);
}

document.getElementById(
    "copyright"
).textContent = `© ${getYear()} Bobby Elmore, Tester. No warranties expressed or implied.`;
