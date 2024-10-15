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
            this.renderTestCompletion();
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
        let displayedHTML = "";
        for (let i = 0; i < this.test.currentAnswers.length; i++) {
            displayedHTML += `<button class="answer-button" onclick="submitAnswer(event)">${this.test.currentAnswers[i]}</button>`;
        }
        document.getElementById("test-answers").innerHTML = displayedHTML;
    }

    renderTestCompletion() {
        document.getElementById(
            "test-content"
        ).innerHTML = `<h1>${this.test.title} Complete!</h1><h3>Questions Incorrect: ${this.test.incorrectQuestions}</h3>`;
        document.getElementById("test-answers").innerHTML = "";
    }

    checkAnswer(answer) {
        if (answer !== this.test.correctAnswer) {
            this.test.incorrectQuestions++;
            this.incorrectAnswerDisplay();
        } else {
            this.correctAnswerDisplay();
        }

        this.nextQuestion();
    }

    correctAnswerDisplay() {
        document.getElementById("test-content").style.backgroundColor = "green";
    }

    incorrectAnswerDisplay() {
        document.getElementById("test-content").style.backgroundColor = "red";
    }
}

class Test {
    constructor(testJSON) {
        this.testJSON = testJSON;
        this.setupTest();
    }

    setupTest() {
        this.title = this.testJSON.title;
        this.label = this.testJSON.label;

        this.questions = randomizeArray(this.getQuestions());
        this.questionsObject = this.testJSON.questions;

        this.currentQuestion = 0;
        this.currentQuestionText = "";
        this.questionLabelNumber = 0;

        this.correctAnswer = "";
        this.currentAnswers = [];

        this.incorrectQuestions = 0;
    }

    blankTextReplace(str) {
        return str.replace(new RegExp("{blank}", "g"), this.testJSON.blankText);
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
        answers = answers.filter((answer) => answer !== correctAnswer);
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
