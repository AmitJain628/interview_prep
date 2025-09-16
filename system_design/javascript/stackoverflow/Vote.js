class Vote {
    constructor(user, value) {
        this.user = user;
        this.value = value;
    }

    getValue() {
        return this.value;
    }

    getUser() {
        return this.user;
    }
}

module.exports = Vote;