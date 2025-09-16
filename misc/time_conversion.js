const formatTimeTo24 = (time) => {

    time = time.toLowerCase();
    let [hours, mins] = time.split(':');

    if (time.endsWith('am')) {
       hours = hours == 12 ? "0" : hours
    }

    if (time.endsWith('pm')) {
        hours = hours == 12 ? hours : String(+hours + 12)
    }

    return `${hours.padStart(2, 0)} ${mins.slice(0, -2).padStart(2, 0)}`
}

console.log(formatTimeTo24('12:00am')); // '00:00'
console.log(formatTimeTo24('12:30am')); // '00:30'
console.log(formatTimeTo24('03:45pm')); // '15:45'

const formatTimeTo12 = (time) => {

    time = time.toLowerCase();

    let [hours, mins] = time.split(':');
    let suffix = hours >= 12 ? 'pm': 'am';

    if (suffix === 'am') {
       hours = hours == "00" ? "12" : hours
    }

    if (suffix === 'pm') {
        hours = hours == "00" ? "12" : String(+hours - 12)
    }

    return `${hours.padStart(2, 0)} ${mins.padStart(2, 0)} ${suffix}`
}

console.log(formatTimeTo12("00:00"));
console.log(formatTimeTo12("00:30"));
console.log(formatTimeTo12("15:45"));