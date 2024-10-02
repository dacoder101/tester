class JSONValidator {
    constructor(inputElementId) {
        this.JSONInput = document.getElementById(inputElementId);
        this.JSONInput.addEventListener("change", (event) =>
            this.validateJSON(event)
        );
    }

    validateJSON(event) {
        const jsonFile = this.readFile(event.target.files[0]);

        if (!this.isValidJson(jsonFile)) {
            alert("Invalid JSON file");
            return;
        }
    }

    readFile(file) {
        const reader = new FileReader();
        reader.onload = (event) => {
            return event.target.result;
        };

        reader.readAsText(file);
    }

    isValidJson(file) {
        try {
            JSON.parse(file);
            return true;
        } catch (error) {
            return false;
        }
    }
}

const jsonValidator = new JSONValidator("json-input");
