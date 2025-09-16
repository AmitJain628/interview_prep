function classNames() {
    const args = Array.prototype.slice.call(arguments);
    let result = [];
    for (let ele of args) {
        if (typeof ele === "object" && typeof ele !== null) {
            if (Array.isArray(ele)) {
                for (let element of el) {
                    result.push(classNames(element));
                }
            } else {
                for (let key in ele) {
                    if (ele[key]) {
                        result.push(key);
                    }
                }
            }
        } else if (typeof ele === "string" || (typeof ele === "number" && ele)) {
            result.push(ele);
        }
    }

    return result.join(' ');
}

