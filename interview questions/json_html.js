```
Input:
const json = { 
  type: 'div', 
  props: { id: 'hello', class: "foo" }, 
  children: [
    {type:'h1', children: 'HELLO' },
    {type:'p', children: [{type:'span', props: {class: "bar" }, children: 'World' }] }
  ]
};

console.log(JSONtoHTML(json));

Output:
<div id="hello" class="foo">
  <h1>HELLO</h1>
  <p>
     <span class="bar">World</span>
  </p>
</div>
```
function JSONtoHTML(obj) {
    const fragment = document.createDocumentFragment();
    for(let el in obj) {
       const element = document.createElement(el.type);
       for (let key in obj[props]) {
        element.setAttribute(key, obj[props][key]);
       }
       if (Array.isArray(el.children)) {
            for (let child of el.children) {
                element.appendChild(JSONtoHTML(child))
            }
       } else {
        element.innerText = el.children;
       }
       fragment.appendChild(el);
    }

    return fragment
}