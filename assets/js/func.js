function validateJsonData(jsonData) {
    // Define your schema
    const schema = {
        requiredFields: ["title", "blankText", "questions"],
        fieldTypes: {
            title: "string",
            blankText: "string",
            questions: "object",
        },
    };

    for (const field of schema.requiredFields) {
        if (!jsonData.hasOwnProperty(field)) {
            return `Missing required field: ${field}`;
        }
    }

    for (const [field, type] of Object.entries(schema.fieldTypes)) {
        if (typeof jsonData[field] !== type) {
            return `Invalid type for field ${field}: expected ${type}, got ${typeof jsonData[
                field
            ]}`;
        }
    }

    return null;
}

function importJsonFile(event) {
    const file = event.target.files[0];
    if (file && file.type === "application/json") {
        const reader = new FileReader();
        reader.onload = function (e) {
            try {
                const jsonData = JSON.parse(e.target.result);
                const validationError = validateJsonData(jsonData);
                if (validationError) {
                    console.error(validationError);
                } else {
                    console.log("Valid JSON data:", jsonData);
                    // You can now use jsonData as needed
                }
            } catch (error) {
                console.error("Error parsing JSON:", error);
            }
        };
        reader.readAsText(file);
    } else {
        console.error("Please select a valid JSON file.");
    }
}

document
    .getElementById("jsonFileInput")
    .addEventListener("change", importJsonFile);
