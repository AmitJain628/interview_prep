// const generateSelector = function(root, target) {
//    const selectors = [];

//    while(target !== root) {
//     const nthChild = Array.from(target.parentNode.children).indexOf(target) + 1;

//     const selector = `${target.tagName.toLowercase()}:nth-child ${nthChild}`;


//     selectors.unshift(selector);

//     target = target.parentNode;
//    }

//    selectors.unshift(`${root.tagName.toLowerCase()} [id="${root.id}"]`);

//    return selectors.join(' > ');
// }







function cssGeneratorSelector(target, root) {
   let selectors = [];

   while(target === root) {
      let nthChild = Array.from(target.parentNode.children).indexOf(target) + 1;
      let selector = `${target.parentNode.tagName} nth:child ${nthChild}`;

      selectors.unshift(selector);

      target = target.parentNode;
   }

   selectors.unshift(`${root.tagName.toLowerCase()} [id="${root.id}]`);

   return selectors.join(' > ')
}