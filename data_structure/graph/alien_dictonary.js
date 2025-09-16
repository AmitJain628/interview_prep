function alienDictonary(words) {
    let graph = new Map();
    let inDegree = new Map();

    // intialize graph
    for(let word of words) {
        for (let ch of word) {
            if (!graph.has(word)){
                graph.set(word, []);
                inDegree.set(word, 0);
            }
        }
    }

    // build graph
    for (let i=0; i<words.length -1; i++) {
        let first = words[i];
        let second = words[i+1];

        let minLen = Math.min(first.length, second.length);
        let found = false;

        for (let j =0; j<minLen; j++) {
            let c1 = first[j];
            let c2 = second[j];
            if (c1 !== c2) {
                found = true;
                graph.set(c1).push(c2);
                inDegree.set(c1, inDegree.get(c1)+1);
                break;
            }
        }

        if(!found && first.length > second.length) {
            return false;
        }
    }

    let queue = [];


    for (const [key, value] of inDegree) {
        if(value == 0) {
            queue.push(key);
        }
    }

    let order = [];
    while(queue.length) {
     let ch = queue.pop();
     order.push(ch);

     for (let neighbor of graph.get(ch)) {
        inDegree.set(neighbor, inDegree.get(neighbor) -1);
        if(inDegree.get(neighbor) === 0) {
            queue.push(neighbor);
        }
     }
    }

    if (order.length === graph.size) {
        return order.join('');
    }

    return ''


}