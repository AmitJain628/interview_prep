class TextInput {
    constructor(text) {
       this.value = text;
       this.queue = [];
       this.activeIndex = 0;
       this.maxHistory = 5;
       this.save = debounce(this.apiCall, 100);
    }

    edit(text) {
        if (this.queue.length > this.maxHistory) {
            this.queue.shift();
            this.activeIndex--;
          }
      


     this.value = text;
     this.queue.push(text);
     this.activeIndex++;
    }

    undo() {
        if (this.activeIndex - 1  < 0 ) return;

        this.value = this.queue[--this.activeIndex];
    }

    redo() {
        if (this.activeIndex + 1 > this.queue.length - 1) return;

        this.value = this.queue[++this.activeIndex];
    }

    getCurrentState() {
        return this.queue[this.activeIndex];
    }
}