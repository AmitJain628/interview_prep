class TrieNode {
    constructor(value = '') {
        this.value = value;
        this.endOfWord = false;
        this.children = {}
    }
}

var WordDictionary = function() {
    this.root = new TrieNode('')
};

/** 
 * @param {string} word
 * @return {void}
 */
WordDictionary.prototype.addWord = function(word) {
    let node = this.root;
    for (let ch of word) {
        if (!node.children[ch]) {
            node.children[ch] = new TrieNode(ch)
        }
        node = node.children[ch];
    }

    node.endOfWord = true;
    node.value = word;
};

/** 
 * @param {string} word
 * @return {boolean}
 */
WordDictionary.prototype.search = function(word) {
    return isExist(word, this.root)
};

function isExist(word, node) {
    //console.log("word 1", word, node.endOfWord)
    if (word.length === 0) {
      return node.endOfWord;
    }
    let ch = word[0];
    let remainWord = word.slice(1);
    if (ch === ".") {
        for (let key in node.children) {
            if(isExist(remainWord, node.children[key])) {
                return true
            }
        }
        return false;
    } else {
        if (!node.children[ch]) {
            return false;
        }
       return isExist(remainWord, node.children[ch]);
    }
}

/** 
 * Your WordDictionary object will be instantiated and called as such:
 * var obj = new WordDictionary()
 * obj.addWord(word)
 * var param_2 = obj.search(word)
 */