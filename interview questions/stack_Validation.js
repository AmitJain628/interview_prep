//Use a stack to validate if an HTML-like string (e.g., <div><span></span></div>) is properly nested.

function validate(str) {
    let stack = [];
    let i =0;

    while(i < str.length) {
        if (openBracked(str[i])) {
            stack.push(str[i]);
            i++;
            continue;
        }
        
        let el = stack.pop();
        if (str[i] != el) {
            return false
        } 
    }
}