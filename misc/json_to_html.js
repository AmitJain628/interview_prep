const jsonToHTML = (json) => {
    const fragment = document.createDocumentFragment();

    if (Array.isArray(json)) {
        for(const jsonItem of json) {
            const element = document.createElement(jsonItem.type);
            for (let attr of jsonItem.attributes) {
                element.setAttribute(attr.name, attr.value);
            }

            if (Array.isArray(jsonItem.children)) {
                for (const child of jsonItem.children) {
                    element.appendChild(jsonToHTML(child));
                }
            } else {
                element.textContent = jsonItem.children;
            }

            fragment.appendChild(element);
        }
    } else {
        jsonToHTML([json]);
    }

    return fragment;
}