const store = new Map();

function parseCookieString(cookieString) {

   function separateValue(value) {
        return value.split("=").map(s => s.trim());
   }
   let [keyValue, ...rest] = cookieString.split(";");

   const [key, value] = separateValue(keyValue);
   
   let option = {};

   for(let obj of rest) {
       const [key, value] = separateValue(obj)
       option[key.trim()] = value.trim();
   }

   return {
    key,
    value,
    option
   }
}

Object.defineProperties(document, "mycookies", {
    configurable: true,
    set: function(val) {
       const [key, value, option] = parseCookieString(val);

       let expires = Infinity;
       if(option[maxAge]) { 
           expires = Date.now() + Number(option[maxAge] * 1000);
       }

       store.set(key, {value, expires});
    },
    get: function(key) {
        const cookie = [];
        for (let [name, {value, expires}] of store) {
            if (expires <= Date.now()) {
                delete store[name];
            } else {
                cookie.push(`${name}=${value}`);
            }
        }

        return cookie.join("; ");
    }
});