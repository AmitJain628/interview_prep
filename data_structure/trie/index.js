/*
insert -> insert word
remove() -> remove word
contains() -> contains word or not
find(prefix) -> return all the prefixes
*/

class TrieNode {
    constructor(value = '') {
        this.children = {};
        this.value = value;
        this.isEndOfWord = false;
    }
}

class Trie {
    constructor() {
        this.root = new TrieNode();
    }

    insert(word) {
        let node = this.root;
        for (char of word) {
            if (!node.children[char]) {
                node.children[char] = new TrieNode(char);
            }
            node = node.children[char];
        }
        node.isEndOfWord = true;
        node.value = word;
    }

    getLastNode(word) {
        let node = this.root;
        for (char of word) {
           if(!node.children[char]) return false;
           node = node.children[char];
        }
        
        return node
    }

    hasWord(word) {
        let node = this.getLastNode(word);
        return node && node !== this.root && node.isEndOfWord;
    }

    findAllPrefix(prefix, start = this.root) {
        let result = [];
        let node = this.getLastNode(prefix);

        if (node) {
            if (node.isEndOfWord) result.push(prefix);

            node.children.forEach(element => {
                getWordsFrom(element, prefix, result);
            });
        }

        return result;
    }

    getWordsFrom(element, prefix, result = []) {
        if (!node) return;

        prefix += node.value

        if (node.isEndOfWord) result.push(prefix);

        node.children.forEach(element => {
            getWordsFrom(element, prefix, result);
        });

        return result;
    }

    removeWord(word) {
        if (!word) return false;

        let currNode = this.root,
            stack = [];
        for (const letter of word) {
            if (!currNode.children.has(letter)) return false;
            currNode = currNode.children.get(letter);
            if (word[word.length - 1] !== currNode.value) stack.push(currNode);
        }

        currNode.endOfWord = false;

        while (stack.length > 0 && !currNode.endOfWord) {
            let prevNode = currNode;
            currNode = stack.pop();
            if (prevNode.children.size > 0) {
                break;
            }
            currNode.children.delete(prevNode.value);
        }

        return true;
    }
}