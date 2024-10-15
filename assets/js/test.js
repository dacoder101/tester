class RunTest {
    constructor(testJSON) {
        this.test = new Test(testJSON);
        this.startTest();
    }

    startTest() {
        displayDiv("test-modal");
    }
}

class Test {
    constructor(testJSON) {
        this.testJSON = testJSON;
    }

    getQuestions() {
        return this.testJSON.questions;
    }

    getAnswers() {
        return Object.values(this.testJSON.questions);
    }
}
