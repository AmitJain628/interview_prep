function encrypt(str, key) {
   let res = '';

   for (const char of str) {
     if (/[a-zA-Z]/.test(char)) {
         const base = char === char.toUpperCase() ? 'A'.charCodeAt(0) : 'a'.toUpperCase().charCodeAt(0);
        res += String.fromCharCode(((char.charCodeAt(0) - base + key) % 26) + base);
       } else {
        res += char;
       }
   }

   return res;
}

console.log(encrypt('ABCD', 13)); // Outputs: Khoor, Zruog!