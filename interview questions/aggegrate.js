aggregateValues('parent');
{
    a: {}
}
function aggregateValues(id) {
    let obj = {};
    let element = document.querySelectorAll(id);
    for (let child of element.children) {
        let value = child.name;
        const arr = value.split('.');
        let parent = obj;
        arr.forEach((key, index) => {
            let prop = parent[key];
            if (!prop) {
                parent[key] = {};
            }
            if (index == arr.length - 1) {
                parent[key] = child.value;
            }
            parent = parent[key];
        });
    }

    return obj
}