if (!window.fetch) {
    // Define the fetch function
    window.fetch = function(url, options = {}) {
      return new Promise((resolve, reject) => {
        // Set default options for request
        const method = options.method || 'GET';
        const headers = options.headers || {};
        const body = options.body || null;
        const timeout = options.timeout || 0; // Timeout in ms
  
        // Create a new XMLHttpRequest object
        const xhr = new XMLHttpRequest();
  
        // Set up the request
        xhr.open(method, url, true);
  
        // Set request headers
        for (let header in headers) {
          if (headers.hasOwnProperty(header)) {
            xhr.setRequestHeader(header, headers[header]);
          }
        }
  
        // Handle timeout
        if (timeout > 0) {
          xhr.timeout = timeout;
          xhr.ontimeout = () => reject(new Error('Request timed out'));
        }
  
        // Handle response
        xhr.onload = function() {
          if (xhr.status >= 200 && xhr.status < 300) {
            // Check if the response is JSON
            let responseData = xhr.responseText;
            try {
              responseData = JSON.parse(responseData);
            } catch (e) {}
  
            resolve({
              ok: true,
              status: xhr.status,
              statusText: xhr.statusText,
              json: function() {
                return Promise.resolve(responseData);
              },
              text: function() {
                return Promise.resolve(xhr.responseText);
              },
              clone: function() {
                return fetch(url, options); // Clone the request
              }
            });
          } else {
            reject(new Error(`HTTP Error: ${xhr.statusText}`));
          }
        };
  
        // Handle errors
        xhr.onerror = function() {
          reject(new Error('Network Error'));
        };
  
        // Send the request
        xhr.send(body);
      });
    };
  }
  