class RunTest {
    constructor(testJSON, testingElementId) {
        this.test = new Test(testJSON);
        this.testingElement = document.getElementById(testingElementId);
    }
}

class Test {
    constructor(testJSON) {
        this.testJSON = testJSON;
    }

    getQuestions() {
        return this.testJSON.questions.map((question) => question.question);
    }

    getAnswers() {
        return this.testJSON.questions.map((question) => question.answer);
    }
}
