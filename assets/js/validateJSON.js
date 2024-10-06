class JSONValidator {
    constructor(inputElementId) {
        this.JSONInput = document.getElementById(inputElementId);
        this.JSONInput.addEventListener("change", (event) =>
            this.validateJSON(event)
        );
    }

    async validateJSON(event) {
        try {
            const fileContent = await this.readFile(event.target.files[0]);
            const jsonData = this.parseJSON(fileContent);

            if (!jsonData || !this.testKeyValidity(jsonData)) {
                console.error("Invalid JSON file");
                return;
            }

            console.log("Valid JSON file:", jsonData);
        } catch (error) {
            console.error("Error validating JSON:", error);
        }
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
}

const jsonValidator = new JSONValidator("json-input");
