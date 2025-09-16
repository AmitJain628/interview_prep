const User = require('./User');

class StackOverflowService {
    instance;

    constructor() {
        if (StackOverflowService.instance) {
            return StackOverflowService.instance;
        }
        StackOverflowService.instance = this;
        this.questions = new Map();
        this.users = new Map();
        this.answers = new Map();
        this.tags = new Map();
    }

    addUser(id, name, email) {
        let user = new User(id, name, email)
        this.users.set(user.id, user);
        return user;
    }

    askQuestion(id, user, title, content, tags) { 
        let question = user.askQuestion(id, title, content, tags, user);
        this.questions.set(question.id, question);
        return question;
    }

    answerQuestion(id, user, question, answer) {
        let newAnswer = user.answerQuestion(id, question, answer);
        this.answers.set(answer.id, newAnswer);
        return newAnswer;
    }

    addComment(id, user, question, comment) {
        let newComment = user.addComment(id, question, comment);
        return newComment;
    }

    voteQuestion(user, question, count) {
        question.vote(user, count);
    }

    voteAnswer(user, answer, count) {
        answer.vote(user, count)
    }

    acceptAnswer(answer) {
        answer.markAsAccepted();
    }
}

module.exports = StackOverflowService;