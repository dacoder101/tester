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
        // this.renderAnswers();
    }

    renderAnswers() {
        // Render the answers
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

        this.correctAnswers = this.getAnswers();
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

        //this.currentAnswers = self.generateAnswers();

        this.currentQuestion++;
    }

    answerForQuestion(question) {
        return this.questionsObject[question];
    }

    generateAnswers(correctAnswer) {
        // Generate 3 answers not including correctAnswer from this.getAnswers()
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
