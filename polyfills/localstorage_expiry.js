const setLocalStorage = function(key, value, expiryTime) { 
    let result = {
        data: value,
    }

    if (expiryTime) {
        result.expiryTime = Date.now() + expiryTime * 1000
    }

    window.localStorage.setItem(key, result)
}

const getLocalStorage = function(key) { 
   const result = JSON.parse(window.localStorage.getItem(key));

   if (result) {
      if (result.expiryTime < Date.now()) { 
         window.localStorage.removeItem(key)
         return null;
      }

      return result.data;
   }

   return null;
}