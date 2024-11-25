class JSONValidator {
    constructor(inputElementId, fileNameSpan) {
        let JSONInput = document.getElementById(inputElementId);
        let nameText = document.getElementById(fileNameSpan);

        JSONInput.addEventListener("change", async (event) => {
            const jsonData = await this.validateJSON(event);
            if (!jsonData) {
                this.resetJSON(nameText);
            } else {
                nameText.textContent = JSONInput.files[0].name;
                this.jsonData = jsonData;
                this.testReady = true;
            }
        });
    }

    async validateJSON(event) {
        const fileContent = await this.readFile(event.target.files[0]);
        const jsonData = this.parseJSON(fileContent);

        if (
            !jsonData ||
            !this.testKeyValidity(jsonData) ||
            !this.testQuestionKeyValidity(jsonData)
        ) {
            return;
        }

        return jsonData;
    }

    readFile(file) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = (event) => resolve(event.target.result);
            reader.onerror = (error) => reject(error);
            reader.readAsText(file);
        });
    }

    parseJSON(json) {
        try {
            return JSON.parse(json);
        } catch (error) {
            console.error("Error parsing JSON:", error);
            return null;
        }
    }

    testKeyValidity(json) {
        const keys = Object.keys(json);
        console.log(keys);
        const validKeys = ["title", "label", "blankText", "questions"];

        return keys.every((key) => validKeys.includes(key));
    }

    testQuestionKeyValidity(json) {
        return true;
    }

    testQuestionValueValidity(json) {
        return true;
    }

    resetJSON(element) {
        element.textContent = "Invalid JSON file.";
        this.testReady = false;
    }
}
