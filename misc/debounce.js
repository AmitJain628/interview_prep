const debounce = function(func, delay) {
    let timer;
    return function(){
      let context = this;  
      let args = Array.prototype.slice.call(arguments);
      clearTimeout(timer);
      timer = setTimeout(() => {
        func.apply(context, args);
      }, delay);
    }
}

function handleSearch(query) {
    console.log(`Searching for: ${query}`);
}

// Create a debounced version of the handleSearch function with a 500ms delay
const debouncedSearch = debounce(handleSearch, 500);

// Simulate user typing with a quick succession of calls
debouncedSearch("Hello");
debouncedSearch("Hello, W");
debouncedSearch("Hello, Wo");
debouncedSearch("Hello, Wor");
debouncedSearch("Hello, World");