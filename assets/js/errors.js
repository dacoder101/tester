class JSONKeyError extends Error {
    constructor() {
        super(
            "The JSON file does not include the valid keys, or includes invalid keys."
        );
        this.name = this.constructor.name;
    }
}

class JSONValueTypeError extends Error {
    constructor() {
        super("The JSON file includes a value(s) of an invalid type.");
        this.name = this.constructor.name;
    }
}

class LessThanFourQuestionsError extends Error {
    constructor() {
        super("The JSON file must contain at least four questions.");
        this.name = this.constructor.name;
    }
}

class AnswerIsNotStringError extends Error {
    constructor() {
        super(
            "All answers must be of type string. Arrays are not currently supported."
        );
        this.name = this.constructor.name;
    }
}

class NotEnoughUniqueAnswersError extends Error {
    constructor() {
        super("The JSON file must contain at least four unique answers.");
        this.name = this.constructor.name;
    }
}
