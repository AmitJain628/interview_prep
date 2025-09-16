/**
 * @param {Element} element
 * @param {string} property
 * @param {string} value
 * @return {Array<Element>}
 */

function computed(property, value) {
    let el = document.createElement('div');
    el.style[property] = value;
    let style = window.getComputedStyle(document.body.appendChild(el));
    document.body.removeChild(el);

    return style.getPropertyValue(property);

}
export default function getElementsByStyle(element, property, value) {
    const elements = [];
    let compute = computed(property, value);
  
    const traverse = (el) => {
      if (el === null) {
        return null;
      }
  
      let style = window.getComputedStyle(el);
      if (style.getPropertyValue(property) === compute) {
        elements.push(el);
      }
  
      if (el.children) {
        for (let child of el.children) {
          traverse(child);
        }
      }
    };
  
    for (let child of element.children) {
      traverse(child);
    }
  
    return elements;
  }
  