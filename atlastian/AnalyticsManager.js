class AnalyticsManager {
    constructor() {
        this.batchSize = 10;
        this.queue = [];
        this.flushInterval = flushInterval;
        this.userLeaving = false;
        this.flushTimer = null;
    }

    logEvent(event) {
        this.queue.push(event);

        if (this.queue.length > this.batchSize) {
            this.flushEvent();
        }
    }

    async flushEvent() {
        if (this.queue.length === 0) return;

        try {
            const events = this.queue.slice(0, this.queue.length);
            this.queue = [];
            await send(events);
        } catch (error) {
            this.queue.push(...events);
            console.log("err", error);
        }
    }

    intervalBasedEvent() {
        if (this.flushTimer) return;

        this.flushTimer = setInterval(() => {
            if (this.events.length > 0) {
                this.flushEvent();
            }
        }, 1000);
    }

    stopInterval() {
        clearInterval(this.flushTimer);
        this.flushTimer = null;
    }

    handlePageUnload() {
        this.isUserLeaving = true;
        this.flushEvents();
    }    
    load() {
        window.addEventListener('beforeunload', this.handlePageUnload.bind(this));
    }

    unload() {
        window.addEventListener('beforeunload', this.handlePageUnload.bind(this));
    }

    cleanup() {

    }
}