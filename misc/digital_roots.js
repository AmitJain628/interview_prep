function digitalRoot(input) {
    if (input < 10)
       return input;
    let rem = 0;
    while(input > 0) {
        rem += input % 10
        input = Math.floor(input / 10);  
    }

    if (rem > 9) {
        return digitalRoot(rem);
    }

    return rem;

}
