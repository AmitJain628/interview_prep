window.myFetch = window.fetch;

const requestInterceptor = (args) => {
   return args;
}

const responseInterceptor = (response) => {  
   return response;
}

window.fetch = async () => {
    const args = [...arguments];
    args = requestInterceptor(args);

    const response = await window.myFetch(...args);

    return responseInterceptor(response);
}