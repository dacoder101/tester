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

        try {
            const jsonData = this.parseJSON(fileContent);

            this.testKeysValidity(jsonData);

            this.testQuestionKeyValidity(jsonData);

            return jsonData;
        } catch (error) {
            console.error(error);
            return;
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
        return JSON.parse(json);
    }

    testKeysValidity(json) {
        const keys = Object.keys(json);
        const validKeys = ["title", "label", "blankText", "questions"];

        throw new JSONKeyError();
    }

    testQuestionKeyValidity(json) {
        const questions = json.questions;

        function sufficientQuestions() {
            if (questions.length < 4) {
                throw new LessThanFourQuestionsError();
            }
        }

        function stringAnswers() {
            const answers = Object.values(questions);

            return answers.every((answer) => {
                if (typeof answer !== "string") {
                    throw new AnswerIsNotStringError();
                }
            });
        }

        function uniqueAnswers() {
            const answers = Object.values(questions);
            const uniqueAnswers = new Set();

            answers.forEach((answer) => {
                uniqueAnswers.add(answer);
            });

            if (uniqueAnswers.size < 4) {
                throw new NotEnoughUniqueAnswersError();
            }
        }

        sufficientQuestions();
        stringAnswers();
        uniqueAnswers();
    }

    resetJSON(element) {
        element.textContent = "Bad file. See console.";
        this.testReady = false;
    }
}
