const str = "Ultimate JavaScript / FrontEnd Guide";
const words = ['Front', 'End', 'JavaScript'];

console.log(highlight(str, words));


function highlight(str, keywords) {
   let result = []
   const setWords = new Set(keywords);
   let words = str.split(' ');
   result = words.map(function (word) {
    let output = ''
    if (setWords.has(word)) {
        output = `<strong>${word}</strong>`;
        return output;
    }
    
    for (let i = 0; i < word.length; i++) {
        let prefix = word.slice(0, i);
        let suffix = word.slice(i, i+1);

        if(setWords.has(suffix) && setWords.has(prefix)) {
            output = `<strong>${prefix}${suffix}</strong>`;
            break;
        }else if(setWords.has(prefix)) {
            output = `<strong>${prefix}</strong>${suffix}`;
        }else if(setWords.has(suffix)) {
            output = `${prefix}<strong>${suffix}</strong>`;
        }
    }
    return output || word;
   });

   return result.join(' ');
}