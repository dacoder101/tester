class RunTest {
    constructor(testJSON) {
        this.test = new Test(testJSON);
        this.startTest();
    }

    startTest() {
        let testing = false;

        displayDiv("test-modal");

        this.renderDiv();

        while (testing) {}
    }

    renderDiv() {
        document.getElementById(
            "test-content"
        ).innerHTML = `<h1>${this.test.title}</h1><h2>${this.test.label}: ${this.test.currentQuestion}</h2>`;
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

        this.questions = this.blankTextReplace(this.getQuestions());
        this.questionsObject = this.testJSON.questions;

        this.currentQuestion = 0;
        this.currentAnswers = [];
    }

    blankTextReplace(arr) {
        const blankText = this.testJSON.blankText;

        for (let i = 0; i < arr.length; i++) {
            arr[i] = arr[i].replace("{blank}", blankText);
        }

        return arr;
    }

    iterateQuestion() {
        this.currentQuestion++;

        this.currentAnswers = self.generateAnswers();
    }

    generateAnswers(question) {
        const questionText = this.questions[question];

        // Add the answer, and three random answers to the currentAnswers array
    }

    getQuestions() {
        return Object.keys(this.testJSON.questions);
    }

    getAnswers() {
        return Object.values(this.testJSON.questions);
    }
}
