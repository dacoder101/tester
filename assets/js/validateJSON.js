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
        const validKeys = {
            title: "string",
            label: "string",
            blankText: "string",
            questions: "object",
        };

        const keys = Object.keys(json);

        for (let key in validKeys) {
            if (!keys.includes(key)) {
                throw new JSONKeyError();
            }
        }

        for (let key of keys) {
            if (!validKeys.hasOwnProperty(key)) {
                throw new JSONKeyError();
            }

            if (typeof json[key] !== validKeys[key]) {
                throw new JSONValueTypeError();
            }
        }
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
