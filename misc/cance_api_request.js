const controller1 = new AbortController();
const fetchData = (url, signal) => {
    fetch(url, signal).then((response) => console.log(response)).catch((err) => console.log(err));
}

fetchData('https://api.example.com/data', controller1.signal);

setTimeout(() => controller1.abort(), 3000);

