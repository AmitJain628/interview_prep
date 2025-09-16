const debounceWithImmediateFlag = function(func, delay, immediate = false) {
    let timer;
    return function(){
      let context = this;  
      let args = Array.prototype.slice.call(arguments);
      let callNow = immediate && !timer;
      clearTimeout(timer);
      timer = setTimeout(() => {
        timer = null;
        if (!immediate) {
            func.apply(context, args);
        }
      }, delay);

      if (callNow) {
        func.apply(context, args);
      }
    }
}

function handleSearch(query) {
    console.log(`Searching for: ${query}`);
}

// Create a debounced version of the handleSearch function with a 500ms delay
const debouncedSearch = debounce(handleSearch, 500, true);

// Simulate user typing with a quick succession of calls
debouncedSearch("Hello");
debouncedSearch("Hello, W");
debouncedSearch("Hello, Wo");
debouncedSearch("Hello, Wor");
debouncedSearch("Hello, World");