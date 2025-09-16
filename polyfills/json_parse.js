/*
This example uses eval, which is a dangerous function as it can run any JavaScript code. It's generally a bad idea to use eval to parse JSON, as it can lead to code injection attacks if the JSON string is not properly sanitized.*/
function parse(jsonString) {
    if (typeof jsonString !== "string") {
        throw new Error("not a string");
    }

    try {
      let object = eval('(' + jsonString + ')');
      return object;
    } catch(err) {
        console.log("error", err)
    }
}