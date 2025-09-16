function generate(n) {
    const result = []

    const generateAll = function(open, closed, str) {
         if (str.length === n*2) {
            return result.push(str);
         }

         if (open < n) {
            generateAll(open + 1, closed, str + '(');
         }

         if (closed < open) {
            generateAll(open, closed + 1, str + ')');
         }
    }
    generateAll(0 , 0 , '(');

    return result;
}