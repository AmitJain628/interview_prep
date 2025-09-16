function getByClassNameHirearchy(className) {
    const root = document.body;
    let result = []
    const classList = className.split('>')
    const traverse = (node, classList, index, result) => {
         if(!node) return;

         if(index === classList.length -1 && node.classList.contains(classList[index])) {
            result.push(node);
            return
         }

         for (let i = 0; i < node.children.length; i++) {
            if (node.children[i].classList.contains(classList[index])) {
                traverse(node.children[i],classList, index+1, result);
            } else {
                traverse(node.children[i],classList, 0, result);
            }
         }
    }
    traverse(root, classList, 0, result);

    return result;
}



let arr = classList.split('<');

const search = (root, index) => {

    if (index === arr.length - 1 && root.className.contains(arr[index])) {
        result.push(root);
        return;
    }

    for(let el of Array.from(root.children)) {
        if (el.classList.contains(arr[index])) {
            search(el, index+1)
        } else {
            search(el, 0);
        }
        
    }



}

search(document.body, 0)