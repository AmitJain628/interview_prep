const Answer = require('./Answer');
const Comment = require('./Comment');
const Question = require('./Question');

class User {
    constructor(id, username, email, password) {
        this.username = username;
        this.email = email;
        this.id = id;
        this.password = password;
        this.answers = [];
        this.questions = [];
        this.comments = [];
    }

    askQuestion(id, title, content, tags) {
        let question = new Question(id, title, content, tags, this);
        this.questions.push(question);
        return question;
    }

    answerQuestion(id, question, answer){
        let newAnswer = new Answer(id, answer, this, question);
        this.answers.push(newAnswer);
        question.addAnswer(newAnswer);
        return newAnswer;
    }

    addComment(id, question, comment) {
        let newComment = new Comment(id, comment, this);
        this.comments.push(newComment);
        question.addComment(newComment);
        return newComment;
    }

    getUsername() {
        return this.username
    }

    getId() {
        return this.id;
    }
}

module.exports = User;