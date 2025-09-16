function getByClassNamePolyfill(className) {
    const root = document.body;
    let result = []
    const search = (node) => {
        if(node.classList.contains(className)){
            result.push(node);
        };

        for(let i = 0; i < node.children.length; i++) {
                search(node.children[i]);
        }
    }
    search(root);

    return result;
}                