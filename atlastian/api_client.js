class APIClient {
    constructor() {
        this.token = null;
        this.tokenExpiryTime = null;
        this.timerId = null;
        this.debounceToken = debounce(this.getToken);
        this.queue = [];
    }

    async getToken() {
        try {
            this.token = await this.getToken();
            this.tokenExpiryTime = await test;
            this.timerId = setTimeout(this.refreshToken, this.tokenExpiryTime  - Date.now())

            // check if queue
        } catch(error) {

        }
    }

    async refreshToken() {
        if (this.tokenExpiryTime > Date.now()) return;

        await this.getToken();
    }

    checkTokenInvalid() {
        if (!this.token || this.tokenExpiryTime < Date.now()) return true;

        return false
    }

    async get(url, params, retries = 0) {
        if (this.checkTokenInvalid()) {
            this.queue.push({
                url, params, retries, method: get
            })
            await this.getToken();
        }

    }

    async put(url, body) {
        
    }

    async post(url, body) {
        
    }
    async delete(url, body) {
        
    }
  }
  