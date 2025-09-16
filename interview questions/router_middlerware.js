const Router = function () {
    let routes = new Map();
    return {
        get(path) {
          let route = routes.get(path);
          if (route) return route;
          let keys = Object.keys(route)

          for(let key of keys) {
            if (matchString(key, path)) {
                return routes.get(key);
            }
          }
        },
        set(key, value) {
          routes.set(key, value);
        }
    }
}

const matchString = (pattern, path) => {
    const regexPattern = new RegExp('^' + pattern.replace(/\\?/g, '.').replace(/\\*/g, '.*') + '$');
    return regexPattern.test(path)
}