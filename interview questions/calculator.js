```
+34 => 7
-3*45 => 17
```

function calculator(cal) {
  let arr = cal.trim().split('');
  let stack = [];
  let i = arr.length - 1;
  while(i>=0) {
    const el = arr[i];
    if(el === "+" || el === "-" || el === "*" || el === "/") {
        const el1 = stack.pop();
        const ele2 = stack.pop();
        let res;
        switch(el) {
            case "+":
                res = el1 + ele2;
                break;
            case "-":
                 res = el1 - ele2;
                break;
            case "*":
                  res = el1 * ele2;
                  break;    
            case "-":
                  res = el1 / ele2;
                  break;   
        }
        stack.push(res);
    } else {
        stack.push(Number(el));
    }
    i--;
  }

  return stack.pop();
}