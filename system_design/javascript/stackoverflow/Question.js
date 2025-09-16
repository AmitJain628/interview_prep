const Vote = require('./Vote');

class Question {
    constructor(id, title, content, tags, author) {
        this.title = title;
        this.content = content;
        this.tags = tags;
        this.id = id;
        this.author = author;
        this.creatdDate = new Date();
        this.comment = [];
        this.votes = [];
        this.answers = [];
    }

    addAnswer(answer) {
        this.answers.push(answer);
    }

    addComment(comment) {
        this.comment.push(comment);
    }

    vote(user, value) {
        this.votes = this.votes.filter(vote => {
            return vote.getUser().getId() !== user.getId()
        });        
        const vote = new Vote(user, value);
        this.votes.push(vote);
    }

    getTitle(){
        return this.title;
    }

    getAuthor(){
      return this.author;
    }

    getTags(){
        return this.tags;
    }

    getVoteCount() {
        return this.votes.reduce((sum, vote) => sum + vote.getValue(), 0);
    }

    getComments(){
        return this.comment;
    }
}

module.exports = Question;