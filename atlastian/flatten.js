function getBatch(arr, index) {
    return new Promise((resolve, reject) => {
        if (index >= 0 && index < arr.length) {
            resolve(arr[index]);
        } else {
            reject(new Error("index out of bound"));
        }
    });
  }
  
  async function getValueList(input, fromIndex, toIndex) {
    let promises = [];
    
    for (let start = fromIndex; start < toIndex; start++) {
       promises.push(getBatch(input, start));
    }
  
    const data = await Promise.all(promises);
    return flatRecursive(data);
  }
  
  function flatRecursive(arr) {
    const result = [];
  
    for (let el of arr) {
      if (el && el.value) {
        result.push({ value: el.value });
  
        if (el.children && Array.isArray(el.children) && el.children.length) {
            const res = flatRecursive(el.children);
            result.push(...res);
        }
      }
    }
  
    return result;
  }

  