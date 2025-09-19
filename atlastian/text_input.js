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




///

constructor(maxSize) {
   this.history = [''];
   this.currentIndex = 0
   this.maxSize = maxSize;


   this.isSaving = false;
   this.pendingChanges = [];
}

addToHistory(text) {
    if (this.currentIndex < this.history.length - 1) {
        this.history = this.history.slice(0, this.currentIndex+1);
    }

    this.history.push(text);

    if (this.history.length > this.maxSize) {
        this.history.shift();
    } else {
        this.currentIndex++;
    }

    this.saveToAPI();
}

undo() {
    if (this.currentIndex > 0) {
                            this.currentIndex--;
this.value = this.history[this.currentIndex];

    }
}

redo() {
    if (this.currentIndex < this.history.length - 1) {
        this.currentIndex++;
        this.value = this.history[this.currentIndex];
    }
}

     disableUI(disabled) {
                this.undoBtn.disabled = disabled || this.currentIndex === 0;
                this.redoBtn.disabled = disabled || this.currentIndex === this.history.length - 1;
                this.textArea.disabled = disabled;
            }

saveToAPI(text) {
    if (this.isSaving) {
        this.pendingChanges.push(text);
        return;
    }

    this.isSaving = true;

    try {
                    await this.mockAPISave(text);
                      if (this.pendingChanges.length > 0) {
                        const latestText = this.pendingChanges.pop();
                        this.saveToAPI(latestText);
                    }

    } catch (error) {

        setTimeout(() => {
            this.saveToAPI(text)
        }, 30)

    } finally {
                    this.isSaving = false;
    }

}