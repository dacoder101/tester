class JSONValidator {
    constructor(inputElementId) {
        let JSONInput = document.getElementById(inputElementId);
        JSONInput.addEventListener("change", async (event) => {
            const jsonData = await this.validateJSON(event);
            if (!jsonData) {
                this.resetJSON(JSONInput);
            } else {
                this.testReady = true;
            }
        });
    }

    async validateJSON(event) {
        const fileContent = await this.readFile(event.target.files[0]);
        const jsonData = this.parseJSON(fileContent);

        if (!jsonData || !this.testKeyValidity(jsonData)) {
            alert("Invalid JSON file.");
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

    resetJSON(element) {
        element.value = "";
    }
}
