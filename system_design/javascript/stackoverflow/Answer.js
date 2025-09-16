const Vote = require('./Vote');

class Answer {
    constructor(id, answer, author, question) {
        this.id = id;
        this.answer = answer;
        this.votes = 0;
        this.question = question;
        this.comments = [];
        this.createdDate = new Date();
        this.author = author;
        this.votes = [];
        this.isaccepted = false;
    }

    addComment(comment) {
        this.comments.push(comment);
    }

    vote(user, value) {
        this.votes = this.votes.filter(vote => vote.getUser().getId() !== user.getId());
        this.votes.push(new Vote(user, value));
    }

    markAsAccepted() {
        this.isAccepted = true;
    }
}

module.exports = Answer;