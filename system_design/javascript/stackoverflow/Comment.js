class Comment {
    constructor(id, content, author) {
        this.id = id;
        this.content = content;
        this.author = author;
        this.createdAt = new Date();
        this.replies = [];
    }

    getContent() {
        return this.content;
    }
}

module.exports = Comment;