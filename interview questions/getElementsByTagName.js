function getElementsByTagName(element, tagName) {
    let result = [];

    const traverse = (el) => {
      if (el === null) {
        return null;
      }

      if (el.tagName.toLoweCase() === tagName.toLoweCase()) {
        result.push(el);
      }

      for(let child of element.children) {
        traverse(child);
      }
    }

    for (let child of element.children) {
        traverse(child);
    }
    return result;
}