class LessThanFourQuestionsException extends Error {
    constructor() {
        super("The JSON file must contain at least four questions.");
        this.name = this.constructor.name;
        Error.captureStackTrace(this, this.constructor);
    }
}

class NotEnoughUniqueAnswersException extends Error {
    constructor() {
        super("The JSON file must contain at least four unique answers.");
        this.name = this.constructor.name;
        Error.captureStackTrace(this, this.constructor);
    }
}

class AnswerIsNotStringException extends Error {
    constructor() {
        super(
            "All answers must be of type string. Arrays are not currently supported."
        );
        this.name = this.constructor.name;
        Error.captureStackTrace(this, this.constructor);
    }
}
