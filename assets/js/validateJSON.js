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
                console.log(
                    `JSON file successfully loaded: ${JSONInput.files[0].name}`
                );
                console.log(jsonData);
            }
        });
    }

    async validateJSON(event) {
        const fileContent = await this.readFile(event.target.files[0]);
        const jsonData = this.parseJSON(fileContent);

        if (
            [
                jsonData,
                this.testKeysValidity(jsonData),
                this.testQuestionKeyValidity(jsonData),
            ].some((value) => !value)
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

    testKeysValidity(json) {
        const keys = Object.keys(json);
        const validKeys = ["title", "label", "blankText", "questions"];

        return keys.every((key) => validKeys.includes(key));
    }

    testQuestionKeyValidity(json) {
        const questions = json.questions;

        function sufficientQuestions() {
            if (questions.length < 4) {
                throw new LessThanFourQuestionsException();
            }

            return true;
        }

        function stringAnswers() {
            const answers = Object.values(questions);

            return answers.every((answer) => {
                if (typeof answer !== "string") {
                    throw new AnswerIsNotStringException();
                }

                return true;
            });
        }

        function uniqueAnswers() {
            const answers = Object.values(questions);
            const uniqueAnswers = new Set();

            answers.forEach((answer) => {
                uniqueAnswers.add(answer);
            });

            if (uniqueAnswers.size < 4) {
                throw new NotEnoughUniqueAnswersException();
            }

            return true;
        }

        try {
            sufficientQuestions();
            stringAnswers();
            uniqueAnswers();
            return true;
        } catch (error) {
            console.error(error);
            return false;
        }
    }

    resetJSON(element) {
        element.textContent = "Invalid file. See console.";
        this.testReady = false;
    }
}
