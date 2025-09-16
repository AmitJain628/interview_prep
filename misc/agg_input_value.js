const input = `
<form id="parent">  
    <input type="text" name="a.c" value="1" />  
    <input type="text" name="a.b.d" value="2" />  
    <input type="text" name="a.b.e" value="3" />  
</form>`;

const output = {  
    "a": {  
      "c": "1",  
      "b": {  
        "d": "2",  
        "e": "3"  
      }  
    }  
};

function aggInput() {
    const inputs = document.querySelectorAll("input[type='text']");
    return Array.from(inputs).reduce((result, current) => {
        const keys = current.name.split(".");

        let parent = result;

        keys.foreach((key, index) => {
            if (typeof parent[key] !== "undefined") {
                    parent[key] = {}
            }

            if (index === keys.length - 1) { 
                parent[key] = current.value;
            }
            parent = parent[key];
        });

        return result;
    }, {});
}