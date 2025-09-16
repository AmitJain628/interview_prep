function canEatbanaa(min) {
    let hours = 0
    for (let pile of piles) {
        hours += Math.ceil(pile/min);
    }

    return hours <= h;
}
function canEatbanaa(piles, h) {
    

    let left = 1;
    let right = 1;

    for (pile of piles) {
        right = Math.max(pile, right)
    }
    while (left < right) {
        let mid = Math.floor((left + right)/2);
        if (canEat(mid)) {
           right = mid
        } else {
           left = mid + 1;
        }
    }

    return left
    
}

/* alternative approach to */
let left = 0;
let rght = Math.max(piles);
let ans = right;

while (left <= rght) {
    let mid = left + Math.floor((rght - left) / 2);
    if (canEat(mid)) {
        ans = mid;
        rght = mid - 1;
    } else {
        left = mid + 1;
    }
}