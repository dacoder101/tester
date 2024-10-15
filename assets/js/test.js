class RunTest {
    constructor(testJSON) {
        this.test = new Test(testJSON);
        this.nextQuestion();
        displayDiv("test-modal");
    }

    nextQuestion() {
        if (this.test.currentQuestion < this.test.getQuestions().length) {
            this.test.iterateQuestion();
            this.renderDiv();
        } else {
            alert("Test complete!");
        }
    }

    renderDiv() {
        document.getElementById("test-content").innerHTML = `<h1>Question: ${
            this.test.currentQuestion
        }/${this.test.getQuestions().length}</h1><h2>${this.test.label}-${
            this.test.questionLabelNumber
        }: ${this.test.blankTextReplace(this.test.currentQuestionText)}</h2>`;
        this.renderAnswers();
    }

    renderAnswers() {
        document.getElementById(
            "test-answers"
        ).innerHTML = `${this.test.currentAnswers}`;
    }
}

class Test {
    constructor(testJSON) {
        this.testJSON = testJSON;
        this.setupTest();
    }

    setupTest() {
        this.label = this.testJSON.label;

        this.questions = randomizeArray(this.getQuestions());
        this.questionsObject = this.testJSON.questions;

        this.currentQuestion = 0;
        this.currentQuestionText = "";
        this.questionLabelNumber = 0;

        this.correctAnswer = "";
        this.currentAnswers = [];
    }

    blankTextReplace(str) {
        return str.replace("{blank}", this.testJSON.blankText);
    }

    iterateQuestion() {
        this.currentQuestionText = this.questions[this.currentQuestion];
        this.questionLabelNumber = this.getQuestionLabelNumber(
            this.currentQuestionText
        );

        this.correctAnswer = this.answerForQuestion(this.currentQuestionText);

        this.currentAnswers = this.generateAnswers(this.correctAnswer);

        this.currentQuestion++;
    }

    answerForQuestion(question) {
        return this.questionsObject[question];
    }

    generateAnswers(correctAnswer) {
        let answers = randomizeArray(this.getAnswers());
        answers.splice(answers.indexOf(correctAnswer), 1);
        let selectedAnswers = answers.slice(0, 3);
        selectedAnswers.push(correctAnswer);
        return randomizeArray(selectedAnswers);
    }

    getQuestionLabelNumber(question) {
        return this.getQuestions().indexOf(question) + 1;
    }

    getQuestions() {
        return Object.keys(this.testJSON.questions);
    }

    getAnswers() {
        return Object.values(this.testJSON.questions);
    }
}
