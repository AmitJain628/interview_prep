class BrowserHistory {
    history = []
    currentIndex = -1;


    visit(url) {
        this.currentIndex++;
        this.history[this.currentIndex] = url;
    }

    current() {
        return this.history[this.currentIndex];
    }

    forward() {
        this.currentIndex = Math.min(this.history.length -1, ++this.currentIndex)
    }

    back() {
        this.currentIndex = Math.max(0, --this.currentIndex)
    }
}