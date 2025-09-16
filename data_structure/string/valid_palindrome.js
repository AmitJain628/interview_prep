function validPalindrom(str) {
    str = str.toLowerCase().trim();
    str = str.substr(" ", "");
    str = str.replace(/[^a-zA-Z0-9]/g, "");

    let i =0;
    let j = str.length - 1;

    while(i < j) { 
        if (str[i] !== str[j]) {
            return false;
        }

        i++;
        j--
    }

    return true;
}