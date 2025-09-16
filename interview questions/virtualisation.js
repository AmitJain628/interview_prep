const oldTree = {
    type: 'ul',
    props: {},
    children: [
      { type: 'li', props: { key: '1' }, children: ['Item 1'] },
      { type: 'li', props: { key: '2' }, children: ['Item 2'] },
      { type: 'li', props: { key: '3' }, children: ['Item 3'] }
    ]
  };
  
  const newTree = {
    type: 'ul',
    props: {},
    children: [
      { type: 'li', props: { key: '1' }, children: ['Item 1'] },
      { type: 'li', props: { key: '3' }, children: ['Updated Item 3'] },
      { type: 'li', props: { key: '4' }, children: ['Item 4'] }
    ]
  };

  let patches = diff(oldTree, newTree);

  function diff(oldTree, newTree) {
    if (oldTree.type !== newTree.type) {
        return {command: 'REPLACE', newNode: newTree}
    }
    
    const patches = [];

    for(let key in oldTree.props) {
        if (oldTree.props[key] !== newTree.props[key]) {
             patches.push({command: 'UPDATE', key,  value: newTree.props[key]})
        }
    }

    // children are list items
    if (oldTree.type === 'ul' || oldTree.type === "") {// check list) {
          patches.push(...diffChildren(oldTree.children, newTree.children));
    } else {
        for(let i=0; i< oldTree.children.length; i++) {
            patches.push(oldTree.children[i], newTree.children[i]);
        }
    }

    return patches.length > 0 ? { type: 'UPDATE', patches } : null;
  }

  function diffChildren(oldChildren, newChildren) {
    let oldKeys = oldChildren.map(child => child.props.key);
    let newKeys = newChildren.map(child => child.props.key);
    let oldMap = oldChildren.reduce((acc, curr, index) => {
           acc[curr.props.key] = curr;
           return acc;
    }, {});
    let newMap = newChildren.reduce((acc, curr, index) => {
        acc[curr.props.key] = curr;
        return acc;
 }, {});

     let patches = []
     oldChildren.forEach(element => {
        if (!newMap[element.props.key]) {
            patches.push({type: 'REMOVE', key: element.props.key})
        }
     });

     newChildren.forEach((newChild, index) => {
        if (mappedOld[newKeys[index]]) {
          patches.push(diff(mappedOld[newKeys[index]], newChild));
        } else {
          // New item to add
          patches.push({ type: 'ADD', newChild, index });
        }
      });

      return patches;
  }