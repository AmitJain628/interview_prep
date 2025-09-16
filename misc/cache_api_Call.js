function generateKey(path, config) {
   Object.keys(config).sort(a, b => a.localeCompare(b))
   .map(key => `${key}: ${config[key]}`).join('&');

   return path + '&' + key;
}

function cacheAPICall(timeout) {
    const cache = {};

    return async function(path, config) {
       const key = generateKey(path, config);
       if (!cache[key] || (cache[key] && cache[key].expiry < Date.now())) {
          const data = await fetch(path, config);
          cache[key] = {
             data,
             expiry: Date.now() + timeout * 1000
          };
       }    
       return cache[key].data;
    }
}