const getAllAttributes = (node) => {
    let attributes = {}
    for(let attr of Array.from(node.attributes)) {
        attributes[attr.name] = attr.value;
    }

    return attributes;
}

const HTMLToJSON = (node) => {
   const output = {};
   
   const type = node.localName.toLowerCase();
   let children = node.innerText;

   if (node.children.length > 0) {
    for(let child of node.children) {
            children =[];
            children.push(HTMLToJSON(child));
    }
   }
   const props = getAllAttributes(node)
   if (Object.keys(props).length > 0) {
    output['props'] = props;
   }
   output['children'] = children;
   output['type'] = type;

   return output;
} 